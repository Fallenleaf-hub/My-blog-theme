# My-blog-theme

基于 Cloudflare Workers 和 KV 存储构建的轻量级个人博客系统，支持通过 GitHub Actions 实现自动化部署。

## ✨ 特性

- **轻量且极速**：完全运行在 Cloudflare 边缘节点，无需传统服务器，全球访问速度极快。
- **KV 存储**：使用 Cloudflare KV 作为数据库，存储文章、配置等数据。
- **Markdown 支持**：内置 Markdown 渲染支持，方便撰写和发布技术文章。
- **后台管理**：自带简单的后台管理页面（`/admin`），支持文章发布、编辑、删除以及全局配置修改。
- **自定义主题**：支持通过加载外部 HTML/CSS 等文件实现主题定制。
- **自动化部署**：集成了 GitHub Actions，提交代码即可自动部署到 Cloudflare Workers。
- **缓存机制**：内置页面缓存机制，降低请求延迟并减少 KV 读取次数。

## 📁 目录结构

```text
├── .github/workflows/deploy.yml  # GitHub Actions 自动部署工作流配置文件
├── README.md                     # 项目说明文档
├── index.html                    # 博客前端页面主题/模板文件
├── worker.js                     # Cloudflare Worker 核心业务逻辑与 API 处理
└── wrangler.toml                 # Wrangler 部署配置文件
```

## 🚀 部署与配置指南

### 1. 准备工作

1. 拥有一个 [Cloudflare](https://dash.cloudflare.com/) 账号。
2. 在 Cloudflare 面板中创建一个 **KV 命名空间** (例如命名为 `CFBLOG`)，并记录下对应的 `ID`。
3. 获取你的 Cloudflare **Account ID** 和 **API Token**（Token 需要有编辑 Workers 和 KV 的权限）。

### 2. 配置 GitHub 仓库 Secrets

将本项目上传或 Fork 到你的 GitHub 仓库后，在仓库的 `Settings` -> `Secrets and variables` -> `Actions` 中添加以下两个 Secret：

- `CLOUDFLARE_ACCOUNT_ID`: 你的 Cloudflare 账户 ID。
- `CLOUDFLARE_API_TOKEN`: 你的 Cloudflare API 令牌。

### 3. 修改项目配置

1. **修改 `wrangler.toml`**：
   打开项目根目录下的 `wrangler.toml` 文件，将其中的 `id` 替换为你刚刚创建的 KV 命名空间的 ID：
   ```toml
   name = "leafblog" # 你的 Worker 项目名称，可以自定义
   main = "worker.js"
   compatibility_date = "2026-04-28"

   # 绑定你的 KV 数据库
   [BlogKV]
   binding = "CFBLOG"
   id = "填写你的 KV 命名空间 ID" # <--- 修改这里
   ```

2. **修改 `worker.js` 中的核心配置**：
   打开 `worker.js`，在文件顶部找到 `OPT` 对象，根据你的需求修改以下字段：
   ```javascript
   const OPT = {
       "user" : "admin", // 后台登录账号，请务必修改！
       "password" : "your_password", // 后台登录密码，请务必修改！
       "siteDomain" : "your_domain.com", // 绑定的自定义域名 (不带https 也不带/)
       "siteName" : "你的博客名称", // 博客名称
       "siteDescription": "博客描述", // 博客描述
       "themeURL" : "你的主题仓库 raw 链接", // 如果有外部主题文件，填入主题源地址
       // ... 其他配置项可以根据需要调整
   };
   ```

### 4. 自动部署

完成以上修改并提交（Push）到 GitHub 仓库的 `main` 分支后，GitHub Actions 会自动触发部署流程。你可以通过仓库的 `Actions` 标签页查看部署进度。

部署完成后，你可以在 Cloudflare Workers 仪表盘中为该 Worker 绑定自定义域名（Custom Domains）。

## 📝 使用说明

部署成功并绑定域名后，你可以通过访问 `https://你的域名/admin` 进入后台管理系统。首次登录请使用你在 `worker.js` 中配置的 `user` 和 `password`。

在后台管理界面中，你可以：
- 撰写和发布 Markdown 文章。
- 管理（编辑/删除）已有文章。
- 修改全局站点配置（如果在后台开放了相关选项）。

## 📜 致谢与版权

本项目核心逻辑基于开源的 Cloudflare Workers 博客方案实现。如有引用其他开源代码请保留原作者的版权声明。