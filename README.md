# 🍃 My-blog-theme (LeafBlog)

<p align="center">
  <b>简体中文</b> | <a href="README_EN.md">English</a>
</p>

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Cloudflare KV](https://img.shields.io/badge/Cloudflare-KV-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/learning/how-kv-works/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automation-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Markdown](https://img.shields.io/badge/Markdown-Support-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)
[![Style](https://img.shields.io/badge/Style-Liquid_Glass_Morphism-00e5ff?style=for-the-badge)](https://github.com/)

**LeafBlog** 是一款基于 **Cloudflare Workers** 边缘计算与 **Cloudflare KV** 分布式键值存储构建的超轻量、极速个人博客系统。采用 100% 无服务器（Serverless）架构，零托管成本，全球边缘节点智能分发，无需传统主机即可拥有极致的毫秒级加载体验。

本项目进行了深度的视觉美学重构与工程优化，全面引入次世代 **Liquid Glass（液态玻璃）** 现代拟物折射美学（彩色动态流体光晕、高透光双层玻璃卡片、高光立体微边框、物理景深悬浮阴影与 Jelly 弹性动效），并配备革命性的**左侧折叠式浮动目录（Floating Dropdown TOC）**、全端沉浸式阅读排版、全套规范化的内容创作管理指南（v2.1）以及开箱即用的后台管理、SEO 自动优化、全站备份还原与边缘端缓存自动同步能力。

主题模板已完整迁移至 `theme/` 目录，通过 **Cloudflare Workers Assets 自托管**（`run_worker_first` 模式）随 Worker 一同分发部署，杜绝外部 CDN 单点依赖，结合内置的 `THEME_ASSET_VERSION` 自动化缓存击穿机制，更新部署即刻全球生效。

---

## ✨ 核心特性

- ⚡ **超轻量与极致边缘速度**：依托 Cloudflare Serverless 架构，静态页面与接口由全球数百个 PoP 边缘节点直接响应，配合 Edge Cache API，KV 数据库读取次数降至最低，全球载入时间小于 100ms。
- 🎨 **次世代 Liquid Glass（液态玻璃）美学**：
  - **动态全彩流光背景**：自适应柔和的极光流体光晕（蓝、紫、青多层渐变）与微粒交互，氛围灵动深邃。
  - **高透光折射卡片**：运用多层级 `backdrop-filter` 磨砂模糊、内发光高光细边（`inset 0 1.5px 1px rgba(...)`）与柔和物理投影，还原真实玻璃折射质感。
  - **丝滑无跳动过渡**：底层采用 `scrollbar-gutter: stable` 视口布局防抖，彻底根除桌面端与移动端在 Home、Topic、Archive 及 Admin 页面切换时的布局晃动与跳帧。
  - **微拟物与物理动效**：交互按钮与链接内置物理弹性回弹（Jelly Spring）交互反馈，手感清脆。
  - **关于我（About Me）玻璃浮层**：精致的大卡片式自我介绍，支持一键邮箱复制与社交媒体直达。
- 📖 **沉浸式长文阅读体验（Immersive Reading）**：
  - **左侧折叠式浮动目录（Floating Dropdown TOC）**：取消传统的死板常驻侧边栏，采用左侧圆形三横杠微拟物按钮，鼠标悬停或轻触时平滑下拉展开目录，无需常驻占位，最大化正文展示空间。
  - **舒适正文比例**：精心调优正文阅读区域的宽度黄金比例与留白呼吸感，带来无干扰的专注阅读体验。
  - **精致元数据信息栏**：作者信息、发布时间、分类标签均整合排布在主标题正下方、正文正上方，层级清晰规整。
  - **移动端全域适配**：消除移动设备顶部与底部的白色断层边栏，实现全景流光背景通栏铺满；解决细分小点偏右与表格挤压问题，阅读重心稳固舒适；优化移动端首次进入时的目录交互。
- 🖼️ **开箱即用的内容生态与 2026 前沿文库**：
  - 内置规范化的 **[BLOG-WRITING-GUIDE.md](blog-content/BLOG-WRITING-GUIDE.md) (v2.1 规范)**，确立「网络查阅优先（Search First）」与「AI 生成严谨参考（Grounded Generation Only）」双铁律。
  - 附带 4 篇开箱即用的高水准科技前沿博文（涵盖 2026 苹果秋季发布会 iPhone 18 系列、DeepSeek Harness 开源框架、Google Gemini 3.7 Flash 与 3.8 Flash / 4 Pro 整合），每篇均配备符合 16:9 标准比例的高清纯净无字封面。
- 📝 **全功能 Markdown 编辑套件**：后台深度集成 `Editor.md` 渲染套件，支持实时分屏预览、代码高亮折叠、Emoji、数学公式（TeX）、表格与特色图片快速插入。
- ⚙️ **丰富的内容元数据控制**：文章支持配置特色大图、自定义永久短链接（Slug）、自定义分类（支持多选）、标签列表、生成权重及搜索引擎更新频率调整。
- 📂 **自动化全站备份与灾备恢复**：
  - **一键导出**：将全站文章数据与核心 KV 配置打包为单个标准的 JSON 文件下载到本地。
  - **一键导入**：直接将备份 JSON 数据导入，在数秒内快速恢复全站数据与设置。
- 🚀 **GitHub Actions 自动化 CI/CD**：提交代码或配置即可通过 Actions 自动完成依赖检查、版本打标与 Worker 部署。
- 🔍 **极致 SEO 优化**：
  - 自动生成符合标准的规范 `/sitemap.xml` 站点地图。
  - 支持后台动态设定每篇博文的 `changefreq` 和 `priority` 权重。
  - 结构化 HTML5 语义，自带 `/robots.txt`，自动将后台 `/admin` 进行搜索引擎隔离保护。

---

## 📁 目录结构

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动化部署工作流 (已锁定 Wrangler 稳定版)
├── theme/                      # 主题模板目录 (通过 Workers Assets 自托管)
│   ├── admin/
│   │   ├── index.html          # 后台管理主页面 (文章列表、新建、设置、发布)
│   │   └── edit.html           # 后台文章编辑页面 (支持 Markdown 与丰富元数据)
│   ├── article.html            # 文章详情页模板 (沉浸式阅读、左侧折叠 TOC、信息条)
│   ├── index.html              # 博客首页模板 (Home/Topics/Archive/About 及玻璃弹窗)
│   ├── common.css              # 全站公共样式 (Liquid Glass 变量、光晕背景、TOC 悬浮层等)
│   ├── common.js               # 全站公共脚本 (粒子背景、折叠目录逻辑、Jelly 动效、弹窗)
│   └── Logo.png                # 博客 Logo (站点 favicon)
├── blog-content/               # 博客内容创作与规范管理目录 (每篇独立文件夹，不参与打包)
│   ├── BLOG-WRITING-GUIDE.md   # 博客写作与封面规范指南 (v2.1 铁律版，规范封面与排版)
│   ├── apple-fall-event-summary/       # 2026 苹果秋季发布会全景复盘 (iPhone 18 系列)
│   │   ├── article.md          # 规范 Markdown 文章正文 (顶部附带发布信息)
│   │   └── cover.png           # 16:9 苹果官方纯净折射流光封面
│   ├── deepseek-harness-guide/         # DeepSeek 官方开源 Agent Harness 上手指南
│   │   ├── article.md
│   │   └── cover.png           # 16:9 深海晶体巨鲸与模块化插件封面
│   ├── gemini-3-7-flash/               # Google Gemini 3.7 Flash 全解读
│   │   ├── article.md
│   │   └── cover.png           # 16:9 四芒星水晶棱镜与液态玻璃流速环封面
│   └── gemini-3-8-flash-gemini-4-pro/  # Gemini 3.8 Flash 与 4 Pro 爆料整合
│       ├── article.md
│       └── cover.png           # 16:9 双子星共振能量场封面
├── worker.js                   # Cloudflare Workers 核心服务端脚本 (处理路由、渲染与缓存)
├── wrangler.toml               # Cloudflare Wrangler 配置文件 (声明 Assets 与 KV 绑定)
├── Logo.png                    # 博客仓库展示 Logo
├── cover.png                   # 仓库展示封面
├── blog_feature_cover.png      # 仓库特色封面图
└── README.md                   # 项目说明文档
```

---

## 🚀 部署与配置指南

### 1. 准备工作

1. 注册一个 [Cloudflare](https://dash.cloudflare.com/) 账号。
2. 进入 Cloudflare 控制台，在左侧导航栏选择 **Workers & Pages** -> **KV** -> **创建命名空间**，命名为 `CFBLOG`（或其他自定义名称），记录生成的 **命名空间 ID**。
3. 绑定你自己的自定义域名到 Cloudflare（由于 `workers.dev` 在部分地区访问受限，强烈建议使用自定义域名）。

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

> ⚠️ **Wrangler 版本要求**：`run_worker_first` 需要新版 Wrangler（v4.x）支持。旧版 Wrangler 会忽略该参数导致模板加载异常。本项目在 [deploy.yml](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/.github/workflows/deploy.yml) 中已显式锁定稳定版本，本地建议使用 `npm install -D wrangler@latest` 或 `npx wrangler`。

#### ② 配置 `worker.js` 中的核心配置与安全变量
打开 [worker.js](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/worker.js)，在文件顶部找到全局常量对象 `OPT`。**为了避免在 GitHub 公开仓库中泄露个人密码、API Token 等隐私信息，项目支持从 Cloudflare 环境变量 / Secrets 中动态读取配置。**

你可以在 `worker.js` 中保留默认占位符提交到 GitHub，直接在 Cloudflare 控制台添加对应变量：

| 配置项 (Key) | 默认值 | 对应的 Cloudflare 变量名 | 变量类型 (推荐) | 说明与修改建议 |
| :--- | :--- | :--- | :--- | :--- |
| **`user`** | `"admin"` | `BLOG_USER` | `环境变量` (明文) | 后台登录账号。 |
| **`password`** | `"your_password"`| `BLOG_PASSWORD` | **`Secret` (加密)** | 后台登录密码，**强烈建议设置为 Secret**。 |
| **`siteDomain`** | `"leafblog.ccwu.cc"`| `BLOG_SITE_DOMAIN` | `环境变量` (明文) | 绑定的自定义域名（不要带 `https://`）。 |
| **`siteName`** | `"FallenLeaf Blog"`| `BLOG_SITE_NAME` | `环境变量` (明文) | 博客的全局标题名称。 |
| **`siteDescription`**| `"A Blog..."` | `BLOG_SITE_DESCRIPTION`| `环境变量` (明文) | 博客全局描述，用于 SEO Meta Description。 |
| **`keyWords`** | `"cloudflare..."`| `BLOG_KEYWORDS` | `环境变量` (明文) | SEO 关键字，用英文逗号分隔。 |
| **`cacheZoneId`** | `""` | `BLOG_CACHE_ZONE_ID` | `环境变量` (明文) | 域名对应的 Cloudflare 区域 ID（配置自动清缓存时使用）。 |
| **`cacheToken`** | `""` | `BLOG_CACHE_TOKEN` | **`Secret` (加密)** | Cloudflare API 令牌，用于后台发布时自动清空全站缓存。 |
| **`pageSize`** | `5` | - | - | 主页博文列表每页显示的数量。 |
| **`recentlySize`** | `6` | - | - | 侧边栏/最近文章列表中展示的数量。 |
| **`readMoreLength`**| `150` | - | - | 首页卡片摘要自动截取的字数长度。 |
| **`cacheTime`** | `43200` | - | - | 边缘节点 HTML 的缓存寿命 (秒，默认 12 小时)。 |
| **`themeURL`** | `"https://raw..."`| - | - | 主题模板 GitHub raw 地址兜底前缀。正常情况下由 `theme/` 目录自托管加载。 |
| **`copyRight`** | `"Powered by..."` | - | - | 自定义博客底部的版权与致谢信息。 |

#### ③ (推荐) 在 Cloudflare 控制台绑定环境变量与 Secrets
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages** 并选择你的 Worker 项目 `leafblog`。
2. 点击 **设置 (Settings)** -> **变量 (Variables)**。
3. 在 **环境变量 (Environment Variables)** 区域，点击 **添加变量 (Add variable)**：
   - 添加账号：名称 `BLOG_USER`，类型选择 `环境变量`，值输入你的账号名称。
   - 添加密码：名称 `BLOG_PASSWORD`，类型选择 **`Secret`**，值输入你的后台登录密码。
   - 添加缓存令牌：名称 `BLOG_CACHE_TOKEN`，类型选择 **`Secret`**，值输入你的 Cloudflare API Token。
   - 可按需添加 `BLOG_SITE_DOMAIN`、`BLOG_SITE_NAME` 等其它公开变量。
4. 点击 **保存并部署 (Save and deploy)**。

---

### 3. 配置 GitHub Actions (实现持续集成)

1. 将本项目 Push 或 Fork 到你自己的 GitHub 仓库。
2. 在该 GitHub 仓库的页面，点击顶部的 **Settings** -> **Secrets and variables** -> **Actions**。
3. 点击 **New repository secret**，添加以下两个部署用密钥：
   - `CLOUDFLARE_ACCOUNT_ID`：你的 Cloudflare 账户 ID。
   - `CLOUDFLARE_API_TOKEN`：你的 Cloudflare 账户 API Token（必须具有操作 Workers 与 KV 的权限，**用于 GitHub Actions 的 Wrangler 部署**）。
4. 本地做出任何修改提交 Push 到 `main` 分支后，GitHub Actions 工作流（`.github/workflows/deploy.yml`）将被自动触发，将最新的 Worker 代码与 `theme/` 静态资源无缝部署上线。

---

### 4. 部署后清理缓存（重要）

由于全站启用了 Edge Cache，**每次主题重新部署后旧页面可能仍在边缘节点缓存中**。部署完成后建议执行一次缓存清理：

- **方式一（推荐）**：Cloudflare Dashboard → 选择域名 → **Caching（缓存）→ Configuration → Purge Everything**。
- **方式二**：若已配置 `BLOG_CACHE_ZONE_ID` 与 `BLOG_CACHE_TOKEN`，登录后台后访问 `/admin/publish/` 点击大按钮触发 Purge API 清缓存。

---

## 📝 进阶使用与写作指南

### 后台入口与认证
- 访问：`https://你的自定义域名/admin`
- 登录认证：系统使用 HTTP Basic Auth 进行网关保护，弹出登录框时，输入您配置的 `user` 与 `password` 即可。

### 撰写与编辑文章
- **特色图片（Cover）**：直接指定图片 URL（如 GitHub 托管的 `cover.png` 链接）。强烈建议参考 `blog-content/BLOG-WRITING-GUIDE.md`，使用 16:9 纯净无字的高折射视觉图。
- **永久链接（Link / Slug）**：可点击右侧下拉菜单快速填入当前日期（如 `20260921`），或自定义语义化英文 Slug，最终文章地址为 `/article/id/slug.html`，极利于搜索引擎抓取。
- **分类与标签**：支持多选全局分类，并使用英文逗号分隔输入自定义标签。
- **权重与频率**：可控制文章在 sitemap 中的权重（0.0 ~ 1.0）及抓取更新频率建议（daily, weekly 等）。

### 🎨 主题样式与交互定制
所有前端模板均位于 `theme/` 目录，随 Worker 部署自动打包：

- **`theme/common.css`**：全站公共样式。定义了 Liquid Glass 的色彩变量（`--glass-bg`、`--glass-border` 等）、动态流光层、左侧浮动折射目录（`.toc-float-container`）、文章元数据条（`.article-meta-bar`）以及移动端沉浸式样式。
- **`theme/common.js`**：全站公共脚本。包含背景微粒系统、左侧折叠 TOC 的悬停/点击交互、Jelly 弹性动效、About 弹窗与一键复制功能。
- **`theme/index.html` / `theme/article.html`**：首页与文章页核心骨架，包含 Mustache 占位符 `{{ ... }}`，由 Worker 在边缘端完成 SSR 高速渲染。
- **About 弹窗内容**：在两个模板文件的 `about-card` 区块中直接替换个人简介、头像、邮箱与社交媒体链接。
- **favicon 与站点图标**：直接替换 `theme/Logo.png`（并更新根目录的 `Logo.png`）。

### 📥 导入/导出与全站灾备
- 在后台“设置”选项卡底部，支持将全站的所有 KV 数据（所有文章、分类、导航菜单、友链配置等）一键导出下载为标准的 `cfblog-YYYY-MM-DD.json` 文件。
- 若需迁移账户或遇到异常，只需在“导入/导出”文本框中粘贴备份内容并点击 **导入**，数秒即可完整重建整个博客。

###  缓存同步发布机制
为了实现超快响应并最大化节省 KV 配额，全站开启了强力 Edge Cache：
- 在新建、修改、删除文章或调整全局设置后，数据均已安全存入 KV，但边缘节点仍可能持有旧 HTML。
- **生效方式**：点击后台导航栏的 **发布** -> 点击大按钮 **发布**，系统将调用 Cloudflare Purge API 清除全站边缘缓存，全球用户瞬间即可看到最新内容。

---

## 🔒 安全性建议

1. **强制 HTTPS**：HTTP Basic Auth 传输为 Base64 编码，请务必在 Cloudflare 后台开启 **SSL/TLS 严格加密 (Full / Strict)** 并开启 **Always Use HTTPS**。
2. **避免弱密码**：部署前切勿保留默认密码，务必通过 Cloudflare Secret 注入强密码。
3. **API 令牌权限最小化**：Cloudflare API Token 的权限应仅授予：
   - `Workers 脚本: 编辑`
   - `Workers KV 命名空间: 编辑`
   - `区域.区域: 编辑` (可选，用于清缓存)  
   尽量避免使用高权限的 Global API Key。

---

## 📜 致谢与开源协议

- 核心 Serverless 架构灵感源自开源项目 [CF-Blog](https://github.com/gdtool/cloudflare-workers-blog)。
- Markdown 前端编辑器基于 [Editor.md](https://pandao.github.io/editor.md/) 套件。
- 视觉风格全面采用 **Liquid Glass Morphism** 现代流体拟物折射设计系统。
- 本项目遵循 [MIT License](LICENSE) 开源协议。