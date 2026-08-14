<!--
============================================================
发布指引（发布时删除本注释块）
后台入口: https://leafblog.ccwu.cc/admin → 新建文章
- 标题:     三周一迭代、价格砍半：Google 发布 Gemini 3.7 Flash 全解读
- 特色图片: https://raw.githubusercontent.com/Fallenleaf-hub/My-blog-theme/refs/heads/main/blog-content/gemini-3-7-flash/cover.png
- 永久链接: gemini-3-7-flash
- 分类:     按后台分类选择
- 标签:     Gemini,Google,AI,大模型,编程智能体
发布后记得点击后台「发布」按钮清理 Edge Cache
============================================================
-->

# 三周一迭代、价格砍半：Google 发布 Gemini 3.7 Flash 全解读

2026 年 8 月 13 日，Google 正式发布了 **Gemini 3.7 Flash**——官方给它的定位是「迄今最智能的 workhorse（主力干活）模型，专为编程与智能体打造」。距离上一代 3.6 Flash 发布仅仅过去 **三周**，这个迭代速度本身就说明了 Flash 系列的竞争烈度。

更激进的是价格：首发优惠价 **$0.75/百万输入 token、$3.75/百万输出 token**，只有 3.6 Flash 原价的一半。性能大幅上涨、价格直接腰斩，Google 这次把「性价比」三个字写在了脸上。

![Gemini 3.7 Flash 封面](https://raw.githubusercontent.com/Fallenleaf-hub/My-blog-theme/refs/heads/main/blog-content/gemini-3-7-flash/cover.png)

## 一、Gemini 3.7 Flash 是什么

Gemini 3.7 Flash 是 Gemini 3 系列的最新成员，属于**原生多模态推理模型**。在 Google 的产品矩阵里，Flash 系列的定位不是「最强」，而是「最能打的主力」：面向大规模生产环境的编程、Agent 和知识工作负载，主打速度、成本与质量的平衡。

官方称这次升级是「开发者反馈与算法创新的直接成果」，核心改进集中在三个方向：**软件工程、知识工作、Web 开发**。

## 二、跑分说话：全面压制 3.6 Flash

这次官方给出的对比基准非常聚焦，全是「干活」场景：

| 基准测试 | 场景 | 3.7 Flash | 3.6 Flash |
| --- | --- | --- | --- |
| FrontierCode 1.1 Main | 生产级代码质量 | **43.6%** | 34.4% |
| DeepSWE v1.1 | 长程软件工程任务 | **65.3%** | 49.0% |
| WebDev Arena (Elo) | Web 开发对战 | **1588** | 1538 |
| GDP.pdf | 专家级 PDF 文档理解 | **34.0%** | 22.0% |
| AutomationBench | 企业工作流自动化 | **30.4%** | 17.0% |

几个值得注意的点：

- **DeepSWE 提升 16.3 个百分点**，这是衡量模型独立完成真实软件工程 issue 的能力，直接对应日常 debug 与 issue 修复场景
- **首次生成代码的正确率更高**，意味着更少的返工与重试
- 金融、法律、生物医药等**知识密集型领域**的推理准确性同步提升（GDP.pdf 反映复杂文档处理能力）
- AutomationBench 几乎翻倍，说明它处理**真实业务工作流**的能力显著增强

## 三、开发者体验：更「听话」的模型

跑分之外，Google 这次特别强调了**开发体验**的改善，这也是实际使用中最能感知的部分：

- **遇到障碍会自适应**：不再一条路走到黑，卡住时会调整策略
- **主动澄清意图**：需求模糊时会先确认，而不是瞎猜
- **指令遵循保真度更高**：长指令、多约束场景下不容易跑偏
- **思考更勤勉**：在多步规划和工具调用上投入更多推理，换来的是更少的人工盯梢

用官方的话说：「更有纪律的执行，意味着工程工作流中更少的人工监督和重试」。对跑生产级 Agent 的团队来说，这比跑分更值钱。

## 四、价格与可用性

### 首发优惠价（年底之前有效）

```text
输入: $0.75 / 百万 token
输出: $3.75 / 百万 token
```

官方明确这是 **introductory price（首发价）**，且「可用至年底」——言下之意，明年价格大概率回调，有生产需求的团队可以考虑在窗口期压测迁移。

### API 侧关键参数

| 项目 | 规格 |
| --- | --- |
| 模型代码 | `gemini-3.7-flash`（稳定版） |
| 输入模态 | 文本、图像、视频、音频、PDF |
| 输入上下文 | 1,048,576 token（1M） |
| 输出上限 | 65,536 token |
| 思考模式 | 支持（low / medium / high，不支持 minimal） |
| 知识截止 | 2026 年 3 月 |

能力方面：**函数调用、结构化输出、代码执行、搜索接地（含 Google Maps）、文件搜索、URL 上下文、缓存**全部支持，Computer Use 处于 Preview 阶段；消费方式支持 Batch、Flex 与 Priority 推理。暂不支持音频/图像生成与 Live API。

### 各入口的可用性

- **开发者**：Gemini API（AI Studio、Android Studio）、Google Antigravity
- **企业**：Gemini Enterprise Agent Platform、Gemini Enterprise 应用
- **个人用户**：Gemini 应用的 **Spark**（24/7 个人智能体，需 AI Pro/Ultra 订阅，160+ 国家）

## 五、四个官方演示，看它到底能干嘛

Google 同步放出了四个组合技演示，可以看出它主打的是**编排能力**：

1. **一句话生成可玩的 3D 游戏**：3.7 Flash 结合 Nano Banana 实时生成角色、道具与贴图
2. **单次生成完整交互式落地页**：编排子智能体，配合 Gemini Omni 生成视差交互组件
3. **机器人训练闭环**：三个 Agent 组成的图结构循环，用多模态理解加速机器人模型训练
4. **PDF 变交互式数据故事**：静态年报被转换成带实时图表的 Web 体验

## 六、注意事项与展望

1. **首发价有时限**：优惠价到今年年底为止，做成本规划时别按这个价格做长期假设
2. **思考模式没有 minimal 档**：传 `minimal` 会直接报错，低延迟场景请用 `low`
3. **个人端暂时只在 Spark 里**：Gemini 应用里普通对话框还没铺开，且需要付费订阅
4. 安全方面，该模型随附更新的 **CBRN（化生放核）与网络攻击防御护栏**，详见官方 Model Card

三周一迭代、跑分大涨、价格砍半——Flash 系列的节奏已经明显是冲着「Agent 时代的基础设施」去的。当编程智能体的 token 消耗量以任务计而非对话计时，谁能把「能干活的模型」做到最便宜，谁就握住了下一阶段的入口。Gemini 3.7 Flash 就是 Google 递出的一张牌。

## 参考链接

- [Google 官方博客：Introducing Gemini 3.7 Flash](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/)
- [Gemini API 模型文档：Gemini 3.7 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash)
- [Gemini 3.7 Flash Model Card（Google DeepMind）](https://deepmind.google/models/model-cards/gemini-3-7-flash/)
- [在 Google AI Studio 中试用](https://aistudio.google.com/prompts/new_chat?model=gemini-3.7-flash)
