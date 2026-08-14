# 🍃 My-blog-theme (LeafBlog)

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Cloudflare KV](https://img.shields.io/badge/Cloudflare-KV-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/learning/how-kv-works/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automation-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Markdown](https://img.shields.io/badge/Markdown-Support-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)
[![Style](https://img.shields.io/badge/Style-Advanced_Agentic_Style-7B61FF?style=for-the-badge)](https://github.com/)

**LeafBlog** 是一款基于 **Cloudflare Workers** 边缘计算与 **Cloudflare KV** 分布式键值存储构建的超轻量、极速个人博客系统。采用无服务器（Serverless）架构，零托管成本，全球边缘节点智能分发，无需传统主机即可拥有极致的加载体验。

本项目在前代基础上进行了全面视觉重构，融入了现代化的 **Advanced Agentic Style** 设计美学（包含毛玻璃磨砂效果、柔和的环境光晕渐变背景、以及生动的交互动效），提供开箱即用的完整后台管理、SEO 自动优化、全站备份还原以及边缘端缓存清理能力。

主题模板已迁移至 `theme/` 目录并通过 **Cloudflare Workers Assets 自托管**（`run_worker_first` 模式），模板随 Worker 一同部署分发，无需依赖外部 CDN，加载更快、更稳定。

---

## ✨ 核心特性

- ⚡ **超轻量与极致速度**：完全依托 Cloudflare Edge Serverless 架构，静态页面与接口由边缘节点直接响应，配合 Edge Cache API，KV 数据库读取次数降至最低，全球载入时间小于 100ms。
- 🎨 **Advanced Agentic 视觉设计**：
  - **环境光晕背景**：自适应的柔和动态发光球体（蓝、绿、红渐变），灵动温润。
  - **毛玻璃滤镜**：基于 `backdrop-filter` 磨砂质感导航栏与主体卡片，完美契合现代审美。
  - **果冻弹性动效**：交互按钮与链接均内置 Jelly 物理回弹微动效，提升指尖交互爽快感。
  - **关于我（About Me）弹窗**：美观大方的交互卡片式自我介绍，支持一键邮箱复制与社交媒体直达。
- 📝 **全功能 Markdown 编辑器**：后台深度集成 `Editor.md` 渲染套件，支持实时分屏预览、代码折叠、Emoji、数学公式（TeX）、表格等。
- ⚙️ **丰富的内容元数据**：文章支持配置特色大图、自定义永久短链接（Slug）、自定义分类（支持多选）、标签列表、生成权重及搜索引擎更新频率调整。
- 📂 **自动化全站备份与恢复**：
  - **一键导出**：将全站文章数据与核心 KV 配置打包为单个标准的 JSON 文件下载。
  - **一键导入**：直接将备份 JSON 数据导入，在数秒内快速恢复全站。
- 🚀 **GitHub Actions 自动化 CI/CD**：只需简单提交代码或配置，Actions 自动编译并发布至 Cloudflare Workers。
- 🔍 **SEO 极客优化**：
  - 自动生成符合标准的规范 `/sitemap.xml` 站点地图。
  - 支持后台动态设定每篇博文的 `changefreq` 和 `priority` 权重。
  - 结构化 HTML5 语义，自带 `/robots.txt`，将后台 `/admin` 进行搜索引擎隔离。

---

## 📁 目录结构

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动化部署工作流
├── theme/                      # 主题模板目录 (通过 Workers Assets 自托管)
│   ├── admin/
│   │   ├── index.html          # 后台管理主页面 (列表、新建、设置、发布)
│   │   └── edit.html           # 后台文章编辑页面 (支持 Markdown 与丰富元数据)
│   ├── article.html            # 文章详情页模板 (Advanced Agentic Style)
│   ├── index.html              # 博客首页模板 (带 Home/Topics/Archive/About 及弹窗)
│   ├── common.css              # 全站公共样式 (主题变量、光晕背景、About 弹窗等)
│   ├── common.js               # 全站公共脚本 (粒子背景、Jelly 动效、弹窗逻辑)
│   └── Logo.png                # 博客 Logo (favicon)
├── blog-content/               # 博客内容管理目录 (每篇文章一个子文件夹, 不参与部署)
│   └── <文章永久链接>/
│       ├── article.md          # 文章 Markdown 正文 (顶部注释含发布信息)
│       └── cover.png           # 文章特色封面图
├── worker.js                   # Cloudflare Workers 核心逻辑代码 (已打包)
├── wrangler.toml               # Cloudflare Wrangler 部署配置文件 (含 Assets 绑定)
├── Logo.png                    # 博客 Logo
├── cover.png                   # 封面图片
├── blog_feature_cover.png      # 特色封面图片
└── README.md                   # 项目说明文档 (本项目)
```

---

## 🚀 部署与配置指南

### 1. 准备工作

1. 拥有一个 [Cloudflare](https://dash.cloudflare.com/) 账号。
2. 进入 Cloudflare 控制台，在左侧导航栏选择 **Workers & Pages** -> **KV** -> **创建命名空间**，命名为 `CFBLOG`（或其他自定义名称），记录生成的 **命名空间 ID**。
3. 绑定你自己的自定义域名到 Cloudflare（由于 `workers.dev` 在国内部分地区访问受限，强烈建议使用自定义域名）。

---

### 2. 修改项目本地配置

#### ① 修改 `wrangler.toml`
打开项目根目录下的 [wrangler.toml](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/wrangler.toml)，绑定你的 KV 命名空间：
```toml
name = "leafblog" # 你的 Worker 部署名称，可自定义
main = "worker.js"
compatibility_date = "2026-04-28"

# 主题文件自托管: Worker 优先处理所有请求, 通过 ASSETS 绑定读取 theme/ 目录
# ⚠️ run_worker_first 必须为 true, 否则首页/admin 会被当作静态文件直接返回模板原文
assets = { directory = "./theme", binding = "ASSETS", run_worker_first = true }

# 绑定你的 KV 数据库 (注意是双括号的数组格式)
[[kv_namespaces]]
binding = "CFBLOG"
id = "你的 KV 命名空间 ID" # <--- 在这里填入上面创建的 KV ID
```

> ⚠️ **Wrangler 版本要求**：`run_worker_first` 需要较新版本的 Wrangler（v4.x）支持。`cloudflare/wrangler-action@v3` 默认捆绑的旧版 Wrangler 会忽略该配置，导致首页无法渲染，因此本项目在 [deploy.yml](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/.github/workflows/deploy.yml) 中已通过 `wranglerVersion: "4.123.0"` 显式锁定版本，请勿删除。

#### ② 配置 `worker.js` 中的核心配置
打开 [worker.js](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/worker.js)，在文件顶部找到全局常量对象 `OPT`。**为了避免在 GitHub 公共仓库中泄露你的密码、API Token等敏感隐私，本项目支持直接从 Cloudflare 环境变量/Secrets 中动态读取配置。** 

这意味着你可以在 [worker.js](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/worker.js) 中保留默认的占位符/空字符串提交到 GitHub 公开仓库，然后直接在 Cloudflare 后台为这些配置设置对应的值。

以下是 `OPT` 的配置项，以及它们对应的 Cloudflare 环境变量名称：

| 配置项 (Key) | 默认值 | 对应的 Cloudflare 变量名 | 变量类型 (推荐) | 说明与修改建议 |
| :--- | :--- | :--- | :--- | :--- |
| **`user`** | `"admin"` | `BLOG_USER` | `环境变量` (明文) | 后台登录账号。 |
| **`password`** | `"your_password"`| `BLOG_PASSWORD` | **`Secret` (加密)** | 后台登录密码，**请务必设置为 Secret 隐藏**。 |
| **`siteDomain`** | `"leafblog.ccwu.cc"`| `BLOG_SITE_DOMAIN` | `环境变量` (明文) | 绑定的自定义域名（不要带 `https://`）。 |
| **`siteName`** | `"FallenLeaf Blog"`| `BLOG_SITE_NAME` | `环境变量` (明文) | 博客的全局标题名称。 |
| **`siteDescription`**| `"A Blog..."` | `BLOG_SITE_DESCRIPTION`| `环境变量` (明文) | 博客全局描述，用于 SEO Meta Description。 |
| **`keyWords`** | `"cloudflare..."`| `BLOG_KEYWORDS` | `环境变量` (明文) | SEO 关键字，用英文逗号分隔。 |
| **`cacheZoneId`** | `""` | `BLOG_CACHE_ZONE_ID` | `环境变量` (明文) | 域名对应的 Cloudflare 区域 ID（必须通过环境变量提供，勿硬编码到代码）。 |
| **`cacheToken`** | `""` | `BLOG_CACHE_TOKEN` | **`Secret` (加密)** | Cloudflare API 令牌，用于在发布文章时自动清空缓存。 |
| **`pageSize`** | `5` | - | - | 主页博文列表每页显示的数量。 |
| **`recentlySize`** | `6` | - | - | 侧边栏/最近文章列表中展示的数量。 |
| **`readMoreLength`**| `150` | - | - | 首页卡片摘要自动截取的字数长度。 |
| **`cacheTime`** | `43200` | - | - | 边缘节点 HTML 的缓存寿命 (秒)。 |
| **`themeURL`** | `"https://raw..."`| - | - | 主题模板的 GitHub raw 地址前缀，需以 `/` 结尾。**仅作为 Assets 不可用时的兜底**，正常情况下模板从 `theme/` 目录自托管加载。 |
| **`copyRight`** | `"Powered by..."` | - | - | 自定义博客底部的版权与致谢信息。 |

#### ③ (推荐) 在 Cloudflare 控制台绑定环境变量与 Secrets
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages** 并选择你的 Worker 项目 `leafblog`。
2. 点击 **设置 (Settings)** -> **变量 (Variables)**。
3. 在 **环境变量 (Environment Variables)** 区域，点击 **添加变量 (Add variable)**：
   - 添加账号：名称 `BLOG_USER`，类型选择 `环境变量`，值输入你的账号名称。
   - 添加密码：名称 `BLOG_PASSWORD`，类型选择 **`Secret`**，值输入你的后台登录密码。
   - 添加缓存令牌：名称 `BLOG_CACHE_TOKEN`，类型选择 **`Secret`**，值输入你的 Cloudflare API Token。
   - 还可以添加 `BLOG_SITE_DOMAIN`、`BLOG_SITE_NAME` 等其它你想隐藏的配置。
4. 点击 **保存并部署 (Save and deploy)**。此后部署的新代码将自动读取这些安全变量，无需写入源码中。

---

### 3. 配置 GitHub Actions (实现持续集成)

1. 将本项目 Push 或 Fork 到你自己的 GitHub 仓库。
2. 在该 GitHub 仓库的页面，点击顶部的 **Settings** -> **Secrets and variables** -> **Actions**。
3. 点击 **New repository secret**，添加以下两个部署用密钥：
   - `CLOUDFLARE_ACCOUNT_ID`：你的 Cloudflare 账户 ID。
   - `CLOUDFLARE_API_TOKEN`：你的 Cloudflare 账户 API Token（必须具有操作 Workers 与 KV 的权限，**它仅用于 GitHub Actions 的 Wrangler 部署，与博客的 `cacheToken` 独立**）。
4. 本地做出任何修改提交 Push 到 `main` 分支后，GitHub Actions 工作流（`.github/workflows/deploy.yml`）将被自动触发。它会编译文件并自动将最新的 Worker 代码与 `theme/` 静态资源部署上线。也可以在仓库的 **Actions** 页面通过 **workflow_dispatch** 手动触发部署。

### 4. 部署后清理缓存（重要）

由于全站启用了 Edge Cache（默认 12 小时），**每次重新部署后旧页面可能仍在缓存中**。部署完成后建议执行一次缓存清理：

- **方式一（推荐）**：Cloudflare Dashboard → 选择域名 → **Caching（缓存）→ Configuration → Purge Everything**。
- **方式二**：若已配置 `BLOG_CACHE_ZONE_ID` 与 `BLOG_CACHE_TOKEN`，登录后台后访问 `/admin/publish/` 触发 Purge API 清缓存。

---

## 📝 进阶使用指南

### 后台入口与认证
- 访问：`https://你的自定义域名/admin`
- 登录认证：系统使用 Basic Auth 进行网关拦截，弹出登录框时，输入您在 `worker.js` -> `OPT` 中配置的 `user` 和 `password` 即可。

### 撰写与编辑文章
- 支持指定 **特色图片** URL，作为文章的封面图。
- **永久链接（Link / Slug）**：可点击右侧下拉菜单快速填入当前日期（如 `20260524`），或手动输入英文 Slug，最终文章地址将为 `/article/id/slug.html`，利于 SEO 抓取。
- **分类与标签**：可以多选全局配置的分类，并填入英文逗号分隔的标签。
- **权重与频率**：可控制该文章在 sitemap 中的权重（0.0 ~ 1.0）以及搜索引擎建议的抓取频率（daily, weekly 等）。

### 全局配置
在后台“设置”页中，您可以直接在线编辑 JSON 格式的分类、导航菜单以及友情链接。无需重新修改代码部署。

### 🎨 主题定制
所有前端模板均位于 `theme/` 目录，随部署自动上传，修改后 Push 即可生效：

- **`theme/common.css`**：全站公共样式（主题配色变量、环境光晕背景、导航栏、About 弹窗、标签胶囊等），改配色改这里。
- **`theme/common.js`**：全站公共脚本（粒子背景特效、Jelly 弹性动效、About 弹窗、邮箱复制）。粒子特效已内置节流：触屏设备与开启「减弱动态效果」的用户会自动跳过。
- **`theme/index.html` / `theme/article.html`**：首页与文章页模板，其中 `{{ ... }}`、`{{{ ... }}}` 为 Mustache 占位符，由 Worker 在边缘端渲染注入数据，**请勿删除**。
- **About 弹窗信息**：编辑两个模板中 `about-card` 区块的简介文案、邮箱与社交链接即可。
- **favicon**：替换 `theme/Logo.png`（同时保留根目录的 `Logo.png` 作为仓库展示图）。

### 📥 导入/导出与灾备
- 在“设置”选项卡底部，支持将全站的所有 KV 数据（包括所有文章、分类、导航菜单、友情链接等）一键导出下载为 `cfblog-YYYY-MM-DD.json`。
- 如果发生数据丢失或更换 Cloudflare 账号，只需将导出的 JSON 文件内容复制粘贴到“导入/导出”文本框中，点击 **导入**，即可完整无缝重构全站。

### 🔄 缓存同步发布机制
为了实现毫秒级的响应并减少 KV 读写带来的延迟，系统启用了强力的 **Edge Cache**。
因此在执行以下操作后，**数据不会立刻在前端可见**：
1. 新建文章
2. 修改已有文章 / 删除文章
3. 保存设置（分类、菜单等）

**生效步骤**：
完成上述操作后，点击后台导航栏的 **发布** -> 点击大按钮 **发布**。此时 Workers 会调用 Cloudflare Purge API，将全站的 CDN 缓存清除。在浏览器中按 `Ctrl + F5` 强制刷新，即可在全球各节点瞬间看到最新内容。

---

## 🔒 安全性建议

1. **基本认证安全**：Basic Auth 传输为明文形式，请确保你的博客域名已强制开启 Cloudflare 的 **SSL/TLS (HTTPS)**。
2. **强密码**：在部署前必须修改 `worker.js` 中的默认密码。
3. **API 令牌权限收紧**：Cloudflare API Token 的权限应只赋予 `Workers 脚本: 编辑`、`Workers KV 命名空间: 编辑` 以及 `区域.区域: 编辑` 权限，尽量避免使用全局 API Key（Global API Key）。

---

## 📜 致谢与开源协议

- 本项目核心架构基于开源的 [CF-Blog](https://github.com/gdtool/cloudflare-workers-blog) 扩展与视觉重组。
- 前端 Markdown 构建基于 [Editor.md](https://pandao.github.io/editor.md/) 渲染器。
- HTML/CSS 样式由 **Advanced Agentic Style** 提供现代化的 UI 重设。
- 本项目遵循 [MIT License](LICENSE) 开源协议。