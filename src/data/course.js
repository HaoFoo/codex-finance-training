import {
  ArrowsClockwise,
  Browser,
  CalendarDots,
  ChartLineUp,
  CodeBlock,
  FileText,
  GitBranch,
  GlobeHemisphereWest,
  Robot,
  ShieldCheck,
  Sparkle,
  SquaresFour,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";

export const navigation = [
  { id: "overview", label: "课程概览" },
  { id: "basics", label: "快速入门" },
  { id: "capabilities", label: "进阶能力" },
  { id: "case", label: "贯穿案例" },
  { id: "labs", label: "实战练习" },
];

export const desktopEntries = [
  {
    title: "新建任务",
    summary: "从一个目标开始，让 Codex 读取材料、执行操作并交付成果。",
    action: "把目标、上下文、限制条件和完成标准写清楚。",
    icon: Sparkle,
  },
  {
    title: "拉取请求",
    summary: "集中查看代码或网站修改，完成 review、commit、push 和 PR。",
    action: "非技术用户先理解为“变更的审批与发布记录”。",
    icon: GitBranch,
  },
  {
    title: "站点",
    summary: "把需求直接变成可访问的网页、工具或交互式数据故事。",
    action: "适合政策宣导、经营看板、培训页和轻量工具。",
    icon: GlobeHemisphereWest,
  },
  {
    title: "设置",
    summary: "管理模型、权限、Skills、Plugins、Computer Use 与工作环境。",
    action: "默认采用最小权限；需要时再扩大文件或网络范围。",
    icon: Wrench,
  },
];

export const capabilities = [
  {
    key: "prompt",
    eyebrow: "01 · 任务定义",
    title: "把模糊需求，变成清晰任务",
    body: "用目标、上下文、限制条件和完成标准四要素，让第一次交付就更接近可用。复杂任务先进入 Plan，再实施。",
    example: "先调研我，直到需求明确；给出计划后再开始制作。",
    icon: FileText,
  },
  {
    key: "skills",
    eyebrow: "02 · Skills",
    title: "把最佳做法，封装成可复用流程",
    body: "Skill 不只是提示词。它可以携带步骤、模板、参考材料和脚本，让团队每次都按同一标准交付。",
    example: "把月度经营复盘流程生成一个 Skill，并用模拟数据测试。",
    icon: Sparkle,
  },
  {
    key: "plugins",
    eyebrow: "03 · Plugins / MCP",
    title: "让 Codex 连接真实工具与数据",
    body: "Plugin 可以打包 Skills、Connector 与 MCP。飞书 CLI 则让 Codex 能读取文档、操作多维表格并写回交付物。",
    example: "调用飞书 Skills，创建复盘文档并写入分析结论。",
    icon: SquaresFour,
  },
  {
    key: "subagents",
    eyebrow: "04 · Subagents",
    title: "让不同角色并行工作",
    body: "把可独立推进的工作分给多个子智能体：法务看风险，财务看差异，税务看事项，经营分析做综合判断。",
    example: "请使用 5 个 Subagents 并行分析，每个只负责一个专业视角。",
    icon: UsersThree,
  },
  {
    key: "superpowers",
    eyebrow: "05 · Superpowers",
    title: "让复杂工作先思考，再执行",
    body: "Superpowers 是第三方 workflow plugin，包含 brainstorming、planning、系统化排障、Skill 编写与协作执行等方法。",
    example: "使用 Superpowers 先澄清需求、形成方案，再执行并复核。",
    icon: Robot,
  },
  {
    key: "agents-md",
    eyebrow: "06 · AGENTS.md",
    title: "把团队规则写进工作环境",
    body: "用 AGENTS.md 固化语言、格式、风险边界和验收方式。规则随项目加载，不需要每次重新解释。",
    example: "根据我们刚才确认的工作方式，生成项目级 AGENTS.md。",
    icon: CodeBlock,
  },
  {
    key: "browser",
    eyebrow: "07 · Browser / Computer Use",
    title: "跨越网页与桌面软件",
    body: "需要图形界面时，Codex 可以操作受允许的浏览器或桌面应用。适合网页录入、系统巡检和无法通过 API 完成的动作。",
    example: "打开模拟系统，读取页面状态并完成低风险验证。",
    icon: Browser,
  },
  {
    key: "automation",
    eyebrow: "08 · Automations",
    title: "让稳定流程按时自动运行",
    body: "把经过验证的 prompt 与 Skill 设为定时任务，例如周报、月结检查、文档更新提醒和数据异常巡检。",
    example: "每周一 09:00 汇总指定材料，生成经营周报草稿。",
    icon: CalendarDots,
  },
  {
    key: "delivery",
    eyebrow: "09 · Git / PR / Sites",
    title: "从生成结果，到可审阅的交付",
    body: "用 Git 记录变更，用 PR 完成 review，用 Sites 或 GitHub Pages 发布网页，让结果可追踪、可回退、可共享。",
    example: "检查修改、运行验证、提交变更并发布站点。",
    icon: ArrowsClockwise,
  },
];

export const roles = [
  {
    name: "法务",
    task: "识别合同中的付款、责任与续约风险",
    output: "风险分级与建议动作",
    accent: "#2f6f60",
  },
  {
    name: "行政",
    task: "检查采购进度、供应商事项与执行阻塞",
    output: "行政事项与负责人清单",
    accent: "#7f6a9a",
  },
  {
    name: "财务",
    task: "分析预算差异、费用结构与现金影响",
    output: "差异解释与财务洞察",
    accent: "#0a8f3d",
  },
  {
    name: "税务",
    task: "识别发票、申报与税会差异事项",
    output: "税务风险与截止日期",
    accent: "#bd6e32",
  },
  {
    name: "经营分析",
    task: "汇总指标变化，形成管理层判断",
    output: "经营结论与行动建议",
    accent: "#2c7280",
  },
];

export const learningPath = [
  {
    step: "01",
    title: "课前准备",
    text: "完成 Codex 安装与飞书 CLI 配置；确认可登录、可打开项目、可调用 Skills。",
    icon: ShieldCheck,
  },
  {
    step: "02",
    title: "现场跟做",
    text: "复制一个 demo prompt，让 Codex 读取模拟文件并生成本地或飞书成果。",
    icon: Robot,
  },
  {
    step: "03",
    title: "带回岗位",
    text: "选一个每周重复的任务，沉淀 prompt，稳定后再生成 Skill 或 Automation。",
    icon: ChartLineUp,
  },
];

export const resourceLinks = [
  {
    title: "内部 Skill 市场",
    description: "优先从公司内部市场搜索、安装和复用已审核能力。",
    href: "https://skills.ijovo.com/",
    label: "打开 Skill 市场",
  },
  {
    title: "飞书 CLI 实战指南",
    description: "课前配置或会后自学时，参考完整安装、授权和场景说明。",
    href: "https://www.feishu.cn/community/prompts?id=7649306513806216122&from=ug_from_subscribe_update",
    label: "查看飞书指南",
  },
  {
    title: "财运学院",
    description: "GitHub 与科学上网课程统一从 Finance Learning Hub 进入。",
    href: "internal-learning-hub",
    label: "进入学习中心",
  },
];

