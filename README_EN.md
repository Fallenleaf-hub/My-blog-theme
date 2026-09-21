# 🍃 My-blog-theme (LeafBlog)

<p align="center">
  <a href="README.md">简体中文</a> | <b>English</b>
</p>

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Cloudflare KV](https://img.shields.io/badge/Cloudflare-KV-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/learning/how-kv-works/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automation-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Markdown](https://img.shields.io/badge/Markdown-Support-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)
[![Style](https://img.shields.io/badge/Style-Advanced_Agentic_Style-7B61FF?style=for-the-badge)](https://github.com/)

**LeafBlog** is an ultra-lightweight, blazing-fast personal blog system built on **Cloudflare Workers** edge serverless compute and **Cloudflare KV** distributed key-value storage. Featuring a 100% serverless architecture with zero hosting costs and global edge intelligent routing, it delivers sub-100ms loading speeds worldwide without requiring traditional servers or VPS instances.

This project introduces a comprehensive visual redesign based on modern **Advanced Agentic Style** aesthetics (including frosted glass morphism, soft ambient gradient glowing backdrops, and fluid physical micro-interactions). It offers an out-of-the-box admin dashboard, automated SEO optimization, one-click full-site backup and disaster recovery, and edge cache purging capabilities.

All front-end templates have been migrated to the `theme/` directory and are self-hosted via **Cloudflare Workers Assets** (`run_worker_first` mode). Templates are bundled and distributed directly alongside the Worker, eliminating third-party CDN dependencies for faster, more resilient rendering.

---

## ✨ Key Features

- ⚡ **Ultra-Lightweight & Blazing Fast**: Fully powered by Cloudflare Edge Serverless architecture. Static assets and APIs are served directly from edge points of presence (PoPs). Paired with the Cloudflare Edge Cache API, KV read requests are minimized, achieving sub-100ms global response times.
- 🎨 **Advanced Agentic Visual Design**:
  - **Ambient Glow Backdrop**: Adaptive dynamic glowing orbs (smooth blue, green, and purple gradients) creating an organic, immersive feel.
  - **Glassmorphism Styling**: Frosted glass navigation bars and article cards powered by `backdrop-filter`, aligning with modern design aesthetics.
  - **Jelly Micro-Interactions**: Built-in physical spring/rebound micro-animations for interactive buttons and links.
  - **Interactive "About Me" Modal**: An elegant card-style profile modal with one-click email copying and social links.
- 📝 **Full-Featured Markdown Suite**: Deep integration with `Editor.md`, supporting real-time split-screen preview, code folding, emojis, TeX/KaTeX mathematical formulas, and tables.
- ⚙️ **Rich Content Metadata**: Articles support custom featured cover images, permanent shortlinks (Slugs), multi-category selection, tag lists, sitemap priority weights, and crawler update frequency settings.
- 📂 **Automated Full-Site Backup & Recovery**:
  - **One-Click Export**: Packages all article content and KV configurations into a single standardized JSON file for download.
  - **One-Click Import**: Restores the entire blog in seconds by uploading a previously exported JSON backup.
- 🚀 **GitHub Actions Automated CI/CD**: Simply push code or configuration changes to your repository, and Actions will automatically build and deploy them to Cloudflare Workers.
- 🔍 **Geeky SEO Optimization**:
  - Automatically generates a standardized `/sitemap.xml`.
  - Supports dynamic configuration of `changefreq` and `priority` per post via the admin panel.
  - Structured HTML5 semantics and built-in `/robots.txt` that protects the `/admin` dashboard from search engine indexing.

---

## 📁 Directory Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions automated deployment workflow
├── theme/                      # Theme templates (self-hosted via Workers Assets)
│   ├── admin/
│   │   ├── index.html          # Admin dashboard (post list, creation, settings, publish)
│   │   └── edit.html           # Markdown editor page with rich metadata controls
│   ├── article.html            # Article detail template (Advanced Agentic Style)
│   ├── index.html              # Blog homepage template (Home/Topics/Archive/About & Modal)
│   ├── common.css              # Global styles (theme variables, glow backdrop, modals, etc.)
│   ├── common.js               # Global scripts (particle background, jelly bounce, modal logic)
│   └── Logo.png                # Blog favicon
├── blog-content/               # Content workspace (one subfolder per article, not deployed)
│   └── <post-slug>/
│       ├── article.md          # Article Markdown text (with header publishing metadata)
│       └── cover.png           # 16:9 featured cover image
├── worker.js                   # Cloudflare Workers core logic (bundled)
├── wrangler.toml               # Cloudflare Wrangler configuration (with Assets binding)
├── Logo.png                    # Repository banner logo
├── cover.png                   # Repository cover image
├── blog_feature_cover.png      # Feature banner image
├── README.md                   # Chinese documentation
└── README_EN.md                # English documentation (this file)
```

---

## 🚀 Deployment & Configuration Guide

### 1. Prerequisites

1. A [Cloudflare](https://dash.cloudflare.com/) account.
2. In the Cloudflare Dashboard, navigate to **Workers & Pages** -> **KV** -> **Create namespace**, name it `CFBLOG` (or any custom name), and copy the generated **Namespace ID**.
3. Bind your custom domain to Cloudflare (strongly recommended, as the default `*.workers.dev` subdomain may be restricted or blocked in certain regions).

---

### 2. Configure Local Project Files

#### ① Modify `wrangler.toml`
Open `wrangler.toml` in the project root and bind your KV namespace:

```toml
name = "leafblog" # Your Worker deployment name (customizable)
main = "worker.js"
compatibility_date = "2026-04-28"

# Self-hosted theme assets: Worker handles requests first, reading theme/ via ASSETS binding
# ⚠️ run_worker_first MUST be true, otherwise homepage/admin will serve raw template files as static text
assets = { directory = "./theme", binding = "ASSETS", run_worker_first = true }

# Bind your KV namespace (note the array format with double brackets)
[[kv_namespaces]]
binding = "CFBLOG"
id = "YOUR_KV_NAMESPACE_ID" # <--- Paste your KV ID here
```

> ⚠️ **Wrangler Version Requirement**: The `run_worker_first` option requires modern Wrangler (v4.x). The default older Wrangler bundled in `cloudflare/wrangler-action@v3` may ignore this setting, preventing proper template rendering. This project locks the version via `wranglerVersion: "4.123.0"` in `.github/workflows/deploy.yml`. Do not remove it.

#### ② Configure Core Settings in `worker.js`
Open `worker.js` and locate the global `OPT` constant object at the top. **To avoid leaking your passwords or API tokens in public GitHub repositories, this project supports reading configurations dynamically from Cloudflare Environment Variables and Secrets.**

You can keep placeholder/empty values in `worker.js` when committing to a public GitHub repository, and configure the actual values directly in the Cloudflare Dashboard.

Below is the mapping between `OPT` keys and Cloudflare environment variable names:

| Configuration Key | Default Value | Cloudflare Variable Name | Variable Type (Recommended) | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`user`** | `"admin"` | `BLOG_USER` | `Environment Variable` (Plain text) | Admin login username. |
| **`password`** | `"your_password"`| `BLOG_PASSWORD` | **`Secret` (Encrypted)** | Admin login password (**MUST be set as Secret**). |
| **`siteDomain`** | `"leafblog.ccwu.cc"`| `BLOG_SITE_DOMAIN` | `Environment Variable` (Plain text) | Your custom domain (without `https://`). |
| **`siteName`** | `"FallenLeaf Blog"`| `BLOG_SITE_NAME` | `Environment Variable` (Plain text) | Global blog title. |
| **`siteDescription`**| `"A Blog..."` | `BLOG_SITE_DESCRIPTION`| `Environment Variable` (Plain text) | Global blog description for SEO Meta. |
| **`keyWords`** | `"cloudflare..."`| `BLOG_KEYWORDS` | `Environment Variable` (Plain text) | SEO keywords, separated by English commas. |
| **`cacheZoneId`** | `""` | `BLOG_CACHE_ZONE_ID` | `Environment Variable` (Plain text) | Cloudflare Zone ID for your domain. |
| **`cacheToken`** | `""` | `BLOG_CACHE_TOKEN` | **`Secret` (Encrypted)** | Cloudflare API Token used for automated cache purging. |
| **`pageSize`** | `5` | - | - | Number of posts displayed per page on homepage. |
| **`recentlySize`** | `6` | - | - | Number of posts shown in the sidebar/recent list. |
| **`readMoreLength`**| `150` | - | - | Character limit for homepage excerpt previews. |
| **`cacheTime`** | `43200` | - | - | Edge HTML cache TTL in seconds (default: 12h). |
| **`themeURL`** | `"https://raw..."`| - | - | Fallback GitHub raw prefix (must end with `/`). Only used if Assets binding is unavailable. |
| **`copyRight`** | `"Powered by..."` | - | - | Custom footer copyright and credits text. |

#### ③ (Recommended) Bind Variables & Secrets in Cloudflare Dashboard
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages**, and select your Worker (`leafblog`).
2. Go to **Settings** -> **Variables**.
3. Under **Environment Variables**, click **Add variable**:
   - Username: Name `BLOG_USER`, Type `Environment Variable`, Value `admin`.
   - Password: Name `BLOG_PASSWORD`, Type **`Secret`**, Value `your_secure_password`.
   - Cache Token: Name `BLOG_CACHE_TOKEN`, Type **`Secret`**, Value `your_cloudflare_api_token`.
   - You can also add `BLOG_SITE_DOMAIN`, `BLOG_SITE_NAME`, and other optional variables.
4. Click **Save and deploy**. All future deployments will securely read these credentials without exposing them in your source code.

---

### 3. Configure GitHub Actions (Automated CI/CD)

1. Push or fork this repository to your own GitHub account.
2. In your GitHub repository, navigate to **Settings** -> **Secrets and variables** -> **Actions**.
3. Click **New repository secret** and add the following two deployment secrets:
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.
   - `CLOUDFLARE_API_TOKEN`: A Cloudflare API Token with permissions to edit Workers and KV namespaces (used exclusively for Wrangler deployment in GitHub Actions; independent from the blog's `BLOG_CACHE_TOKEN`).
4. Whenever you commit and push changes to the `main` branch, the GitHub Actions workflow (`.github/workflows/deploy.yml`) will trigger automatically, building and deploying the latest Worker code and `theme/` static assets. You can also trigger deployments manually via **workflow_dispatch** in the Actions tab.

---

### 4. Purge Cache After Deployment (Important)

Because the entire blog utilizes aggressive Cloudflare Edge Caching (12 hours by default), **cached pages may still be served after a new deployment**. It is recommended to perform a cache purge once deployment succeeds:

- **Method 1 (Recommended)**: Cloudflare Dashboard → Select your domain → **Caching → Configuration → Purge Everything**.
- **Method 2**: If `BLOG_CACHE_ZONE_ID` and `BLOG_CACHE_TOKEN` are configured, log in to the admin panel and visit `/admin/publish/` to trigger the automated Purge API.

---

## 📝 Advanced Usage Guide

### Admin Panel & Authentication
- **URL**: `https://your-domain/admin`
- **Authentication**: The system uses HTTP Basic Authentication at the edge. When the prompt appears, enter the `user` and `password` configured in your environment variables.

### Writing & Editing Articles
- **Featured Image**: Specify a cover image URL (e.g. GitHub raw link).
- **Permanent Link (Slug)**: Generate a date-based slug (e.g., `20260921`) or enter a custom hyphenated string (e.g., `apple-fall-event-summary`). The resulting post URL will be `/article/{id}/{slug}.html`, optimized for search engine indexing.
- **Categories & Tags**: Select multiple categories and enter comma-separated tags.
- **Priority & Changefreq**: Fine-tune the article's weight (`0.0` ~ `1.0`) and suggested crawl frequency (`daily`, `weekly`, etc.) in `sitemap.xml`.

### Global Settings
In the **Settings** tab of the admin panel, you can directly edit categories, navigation menus, and blogroll links in JSON format without modifying code or redeploying.

### 🎨 Theme Customization
All templates reside in `theme/` and deploy automatically with your Worker:
- **`theme/common.css`**: Global design variables, ambient glow backgrounds, glassmorphism cards, and tag styling.
- **`theme/common.js`**: Interactive particle canvas, jelly physics effects, modal interactions, and clipboard copy helpers. Particle animations automatically throttle on touch devices or when the user enables "Reduce Motion".
- **`theme/index.html` & `theme/article.html`**: Mustache-templated HTML files (`{{ ... }}`, `{{{ ... }}}`) rendered dynamically at the edge. **Do not remove the placeholders**.
- **About Modal Info**: Customize the profile intro, avatar, email, and social media handles directly within the `about-card` section in the template files.
- **Favicon**: Replace `theme/Logo.png` (keep root `Logo.png` for GitHub repository display).

### 📥 Backup, Export & Disaster Recovery
- At the bottom of the **Settings** tab, click **Export** to download all KV data (articles, categories, navigation menus, blogroll) as a single `cfblog-YYYY-MM-DD.json` file.
- If data is ever corrupted or you migrate to a different Cloudflare account, paste the JSON content into the import box and click **Import** to rebuild the entire blog in seconds.

### 🔄 Edge Cache Synchronization & Publishing
To maintain millisecond-level responsiveness and eliminate KV read latency, the blog relies on Cloudflare's **Edge Cache**. Consequently, frontend changes will **not appear immediately** after:
1. Creating a new article
2. Editing or deleting an existing article
3. Modifying categories or navigation settings

**To publish changes**:
After completing modifications, navigate to **Publish** in the admin navbar and click the large **Publish** button. The Worker will invoke the Cloudflare Purge API to invalidate the global CDN cache. Press `Ctrl + F5` in your browser to inspect the freshly updated content globally.

---

## 🔒 Security Best Practices

1. **Enforce HTTPS**: Basic Auth credentials are transmitted in header base64. Ensure Cloudflare's **Always Use HTTPS** and **SSL/TLS: Full (Strict)** are enabled.
2. **Strong Passwords**: Never use default passwords in production. Store passwords exclusively as Cloudflare Secrets.
3. **Least Privilege API Tokens**: Restrict Cloudflare API Tokens strictly to `Workers Scripts: Edit`, `Workers KV: Edit`, and `Zone.Zone: Edit`. Avoid using Global API Keys.

---

## 📜 Acknowledgments & License

- Built on the core architecture of the open-source [CF-Blog](https://github.com/gdtool/cloudflare-workers-blog) with modern architectural and visual enhancements.
- Markdown rendering powered by [Editor.md](https://pandao.github.io/editor.md/).
- UI/UX redesigned with **Advanced Agentic Style**.
- Licensed under the [MIT License](LICENSE).

