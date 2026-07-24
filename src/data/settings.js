import {
  Code,
  GearSix,
  PlugsConnected,
  ShieldCheck,
  UserCircleGear,
} from "@phosphor-icons/react";

export const settingsGroups = [
  {
    key: "permissions",
    label: "权限与安全",
    eyebrow: "01 · 常规",
    title: "先决定 Codex 能做到哪里",
    summary: "权限决定可执行边界，审核决定越界时由谁确认。两者不是一回事。",
    recommendation: "课堂推荐：默认权限开启；自动审核按公司策略；完全访问权限关闭。",
    icon: ShieldCheck,
    items: [
      {
        name: "默认权限",
        detail: "允许 Codex 在当前 Workspace 内读取、编辑和运行必要操作；访问范围外资源时再申请。",
      },
      {
        name: "自动审核",
        detail: "把原本需要人工处理的部分批准请求交给独立 reviewer 判断，但不会扩大 sandbox 边界。",
      },
      {
        name: "完全访问权限",
        detail: "解除本地 sandbox 限制并减少确认提示。只适合可信、隔离、可回滚的环境，不用于日常培训。",
      },
    ],
  },
  {
    key: "workflow",
    label: "使用方式",
    eyebrow: "02 · 常规",
    title: "把桌面端调成适合现场操作的状态",
    summary: "这些设置不改变 Codex 的能力，但会明显影响演示节奏、终端位置与消息处理方式。",
    recommendation: "课堂推荐：中文界面、保持唤醒、快速模式；跟进行为使用“引导”，避免中途消息丢失。",
    icon: GearSix,
    items: [
      {
        name: "文件与终端",
        detail: "选择文件默认用什么应用打开，并决定终端标签位于底部还是右侧；大屏演示推荐右侧。",
      },
      {
        name: "语言与窗口",
        detail: "切换 UI 语言、菜单栏驻留和底部面板；培训现场统一中文，降低术语理解成本。",
      },
      {
        name: "保持唤醒与速度",
        detail: "长任务运行时阻止电脑休眠；速度模式影响响应节奏与用量，复杂任务仍要保留充分 reasoning。",
      },
      {
        name: "发送与跟进行为",
        detail: "选择 Enter 直接发送还是插入换行；运行中新增消息可“引导当前任务”或“排队等待下一轮”。",
      },
    ],
  },
  {
    key: "integrations",
    label: "集成能力",
    eyebrow: "03 · 集成",
    title: "让 Codex 看见网页，也能操作允许的工具",
    summary: "Skill 负责方法，Plugin/MCP 负责连接，Browser 与 Computer Use 负责图形界面操作。",
    recommendation: "课堂推荐：只启用本次 Demo 必需能力；网站访问、桌面操作和写入动作均保留确认点。",
    icon: PlugsConnected,
    items: [
      {
        name: "智能快照",
        detail: "捕捉当前应用或工作现场的可见上下文，适合把界面状态快速交给 Codex 判断。",
      },
      {
        name: "插件",
        detail: "安装包含 Skills、工具和连接器的能力包；安装前检查来源、权限、脚本与维护状态。",
      },
      {
        name: "浏览器",
        detail: "用于打开、检查和操作网页；网站授权与允许/阻止列表独立管理，不等于本地文件权限。",
      },
      {
        name: "电脑操控",
        detail: "操作桌面应用时需要 macOS Screen Recording / Accessibility 等系统权限，按任务最小化开放。",
      },
    ],
  },
  {
    key: "engineering",
    label: "编码与交付",
    eyebrow: "04 · 编码",
    title: "非技术岗位也值得理解的五个交付概念",
    summary: "你不需要成为开发者，但要知道规则在哪里、变更如何隔离、结果如何被审阅。",
    recommendation: "课堂推荐：Git 和 Worktree 先理解概念；Hooks、Connections、Environment 由管理员或熟练用户维护。",
    icon: Code,
    items: [
      {
        name: "钩子 Hooks",
        detail: "在工具调用、命令或文件修改前后执行固定检查，用于把安全和质量要求做成机械护栏。",
      },
      {
        name: "连接 Connections",
        detail: "管理本机、其他设备或 SSH 主机连接，让任务在明确目标环境中运行。",
      },
      {
        name: "Git",
        detail: "记录每次修改，支持查看 diff、stage、commit、push 与 Pull Request，让 AI 产出可审阅、可回退。",
      },
      {
        name: "环境 Environment",
        detail: "定义任务可用的依赖、变量与运行条件；密钥不进入 Prompt、截图或仓库。",
      },
      {
        name: "工作树 Worktree",
        detail: "在同一仓库创建隔离工作区，适合并行任务，避免多个 Agent 修改同一份文件互相覆盖。",
      },
    ],
  },
  {
    key: "personal",
    label: "个性化维护",
    eyebrow: "05 · 个人化",
    title: "让 Codex 更顺手，但别把偏好当成权限",
    summary: "外观、语音、快捷键和个性化影响体验；配置、账户和归档影响长期管理。",
    recommendation: "课堂推荐：先只改语言、快捷键和个人指令；Configuration 与账户项按公司统一配置。",
    icon: UserCircleGear,
    items: [
      {
        name: "个人资料与使用情况",
        detail: "查看头像、名称、任务与 Token 活动；使用统计用于理解习惯，不代表任务质量。",
      },
      {
        name: "外观、语音与宠物",
        detail: "调整主题、字体、语音输入与可选桌面伴侣；演示时优先保证大屏可读性。",
      },
      {
        name: "配置与个性化",
        detail: "Configuration 管理持久技术设置；Personalization / AGENTS.md 管理偏好和项目规则，两者范围不同。",
      },
      {
        name: "快捷键、账户与归档",
        detail: "用快捷键提升操作速度；账户负责身份与授权；已归档任务用于收纳历史，不等于删除。",
      },
    ],
  },
];
