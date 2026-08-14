<!--
============================================================
发布指引（发布时删除本注释块）
后台入口: https://leafblog.ccwu.cc/admin → 新建文章
- 标题:     DeepSeek 官方开源 Agent Harness：一切皆插件 —— DeepSeek Harness 上手指南
- 特色图片: https://raw.githubusercontent.com/Fallenleaf-hub/My-blog-theme/refs/heads/main/blog-content/deepseek-harness-guide/cover.png
- 永久链接: deepseek-harness-guide
- 分类:     按你的后台分类选择（如 Tech / 技术分享）
- 标签:     DeepSeek,Agent,Harness,开源,AI编程
发布后记得点击后台「发布」按钮清理 Edge Cache
============================================================
-->

# DeepSeek 官方开源 Agent Harness：一切皆插件

DeepSeek 官方开源了自家的智能体运行框架 **DeepSeek Harness**（命令行工具名为 `dsh`），仓库上线即获得 80k+ Star。它不是一个模型，也不是又一个 IDE 插件，而是一个 **Agent Harness（智能体外壳）**——负责把大模型、工具调用、会话日志、权限审批这些零件组装成一个真正能干活的编程智能体的那层基础设施。

它的口号只有一句话：**Everything is a Plugin（一切皆插件）**。

![DeepSeek Harness 封面](https://raw.githubusercontent.com/Fallenleaf-hub/My-blog-theme/refs/heads/main/blog-content/deepseek-harness-guide/cover.png)

## 一、DeepSeek Harness 是什么

简单来说，模型决定智能体「有多聪明」，而 Harness 决定它「能不能落地干活」。文件读写、命令执行、上下文管理、工具调度、安全审批……这些脏活累活都属于 Harness 的范畴。

DeepSeek Harness 的核心特点：

- **完全插件化架构**：模型适配器、工具注册表、会话日志，甚至 Agent 主循环本身，全部都是插件。没有「特权核心」可以打补丁，任何一部分都能通过配置替换。
- **基于 Cordis 框架**：插件向共享上下文贡献服务、类型化事件和**可撤销的副作用**，插件卸载时注册会自动回滚，天然支持热插拔。
- **双形态运行**：`web` 配置启动带浏览器界面的完整工作台；`headless` 配置则是一个无服务器的一次性运行器，适合脚本与 CI 场景。
- **MIT 协议开源**，同时处于 **Developer Preview** 阶段，迭代极快，官方明确提示**会有破坏性变更**。

> 项目地址：[github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## 二、快速开始

### 环境要求

只需要安装 **Node.js**（源码开发方式还需要 `pnpm`）。

### 方式一：npx 一键运行（推荐）

```bash
npx @deepseek-ai/dsh web
```

命令会启动 Web UI，默认监听 `http://127.0.0.1:3080`，终端会打印实际访问地址。

### 方式二：从源码运行

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

## 三、首次运行三步走

### 1. 配置模型

打开 Web UI 的 **设置 → 模型**：

- **DeepSeek 卡片**：填入 DeepSeek API Key 保存即可，模型路由立即生效，**无需重启服务**。
- 密钥是只写的：保存后页面只保留脱敏描述符，明文存储在 `$DSH_HOME/.credentials.yaml` 中，settings 只保存凭据引用。

除了 DeepSeek，还可以通过 **添加提供方** 接入 Anthropic、OpenAI 等目录提供方；对于公司网关或自建服务，选择 **添加自定义提供方**，填写 Provider ID、基础 URL、协议和模型列表即可——任何 OpenAI 兼容端点都能接进来。

### 2. 选择工作区

点击 **选择工作区**，添加启动 `dsh` 时所在的项目目录并选中。注意：**选中工作区之前，会话输入框是不可用的**。

### 3. 运行第一个任务

新建会话，发一条消息试试：

> Summarize this repository and identify its main packages.

Agent 会读取并编辑工作区文件、执行命令、委派子任务并维护执行计划。当某个操作触发当前权限策略的审批时，Web UI 会先弹窗征求你的同意——安全性这块是默认收紧的。

## 四、架构速览：为什么说「一切皆插件」

如果你只是想用，可以跳过这一节；但如果你想理解它和同类产品的本质差异，这里是精华。

### Profile 与 Bundle

一个运行中的 `dsh` 是**启动时按层组合出来的插件树**：

- **Profile（配置档）**：命名的组合方案，保存在 Harness home 目录，`web` 和 `headless` 是官方内置的两个模板。
- **Bundle（捆绑包）**：Cordis 配置行与其挂载代码的发行格式，上层永远可以用 patch 覆盖下层。
- `dsh-base` 是所有 Profile 的第一层：模型适配器、工具、持久化、沙箱与审批策略、凭据、遥测全在其中。

查看你机器上实际启动的插件树：

```bash
dsh --profile web --dump-config
```

输出的任何一行配置，都可以用你自己的 patch 替换。

### 核心包一览

| 包 | 职责 | 上下文键 |
| --- | --- | --- |
| `core/session` | 只增不改的 SessionEvent 日志 | `ctx.sessions` |
| `core/system-prompt` | 提示词分段与工具 Schema 组装 | `ctx.systemPrompt` |
| `core/tools` | 作用域工具注册表与受守卫的执行管线 | `ctx.tools` |
| `core/agent` | Agent 接口、实例注册表与 agent/* 事件 | `ctx.agents` |
| `core/agent-loop` | 默认的智能体循环驱动器 | `ctx.agentLoop` |
| `llm/llm` | 消息与流式词汇表、模型适配器接缝 | `ctx.llm` |

### 两个有意思的设计

**会话日志是唯一事实来源**。模型能看到的一切上下文都由 `deriveMessages()` 从日志投影而来，运行时有一个不变式断言：「凡是模型可见的，必须可从日志重建」。Fork、恢复、转录、遥测全部派生自这一条流。

**能力接缝（Capability Seams）**。文件系统与子进程提供方共享同一个执行世界，只要把它们指向一个远程沙箱，Bash、PTY、LSP 会一起跟着搬家，不需要为每个工具单独改造——换一个 Provider，改变的是整个产品。

## 五、进阶玩法

- **Python SDK**：`docs/user/guide/python-sdk.md` 提供了从 Python 驱动 Harness 的方式。
- **CLI 模式**：除 Web UI 外还有多种命令行模式，见 `apps/cli/README.md`。
- **开发插件**：从 `docs/user/develop/` 入门，官方建议给插件仓库加上 `dsh-plugin` topic 以便被发现。

## 六、注意事项与展望

1. **Developer Preview 阶段**：API 与配置随时可能有破坏性变更，生产环境上船前请锁好版本。
2. **DeepSeek 官方 chat-completions 路由目前是纯文本的**，无法通过配置开启图片输入；自定义提供方的视觉模型需要在 `settings.yaml` 中显式声明 `input: [text, image]`。
3. 反馈与 Bug 走 GitHub Discussions，社区交流可加入官方 Discord。

从「模型即产品」到「开源自己智能体的骨架」，DeepSeek 这一步走得相当激进。当 Harness 层的每一块都能被替换，模型厂商、工具生态和开发者之间的边界也会被重新划定。值得一试。

## 参考链接

- [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness)
- [DeepSeek Harness 官网（Developer Preview）](https://deepseek.com/harness/)
- [架构文档 architecture.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md)
- [用户指南：使用 Web UI](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md)
- [用户指南：配置模型](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md)
