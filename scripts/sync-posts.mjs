#!/usr/bin/env node

/**
 * LeafBlog 自动化文章同步脚本
 * 
 * 职责：
 * 1. 扫描 blog-content/ 目录下的所有文章 (article.md)；
 * 2. 提取 Frontmatter 或注释中的元数据（标题、Slug、分类、标签、封面等）；
 * 3. 自动将 Markdown 渲染为标准 HTML，并截取纯文本摘要；
 * 4. 自动为相对路径或缺省的封面拼接 GitHub Raw 绝对地址；
 * 5. 获取博客已发布文章列表，智能比对 Slug：
 *    - 若已存在，则调用 /admin/saveEdit/ 原地更新文章；
 *    - 若不存在，则调用 /admin/saveAddNew/ 自动新建并分配编号；
 * 6. 全部同步完成后自动调用 /admin/publish/ 重新计算标签并刷新全球 Edge Cache。
 */

import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

// 基础配置与环境变量
const BLOG_URL = (process.env.BLOG_URL || 'https://leafblog.ccwu.cc').replace(/\/+$/, '');
const BLOG_USER = process.env.BLOG_USER || '';
const BLOG_PASSWORD = process.env.BLOG_PASSWORD || '';
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'Fallenleaf-hub/My-blog-theme';
const IS_DRY_RUN = process.env.DRY_RUN === 'true';

// 控制台彩色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(msg, color = colors.reset) {
  console.log(`${color}${msg}${colors.reset}`);
}

// 检查鉴权配置
if (!BLOG_USER || !BLOG_PASSWORD) {
  if (IS_DRY_RUN) {
    log('⚠️ [Notice] BLOG_USER 或 BLOG_PASSWORD 未配置，当前处于 DRY_RUN 模式，将仅演练解析与比对逻辑。', colors.yellow);
  } else {
    log('❌ [Error] 缺少环境变量 BLOG_USER 或 BLOG_PASSWORD！', colors.red);
    log('请在 GitHub 仓库中前往 Settings -> Secrets and variables -> Actions 添加这两个密钥。', colors.yellow);
    process.exit(1);
  }
}

const authHeader = 'Basic ' + Buffer.from(`${BLOG_USER}:${BLOG_PASSWORD}`).toString('base64');

/**
 * 封装带 Basic Auth 的请求
 */
async function fetchAdmin(endpoint, options = {}) {
  const url = `${BLOG_URL}${endpoint}`;
  const headers = {
    'Authorization': authHeader,
    'User-Agent': 'LeafBlog-Sync-Bot/1.0',
    ...(options.headers || {})
  };

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    throw new Error(`认证失败 (HTTP 401 Unauthorized)：请核对 BLOG_USER 与 BLOG_PASSWORD 是否与博客后台一致。`);
  }
  if (!res.ok) {
    throw new Error(`请求失败 (${res.status} ${res.statusText}) on ${endpoint}`);
  }
  return res;
}

/**
 * 解析 Markdown 文件的元数据与正文
 */
