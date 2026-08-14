---
name: blog-writing
description: 按 LeafBlog 统一规范生成博客文章全套内容，包括主题资料调研、AI 生成封面图、Markdown 正文撰写、blog-content/<slug>/ 目录管理、发布信息注释块与发布步骤交付。Use when the user asks to write, publish, or draft a blog post, or mentions 写博客、写一篇博客、发博客、博客文章、技术分享文章, or requests content about a project/tool to be published to the blog.
---

# LeafBlog 博客写作

为 LeafBlog 博客生成风格统一的文章内容。

## 执行方式

**先完整阅读规范文件 [blog-content/BLOG-WRITING-GUIDE.md](../../../blog-content/BLOG-WRITING-GUIDE.md)**，然后严格按其中的五步工作流程执行：

1. 资料调研（联网搜索，官方来源优先，事实不得虚构）
2. 生成封面图（ImageGen，1792x1024，按指南中的 prompt 要求）
3. 创建 `blog-content/<slug>/` 目录，封面保存为 `cover.png`
4. 按正文结构模板与写作风格规范撰写 `article.md`（顶部含发布信息注释块）
5. 按交付清单向用户交付：特色图片 URL、永久链接、建议标题与标签、发布步骤

## 注意事项

- 规范文件是唯一事实来源，本文件与规范冲突时以 BLOG-WRITING-GUIDE.md 为准
- slug 用小写英文 + 连字符，与文章永久链接一致
- 封面 raw URL 格式与发布信息注释块模板见规范文件，不得自创格式
- 完成后提醒用户：发布前需先将 `blog-content/<slug>/` push 到 GitHub
