# 🍃 My-blog-theme (LeafBlog)

<p align="center">
  <a href="README.md">简体中文</a> | <b>English</b>
</p>

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Cloudflare KV](https://img.shields.io/badge/Cloudflare-KV-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/learning/how-kv-works/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automation-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Markdown](https://img.shields.io/badge/Markdown-Support-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)
[![Style](https://img.shields.io/badge/Style-Liquid_Glass_Morphism-00e5ff?style=for-the-badge)](https://github.com/)

**LeafBlog** is an ultra-lightweight, blazing-fast personal blog system powered by **Cloudflare Workers** edge serverless compute and **Cloudflare KV** distributed key-value storage. Featuring a 100% serverless architecture with zero hosting costs and intelligent global edge routing, it delivers sub-100ms loading speeds worldwide without requiring traditional VPS servers or databases.

This project has undergone a comprehensive aesthetic and architectural overhaul, introducing next-generation **Liquid Glass Morphism** (vibrant fluid aurora gradients, high-translucency dual-layer frosted glass cards, specular micro-borders, physical depth elevation, and Jelly spring micro-interactions). It introduces a revolutionary **Left-Side Floating Dropdown TOC**, fully immersive reading typography, standardized content authoring guidelines (v2.1), ready-to-use admin dashboard, automated SEO optimization, full-site backup & restore, and edge cache synchronization.

All front-end templates reside in the `theme/` directory and are distributed via **Cloudflare Workers Assets self-hosting** (`run_worker_first` mode). Bundled and served directly alongside the Worker without external CDN single-point dependencies, it pairs with the built-in `THEME_ASSET_VERSION` cache-busting mechanism to ensure instant global updates upon deployment.

---

## ✨ Key Features

- ⚡ **Ultra-Lightweight & Blazing Edge Speed**: Fully powered by Cloudflare's Serverless Edge. Static assets and APIs are served directly from hundreds of global PoPs. In tandem with the Edge Cache API, KV database reads are minimized to deliver sub-100ms response times globally.
- 🎨 **Next-Gen Liquid Glass Morphism Aesthetic**:
  - **Dynamic Fluid Aurora Backdrop**: Ambient Gaussian-dispersed multi-color fluid orbs (blue, violet, cyan gradients) with subtle interactive particles.
  - **High-Translucency Refractive Cards**: Multi-tiered `backdrop-filter` blurring, delicate inner specular highlights (`inset 0 1.5px 1px rgba(...)`), and soft elevation shadows mimicking real physical glass.
  - **Jitter-Free Page Transitions**: Built-in `scrollbar-gutter: stable` viewport stabilization, eliminating layout shifts and frame skips when switching between Home, Topics, Archive, and Admin pages.
  - **Tactile Jelly Micro-Interactions**: Interactive buttons and links feature spring-physics micro-feedback for an engaging tactile feel.
  - **Floating "About Me" Glass Modal**: Elegant profile card modal supporting one-click email copying and direct social links.
- 📖 **Immersive Long-Form Reading Experience**:
  - **Floating Dropdown Table of Contents (TOC)**: Replaces traditional bulky sidebars with a sleek, left-aligned circular button. Hovering or clicking smoothly expands a glassmorphic dropdown TOC without cluttering the reading view.
  - **Optimized Content Typography**: Carefully balanced reading column width and whitespace proportions for distraction-free deep reading.
  - **Streamlined Metadata Header**: Author badge (Admin), publication date, and category tags are neatly unified right beneath the post title.
  - **Full Mobile Optimization**: Eradicates top and bottom white margin gaps on mobile browsers for a seamless full-bleed fluid background. Resolves list indentation offset and table overflow issues for balanced visual weight.
- 🖼️ **Out-of-the-box Content Ecosystem & 2026 Tech Library**:
  - Includes **[BLOG-WRITING-GUIDE.md](blog-content/BLOG-WRITING-GUIDE.md) (v2.1 Standards)**, establishing the "Search First" and "Grounded Generation Only" golden rules for covers and layout.
  - Ships with 5 ready-to-publish, high-standard frontier tech articles (covering the latest September 2026 global AI landscape with Claude Fable 5.1 / GPT-6 Astra / DeepSeek-V4.1-Flash, the 2026 Apple Event & iPhone 18 Series, DeepSeek Harness Open Source Framework, and Google Gemini 3.7 / 3.8 Flash), each equipped with a bespoke, clean 16:9 no-text Liquid Glass cover.
- 🤖 **Native GitOps Automated Publishing Pipeline**:
  - Simply write Markdown under `blog-content/<slug>/` and run `git push`. GitHub Actions automatically parses metadata, resolves 16:9 cover links, performs in-place incremental updates or creates new posts, and purges Cloudflare Edge Cache worldwide.
- 📝 **Full-Featured Markdown Suite**: Deep integration with `Editor.md`, supporting real-time split-screen preview, syntax highlighting, code folding, emojis, TeX/KaTeX mathematical formulas, and tables.
- ⚙️ **Rich Metadata Control**: Posts support custom featured cover images, SEO-friendly permanent slugs, multi-category taxonomy, comma-separated tags, and sitemap crawl priority/frequency controls.
- 📂 **Automated Full-Site Backup & Disaster Recovery**:
  - **One-Click Export**: Packages all posts and KV configurations into a single standardized JSON backup file.
  - **One-Click Import**: Restores the entire blog state and settings in seconds by importing a backup JSON file.
- 🚀 **GitHub Actions Automated CI/CD**: Pushing changes to `main` automatically triggers dependencies validation, asset version stamping, Cloudflare Worker deployment, and automated post synchronization.
- 🔍 **Geeky SEO Optimization**:
  - Automatically generates standard-compliant `/sitemap.xml`.
  - Supports post-level dynamic configuration of `changefreq` and `priority`.
  - Semantic HTML5 structure with `/robots.txt` protecting the `/admin` route from search crawlers.

---

## 📁 Directory Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD and automated sync workflow (locked to stable Wrangler)
├── scripts/
│   └── sync-posts.mjs          # GitOps post synchronization script (metadata parsing, incremental sync, cache purge)
├── theme/                      # Theme templates (self-hosted via Workers Assets)
│   ├── admin/
│   │   ├── index.html          # Admin dashboard (post management, creation, settings, publish)
│   │   └── edit.html           # Post editor (Markdown & rich metadata controls)
│   ├── article.html            # Article template (immersive typography, floating TOC, meta bar)
│   ├── index.html              # Blog homepage template (Home/Topics/Archive/About & Glass Modal)
│   ├── common.css              # Global styles (Liquid Glass variables, aurora backdrop, TOC, etc.)
│   ├── common.js               # Global scripts (particles, dropdown TOC, jelly bounce, modal logic)
│   └── Logo.png                # Blog Logo & favicon
├── blog-content/               # Content workspace & guidelines (isolated from Worker bundle)
│   ├── BLOG-WRITING-GUIDE.md   # Blog writing & cover design guidelines (v2.1 standards)
│   ├── global-ai-models-landscape-2026/ # September 2026 Global AI Models Landscape (Fable 5.1 / Astra / V4.1)
│   │   ├── article.md          # Markdown source with verified 2026 benchmarks comparison table
│   │   └── cover.png           # 16:9 liquid glass astrolabe prism cover
│   ├── apple-fall-event-summary/       # 2026 Apple Fall Event Review (iPhone 18 Series)
│   │   ├── article.md          # Markdown source with publishing header comments
│   │   └── cover.png           # 16:9 clean Apple prism reflection cover
│   ├── deepseek-harness-guide/         # DeepSeek Agent Harness (dsh) Starter Guide
│   │   ├── article.md
│   │   └── cover.png           # 16:9 crystalline whale & modular glass cubes cover
│   ├── gemini-3-7-flash/               # Google Gemini 3.7 Flash Deep Dive
│   │   ├── article.md
│   │   └── cover.png           # 16:9 4-point star prism & orbital speed rings cover
│   └── gemini-3-8-flash-gemini-4-pro/  # Gemini 3.8 Flash & Gemini 4 Pro Synthesis
│       ├── article.md
│       └── cover.png           # 16:9 dual celestial intelligence resonance cover
├── worker.js                   # Cloudflare Workers server-side core script (SSR, routing & cache)
├── wrangler.toml               # Wrangler configuration (declares Assets & KV bindings)
├── package.json                # Project dependencies and script entry point (npm run sync)
├── Logo.png                    # Repository display Logo
├── cover.png                   # Repository showcase cover
├── blog_feature_cover.png      # Repository feature cover
└── README.md                   # Project documentation
```

---

## 🚀 Deployment & Configuration Guide

### 1. Prerequisites

1. A free [Cloudflare](https://dash.cloudflare.com/) account.
2. In Cloudflare Dashboard, navigate to **Workers & Pages** -> **KV** -> **Create a namespace**, name it `CFBLOG` (or any custom name), and copy the generated **Namespace ID**.
3. Attach your custom domain to Cloudflare (highly recommended, as `workers.dev` may face network restrictions in certain regions).

---

### 2. Local Project Configuration

#### ① Modify `wrangler.toml`
Open [wrangler.toml](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/wrangler.toml) in the root directory and link your KV namespace:
```toml
name = "leafblog" # Worker name
main = "worker.js"
compatibility_date = "2026-04-28"

# Self-hosted theme assets: Worker takes precedence, reads theme/ via ASSETS binding
# ⚠️ run_worker_first MUST be true, otherwise / and /admin will return raw HTML templates
assets = { directory = "./theme", binding = "ASSETS", run_worker_first = true }

# Bind your KV namespace (note double brackets)
[[kv_namespaces]]
binding = "CFBLOG"
id = "YOUR_KV_NAMESPACE_ID" # <--- Paste your KV Namespace ID here
```

> ⚠️ **Wrangler Version Note**: `run_worker_first` requires modern Wrangler (v4.x). Older action versions may ignore this setting. [deploy.yml](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/.github/workflows/deploy.yml) locks in a tested stable Wrangler version.

#### ② Configure Core Settings & Environment Variables
Open [worker.js](file:///c:/Users/Fallenleaf/Desktop/Blog-theme/My-blog-theme/worker.js) and locate the global `OPT` constant object at the top. **To avoid exposing passwords or API tokens in public GitHub repositories, the system dynamically reads configuration from Cloudflare Environment Variables & Secrets.**

You can keep placeholders in `worker.js` and configure them in Cloudflare Dashboard:

| Config Key | Default Value | Cloudflare Variable Name | Variable Type | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`user`** | `"admin"` | `BLOG_USER` | `Environment Variable` | Admin login username. |
| **`password`** | `"your_password"`| `BLOG_PASSWORD` | **`Secret` (Encrypted)** | Admin login password (**strongly recommended as Secret**). |
| **`siteDomain`** | `"leafblog.ccwu.cc"`| `BLOG_SITE_DOMAIN` | `Environment Variable` | Bound custom domain (without `https://`). |
| **`siteName`** | `"FallenLeaf Blog"`| `BLOG_SITE_NAME` | `Environment Variable` | Global blog title. |
| **`siteDescription`**| `"A Blog..."` | `BLOG_SITE_DESCRIPTION`| `Environment Variable` | Blog description for SEO Meta. |
| **`keyWords`** | `"cloudflare..."`| `BLOG_KEYWORDS` | `Environment Variable` | SEO keywords (comma-separated). |
| **`cacheZoneId`** | `""` | `BLOG_CACHE_ZONE_ID` | `Environment Variable` | Cloudflare Zone ID for automated cache purging. |
| **`cacheToken`** | `""` | `BLOG_CACHE_TOKEN` | **`Secret` (Encrypted)** | Cloudflare API Token for purge requests. |
| **`pageSize`** | `5` | - | - | Posts per page on the homepage. |
| **`recentlySize`** | `6` | - | - | Recent posts shown in the sidebar. |
| **`readMoreLength`**| `150` | - | - | Character count for post summary excerpts. |
| **`cacheTime`** | `43200` | - | - | Edge HTML cache TTL (seconds, default 12h). |
| **`themeURL`** | `"https://raw..."`| - | - | GitHub raw fallback URL. Used only if Assets are unavailable. |
| **`copyRight`** | `"Powered by..."` | - | - | Footer copyright text. |

#### ③ Bind Variables in Cloudflare Dashboard (Recommended)
1. In [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** and select your Worker.
2. Navigate to **Settings** -> **Variables**.
3. Under **Environment Variables**, click **Add variable**:
   - `BLOG_USER`: Type `Environment variable`, value: your admin username.
   - `BLOG_PASSWORD`: Type **`Secret`**, value: your secure password.
   - `BLOG_CACHE_TOKEN`: Type **`Secret`**, value: your Cloudflare API Token.
   - Add any other optional public variables (`BLOG_SITE_DOMAIN`, `BLOG_SITE_NAME`, etc.).
4. Click **Save and deploy**.

---

### 3. Setup GitHub Actions (Continuous Deployment & Automated Publishing)

1. Push or Fork this repository to your GitHub account.
2. In your repository, go to **Settings** -> **Secrets and variables** -> **Actions**.
3. Click **New repository secret** and add the following keys:
   - **Core Deployment Secrets (Required)**:
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token (must have Workers and KV edit permissions).
   - **Automated Article Publishing Secrets (Highly Recommended for GitOps)**:
     - `BLOG_USER`: Your admin login username (e.g. `admin`).
     - `BLOG_PASSWORD`: Your admin login password (must match the one configured in Cloudflare).
4. **🎉 Frictionless Authoring Workflow (GitOps)**:
   - Once configured, whenever you write or edit posts under `blog-content/<slug>/` locally, just run `git push`.
   - GitHub Actions will bundle your Worker, **automatically parse your Markdown frontmatter/metadata, generate 16:9 GitHub Raw cover URLs and plain-text summaries, create new posts or perform in-place incremental updates, and automatically purge Cloudflare Edge Cache worldwide**!
   - Say goodbye to manual copy-pasting in the web admin dashboard.

---

### 4. Purge Cache After Deployment (Important)

Because the site leverages aggressive Edge Caching, **redeployments may take up to 12 hours to reflect without a cache purge**:

- **Method 1 (Recommended)**: Cloudflare Dashboard → Select Domain → **Caching → Configuration → Purge Everything**.
- **Method 2**: If `BLOG_CACHE_ZONE_ID` and `BLOG_CACHE_TOKEN` are set, log into `/admin`, navigate to **Publish**, and click **Publish** to invoke the Purge API automatically.
- **Method 3**: If automated article sync is enabled, the pipeline **automatically purges edge cache via API** upon sync completion without manual intervention.

---

## 📝 Usage & Authoring Guidelines

### Admin Access
- URL: `https://your-domain/admin`
- Authentication: Protected via HTTP Basic Auth. Enter the credentials defined in `worker.js` / Cloudflare Secrets.

### Creating & Editing Articles
- **Featured Image (Cover)**: Specify an image URL (e.g. your raw GitHub `cover.png` link). Adhere to `blog-content/BLOG-WRITING-GUIDE.md` for clean 16:9 no-text visuals.
- **Permanent Link (Slug)**: Quick-fill with the date (e.g. `20260921`) or specify semantic English slugs. Posts render at `/article/id/slug.html`.
- **Categories & Tags**: Select multiple categories and enter comma-separated tags.
- **SEO Priority**: Customize sitemap crawl priority (0.0 - 1.0) and update frequency.

### 🎨 Theme Customization
All frontend assets reside in `theme/`:

- **`theme/common.css`**: Global stylesheet defining Liquid Glass CSS variables (`--glass-bg`, `--glass-border`, etc.), fluid ambient lighting, floating TOC container (`.toc-float-container`), article metadata bar, and mobile responsive rules.
- **`theme/common.js`**: Global script managing dynamic particles, floating dropdown TOC hover/touch toggles, Jelly spring physics, and About Me modal clipboard interactions.
- **`theme/index.html` / `theme/article.html`**: Core templates rendered at the edge with Mustache `{{ ... }}` placeholders.
- **About Me Card**: Edit the `about-card` section directly in template HTML to personalize bio, avatar, and social links.

### 📥 Backup & Disaster Recovery
- Under admin "Settings", download a single standardized `cfblog-YYYY-MM-DD.json` containing all KV data (posts, categories, menus, blogrolls).
- To restore, paste the JSON content into the import box and click **Import** to rebuild the entire blog in seconds.

---

## 🔒 Security Best Practices

1. **Enforce HTTPS**: Basic Auth credentials are transmitted encoded in base64. Ensure Cloudflare **SSL/TLS (Full or Strict)** and **Always Use HTTPS** are enabled.
2. **Strong Passwords**: Never deploy with the default password. Inject a strong password via Cloudflare Secrets.
3. **Least-Privilege API Tokens**: Ensure Cloudflare API tokens only hold `Workers Scripts: Edit`, `Workers KV: Edit`, and optionally `Zone.Zone: Edit` permissions. Avoid using Global API Keys.

---

## 📜 Acknowledgements & License

- Core serverless architecture inspired by the open-source [CF-Blog](https://github.com/gdtool/cloudflare-workers-blog).
- Markdown editing powered by [Editor.md](https://pandao.github.io/editor.md/).
- Visual design crafted with the **Liquid Glass Morphism** fluid refractive aesthetic.
- Licensed under the [MIT License](LICENSE).