function parseArticle(filePath, dirName) {
  const content = fs.readFileSync(filePath, 'utf8');
  let title = '';
  let img = '';
  let link = dirName;
  let category = 'Tech';
  let tags = '';
  let createDate = '';
  let priority = '0.5';
  let changefreq = 'daily';
  let body = content;

  // 1. 解析 YAML Frontmatter (--- ... ---)
  const yamlMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (yamlMatch) {
    const yamlBlock = yamlMatch[1];
    body = content.slice(yamlMatch[0].length).trim();
    const lines = yamlBlock.split(/\r?\n/);
    for (const line of lines) {
      const kv = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
      if (kv) {
        const key = kv[1].trim();
        const val = kv[2].trim().replace(/^["']|["']$/g, '');
        if (key === 'title') title = val;
        else if (key === 'link' || key === 'slug') link = val;
        else if (key === 'img' || key === 'cover') img = val;
        else if (key === 'category') category = val;
        else if (key === 'tags') tags = val;
        else if (key === 'createDate' || key === 'date') createDate = val;
        else if (key === 'priority') priority = val;
        else if (key === 'changefreq') changefreq = val;
      }
    }
  }

  // 2. 解析 HTML 注释块中的元数据 (<!-- ... -->)
  const commentMatch = content.match(/<!--[\s\S]*?-->/);
  if (commentMatch) {
    const commentText = commentMatch[0];
    body = content.replace(/<!--[\s\S]*?-->/, '').trim();

    const titleM = commentText.match(/-\s*标题\s*:\s*(.+)/);
    if (titleM) title = titleM[1].trim();

    const imgM = commentText.match(/-\s*特色图片\s*:\s*(.+)/);
    if (imgM) img = imgM[1].trim();

    const linkM = commentText.match(/-\s*永久链接\s*:\s*(.+)/);
    if (linkM) link = linkM[1].trim();

    const catM = commentText.match(/-\s*分类\s*:\s*(.+)/);
    if (catM) category = catM[1].trim();

    const tagsM = commentText.match(/-\s*标签\s*:\s*(.+)/);
    if (tagsM) tags = tagsM[1].trim();

    const dateM = commentText.match(/-\s*发布时间\s*:\s*(.+)/);
    if (dateM) createDate = dateM[1].trim();
  }

  // 若无标题，从 Markdown 一级标题提取
  if (!title) {
    const h1Match = body.match(/^#\s+(.+)$/m);
    if (h1Match) title = h1Match[1].trim();
    else title = dirName;
  }

  // 智能补全封面图为 GitHub Raw 绝对地址
  if (!img || img === 'cover.png' || img.startsWith('./')) {
    img = `https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/refs/heads/main/blog-content/${dirName}/cover.png`;
  }

  // 补全创建时间
  if (!createDate) {
    try {
      const stat = fs.statSync(filePath);
      const d = stat.mtime || new Date();
      const pad = (n) => String(n).padStart(2, '0');
      createDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    } catch {
      createDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    }
  }

  // 清洗 category
  if (category.includes('按你的后台') || category.includes('按后台分类') || !category) {
    category = 'Tech';
  }

  // 编译 Markdown 为 HTML
  const contentHtml = marked.parse(body);

  // 提取纯文本摘要 (前 150 字)
  const contentText = contentHtml.replace(/<\/?[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 150);

  return {
    dirName,
    title,
    img,
    link,
    category,
    tags,
    createDate,
    priority,
    changefreq,
    contentMD: body,
    contentHtml,
    contentText
  };
}

/**
 * 获取线上所有文章列表
 */
async function fetchAllOnlinePosts() {
  const posts = [];
  let page = 1;
  const pageSize = 20;

  while (true) {
    try {
      const res = await fetchAdmin(`/admin/getList/${page}`);
      const list = await res.json();
      if (!Array.isArray(list) || list.length === 0) break;
      posts.push(...list);
      if (list.length < pageSize) break;
      page++;
    } catch (err) {
      log(`⚠️ 获取线上文章列表失败 (页码: ${page}): ${err.message}`, colors.yellow);
      break;
    }
  }

  return posts;
}

/**
 * 主执行流程
 */
async function main() {
  log(`\n============================================================`, colors.cyan);
  log(`🚀 开始执行 LeafBlog 自动化文章同步流水线`, colors.bright + colors.cyan);
  log(`目标博客地址: ${BLOG_URL}`, colors.dim);
  log(`GitHub 仓库:  ${GITHUB_REPOSITORY}`, colors.dim);
  log(`运行模式:     ${IS_DRY_RUN ? 'DRY RUN (模拟演练)' : 'PRODUCTION (直接同步)'}`, colors.dim);
  log(`============================================================\n`, colors.cyan);

  const contentDir = path.resolve('blog-content');
  if (!fs.existsSync(contentDir)) {
    log(`❌ 未找到 blog-content 目录，退出同步。`, colors.yellow);
    return;
  }

  // 1. 扫描本地文章
  const localArticles = [];
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const articleMd = path.join(contentDir, entry.name, 'article.md');
      if (fs.existsSync(articleMd)) {
        try {
          const parsed = parseArticle(articleMd, entry.name);
          localArticles.push(parsed);
          log(`📖 解析本地博文: [${entry.name}] -> "${parsed.title}"`, colors.green);
        } catch (err) {
          log(`⚠️ 解析博文失败 [${entry.name}]: ${err.message}`, colors.red);
        }
      }
    }
  }

  log(`\n共扫描到 ${localArticles.length} 篇本地博文。正在比对线上状态...\n`, colors.bright);

  // 2. 获取线上文章映射
  let onlinePosts = [];
  if (!IS_DRY_RUN) {
    try {
      onlinePosts = await fetchAllOnlinePosts();
      log(`✅ 成功获取线上已发布文章: ${onlinePosts.length} 篇\n`, colors.green);
    } catch (err) {
      log(`❌ 无法连接到博客后台: ${err.message}`, colors.red);
      process.exit(1);
    }
  }

  const onlineBySlug = new Map();
  for (const post of onlinePosts) {
    if (post.link) {
      onlineBySlug.set(post.link, post);
    }
  }

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // 3. 逐篇比对与同步
  for (const local of localArticles) {
    const existing = onlineBySlug.get(local.link);

    // 构造 jQuery serializeArray 格式的数据表单
    const formData = [
      { name: 'title', value: local.title },
      { name: 'img', value: local.img },
      { name: 'link', value: local.link },
      { name: 'createDate', value: local.createDate },
      { name: 'category', value: local.category },
      { name: 'tags', value: local.tags },
      { name: 'priority', value: local.priority },
      { name: 'changefreq', value: local.changefreq },
      { name: 'content-markdown-doc', value: local.contentMD },
      { name: 'content-html-code', value: local.contentHtml }
    ];

    if (existing) {
      // 已存在该 Slug -> 原地编辑更新
      formData.push({ name: 'id', value: existing.id });

      log(`🔄 [更新文章] Slug "${local.link}" (线上 ID: ${existing.id})`, colors.yellow);
      if (IS_DRY_RUN) {
        updatedCount++;
        continue;
      }

      try {
        const res = await fetchAdmin('/admin/saveEdit/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(formData)
        });
        const result = await res.json();
        if (result.rst) {
          log(`   ✔ 更新成功 (ID: ${existing.id})`, colors.green);
          updatedCount++;
        } else {
          log(`   ❌ 更新失败: ${result.msg || '未知错误'}`, colors.red);
          errorCount++;
        }
      } catch (err) {
        log(`   ❌ 请求失败: ${err.message}`, colors.red);
        errorCount++;
      }
    } else {
      // 不存在该 Slug -> 新建发布
      log(`➕ [新建文章] Slug "${local.link}" -> 标题: "${local.title}"`, colors.cyan);
      if (IS_DRY_RUN) {
        createdCount++;
        continue;
      }

      try {
        const res = await fetchAdmin('/admin/saveAddNew/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(formData)
        });
        const result = await res.json();
        if (result.rst && result.id) {
          log(`   ✔ 创建成功 (新分配 ID: ${result.id})`, colors.green);
          createdCount++;
        } else {
          log(`   ❌ 创建失败: ${result.msg || '未知错误'}`, colors.red);
          errorCount++;
        }
      } catch (err) {
        log(`   ❌ 请求失败: ${err.message}`, colors.red);
        errorCount++;
      }
    }
  }

  // 4. 自动刷新全球 CDN 缓存
  if ((createdCount > 0 || updatedCount > 0) && !IS_DRY_RUN) {
    log(`\n🧹 正在请求刷新全站 Edge Cache 与标签库...`, colors.cyan);
    try {
      const res = await fetchAdmin('/admin/publish/');
      const result = await res.json();
      if (result.rst) {
        log(`✨ 全网 Edge Cache 刷新成功！最新文章已即刻全球可见！`, colors.bright + colors.green);
      } else {
        log(`⚠️ 缓存清理提示: ${result.msg}`, colors.yellow);
      }
    } catch (err) {
      log(`⚠️ 触发缓存刷新失败: ${err.message}`, colors.yellow);
    }
  }

  // 5. 汇总汇报
  log(`\n============================================================`, colors.cyan);
  log(`📊 同步任务执行完毕`, colors.bright);
  log(`  - 本地扫描总计: ${localArticles.length} 篇`);
  log(`  - 新建文章:     ${createdCount} 篇`, colors.green);
  log(`  - 原地更新:     ${updatedCount} 篇`, colors.yellow);
  log(`  - 失败异常:     ${errorCount} 篇`, errorCount > 0 ? colors.red : colors.dim);
  log(`============================================================\n`, colors.cyan);

  if (errorCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  log(`❌ 同步发生致命错误: ${err.stack || err.message}`, colors.red);
  process.exit(1);
});

