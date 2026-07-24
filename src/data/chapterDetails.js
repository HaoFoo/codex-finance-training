const detail = ({
  id,
  sectionId,
  eyebrow,
  title,
  summary,
  whatItIs,
  whenToUse,
  howToUse,
  liveDemo,
  guardrails,
}) => ({
  id,
  sectionId,
  eyebrow,
  title,
  summary,
  whatItIs,
  whenToUse,
  howToUse,
  liveDemo,
  guardrails,
});

export const chapterDetails = [
  detail({
    id: "overview",
    sectionId: "overview-story",
    eyebrow: "正确认知",
    title: "Codex 不是聊天框，而是一名可以交付成果的执行伙伴",
    summary: "它在你允许的 Workspace 内理解材料、规划步骤、调用工具、修改文件并验证结果；人负责目标、边界与最终判断。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "普通聊天工具通常停留在“给出一段回答”，Codex 面向的是完整任务。它可以先查看文件，再决定使用哪种工具，过程中留下计划、日志与文件修改，最后交付可打开、可检查的成果。",
        "这并不意味着 Codex 可以替你作最终决定。最稳妥的协作关系是：人定义业务目标和风险边界，Codex 执行重复工作并提供证据，人再审阅关键数字、判断和外部写入。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "需要读取多份材料，再生成报告、表格、演示文稿或网页时。",
        "任务包含清洗、分析、写作、检查和交付多个步骤时。",
        "同类工作反复发生，希望逐步沉淀为 Prompt、Skill 或 Automation 时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "定范围", text: "把模拟材料集中到单独目录，只把该目录设为 Workspace。" },
        { label: "讲清楚", text: "说明目标、输入、工作方式、限制和完成标准。" },
        { label: "看过程", text: "复杂任务先看 Plan，再关注工具调用、Terminal 和 Diff。" },
        { label: "做验收", text: "抽查来源和数字，对写入、发送、发布等动作进行人工确认。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "2 分钟",
      action: "展示同一句“请分析材料”，如何被补全为一个有输入、限制、交付物与验收标准的任务。",
      watchFor: ["Workspace 范围", "执行计划", "工具调用", "可检查的输出文件"],
      success: "学员能说出：Codex 的价值不只是生成答案，而是执行并交付一个可验收任务。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "把“生成成功”当成“业务结论正确”。",
        "只说“帮我分析”，却不提供输入范围与完成标准。",
        "把真实合同、薪酬、客户信息或密钥放进练习任务。",
      ],
    },
  }),

  detail({
    id: "basics",
    sectionId: "basics",
    eyebrow: "快速入门",
    title: "先看懂 Task、Workspace、Plan、Tool call 和 Diff",
    summary: "不用记住每个按钮的位置，先理解一次任务从开始、执行、纠偏到验收的生命周期。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Task 是一次有明确结果的工作会话；Workspace 是 Codex 被允许读取和修改的本地目录。Plan 展示准备怎样完成复杂任务，Tool call 与 Terminal 让执行过程可见，Diff 则告诉你文件到底改了什么。",
        "Pull Request 是团队审阅代码或网站变更的入口；Sites 用于把网页成果变成可访问站点。基础办公任务不一定需要它们，但需要知道它们代表“审阅与发布”，不是普通附件按钮。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "每次开始新任务时，先确认 Workspace 是否只包含本次需要的文件。",
        "分析步骤超过三步，或会修改多个文件时，先要求 Codex 给 Plan。",
        "任务结果要交给别人使用时，查看 Diff、日志和最终文件，而不是只看聊天回复。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "新建 Task", text: "选择课程目录，不选择个人主目录或真实业务共享盘。" },
        { label: "先只读", text: "让 Codex 列出目录中的文件、用途和疑点，明确不要修改。" },
        { label: "再执行", text: "确认 Plan 与输出位置后继续，发现越界动作立即中止并纠偏。" },
        { label: "验收 Diff", text: "确认源文件未被覆盖，输出文件可打开，错误与警告已处理。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "8 分钟",
      action: "新建 Task，选择课程 Workspace，只读列出课程材料文件并复述用途。随后指出 Plan、Terminal、Diff、拉取请求和站点入口。",
      promptReference: "Prompt Pack 00｜只读检查 Workspace",
      success: "学员能独立选择正确目录，并让 Codex 在不修改文件的前提下完成一次只读检查。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "直接把整个个人目录设为 Workspace，导致任务看到无关或敏感文件。",
        "界面版本不一致时反复寻找相同位置，而忽略入口背后的功能概念。",
        "Terminal 出现错误后继续反复运行，造成重复文件或重复写入。",
      ],
    },
  }),

  detail({
    id: "prompt",
    sectionId: "capabilities",
    eyebrow: "进阶能力 01",
    title: "Prompt：把模糊请求改写为可执行任务",
    summary: "用 GOALS 讲清 Goal、Objects、Actions、Limits、Success，让 Codex 知道做什么、用什么、不能做什么以及怎样才算完成。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Prompt 不是越长越好，而是让任务没有关键歧义。对业务用户来说，一条高质量 Prompt 至少要回答：目标是什么、材料在哪里、希望如何处理、哪些动作禁止、最终交付物怎样验收。",
        "当需求还不清楚时，不要强行写完全部细节。可以先要求 Codex 调研你，每轮只问一个到三个关键问题，确认后再形成执行计划。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "第一次把某项工作交给 Codex，尚未形成稳定模板时。",
        "结果看起来流畅，但经常遗漏来源、格式或限制条件时。",
        "跨多个文件或多个部门，必须先统一口径与完成标准时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "Goal", text: "用业务结果描述目标，例如“形成 5 分钟可读完的月度经营复盘”。" },
        { label: "Objects", text: "限定输入文件、目录、期间和可使用的数据范围。" },
        { label: "Actions", text: "要求先检查、再分析、最后验证，并说明关键步骤。" },
        { label: "Limits + Success", text: "写清禁止项、输出路径和 3—5 条可检查标准。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "6 分钟",
      action: "运行经营指标摘要 Prompt，再追加“逐条复核数字并补充来源字段”的纠偏指令。",
      promptId: "manager-report",
      success: "生成新的 Markdown 文件，数字带单位与来源，并保留自检结果。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "使用“优化一下”“更专业一点”等不可验证的反馈。",
        "把原因推断写成数据事实，或在材料缺失时要求 Codex 自行补齐。",
        "交付格式写得很细，却没有规定数字和结论怎样复核。",
      ],
    },
  }),

  detail({
    id: "skills",
    sectionId: "capabilities",
    eyebrow: "进阶能力 02",
    title: "Skills：把一次成功做法沉淀为团队标准流程",
    summary: "Skill 可以携带触发条件、步骤、模板、参考规则和脚本，适合高频、稳定、可验证的重复工作。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Skill 不等于一条收藏的 Prompt。它会说明何时触发、需要什么输入、按什么顺序执行、何处必须停下来确认，以及怎样判断成功或失败。必要时还可以携带模板、口径文件和可重复运行的脚本。",
        "团队复用 Skill 的真正价值是减少做法漂移：同类任务由不同人员发起，仍然执行相同检查、使用相同输出结构，并保留相同安全边界。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "任务每周或每月重复，输入与输出结构相对稳定。",
        "判断规则能够写成 checklist，异常情况允许标记待确认。",
        "已经用 Prompt 成功跑过几次，希望团队复用并持续维护。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "先找", text: "优先在内部 Skill 市场按业务目标搜索，不要先猜技术名称。" },
        { label: "再评估", text: "查看触发条件、权限、脚本、依赖、作者、更新时间和维护状态。" },
        { label: "小样本测试", text: "使用课程模拟材料验证输入、输出、错误处理和边界。" },
        { label: "最后创建", text: "确认流程稳定后再生成 Skill，补齐 Owner、版本和测试案例。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "8 分钟",
      action: "把已经跑通的月度复盘流程生成一个本地 Skill 草稿，打开 SKILL.md 讲解触发、输入、步骤、限制、输出和验证。",
      promptId: "create-skill",
      success: "Skill 草稿包含明确不适用场景和一个最小测试，不直接安装到全局环境。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "一次性、输入变化很大的任务也强行封装，最后比普通 Prompt 更难维护。",
        "直接安装搜索结果第一名，没有检查脚本、权限和网络访问。",
        "Skill 中写入真实 Token、内部路径或只有某位同事知道的隐性规则。",
      ],
    },
  }),

  detail({
    id: "plugins",
    sectionId: "capabilities",
    eyebrow: "进阶能力 03",
    title: "Plugins / MCP：让 Codex 安全连接真实工具与数据",
    summary: "Plugin 打包能力，MCP 提供标准连接，CLI 执行平台动作；连接前要先明确读取、写入、认证和影响范围。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Plugin 可以把一组 Skills、Connector 或 MCP 能力打包提供给 Codex。MCP 更像统一接口，让 Codex 按标准方式调用外部工具或数据源；CLI 则通过命令行执行某个平台的具体能力。",
        "对财运中心最直观的例子是飞书连接：Codex 可以调用对应 Skills，读取文档、创建测试云文档或写入测试 Base，但它能做什么仍由当前授权范围决定。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "成果需要从本地进入飞书文档、Base 或其他团队系统时。",
        "需要读取外部知识库或工具状态，单靠本地文件无法完成时。",
        "希望把多个相关 Skills 作为一组能力统一安装与维护时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "确认连接对象", text: "说明连接哪个平台、测试空间和具体对象。" },
        { label: "检查权限", text: "先确认只读和写入范围、认证状态、Token 保存方式。" },
        { label: "先做预演", text: "列出将读取或写入的对象、字段、数量、覆盖和通知影响。" },
        { label: "写后核对", text: "执行后重新读取目标，检查内容、数量与是否产生重复。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "3 分钟概念演示",
      action: "用同一个飞书任务指出 Skill、Plugin、MCP 与 CLI 各自处在什么层级，并展示写入前影响预览。",
      success: "学员能区分“工作方法”和“外部连接”，知道有连接不代表可以跳过授权与确认。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "把 Skill、Plugin、MCP、CLI 当作四个同义词。",
        "首次测试直接使用生产文档或真实 Base。",
        "为了让任务成功而临时扩大权限，或把认证信息贴进 Prompt 和截图。",
      ],
    },
  }),

  detail({
    id: "subagents",
    sectionId: "capabilities",
    eyebrow: "进阶能力 04",
    title: "Subagents：把互相独立的专业判断并行推进",
    summary: "每个 Subagent 只负责一个清晰范围，使用统一证据格式；主 Agent 负责回收、去重、冲突处理与最终勾稽。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Subagent 不是简单模拟多个角色说话，而是把可以独立推进的子任务真正分派出去。每个子任务都需要明确角色、输入范围、只读或写入权限、输出结构和完成标准。",
        "并行结束后仍需要主 Agent 汇总。它必须知道哪些角色成功、哪些失败，哪些结论冲突，并重新复核关键数字；不能用“多数 Agent 同意”替代事实核验。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "法务、行政、财务、税务和经营分析需要独立审阅同一组材料时。",
        "多份文件互不依赖，可以分别检查后统一回收时。",
        "需要让内容、数据、开发和 QA 并行，但各自不会修改同一文件时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "拆任务", text: "只拆相互独立的部分，先统一期间、单位和数据口径。" },
        { label: "定合同", text: "每个 Agent 写清输入、禁止项和统一输出字段。" },
        { label: "等回收", text: "主 Agent 等待全部状态，单个失败要显式记录并单独重试。" },
        { label: "再合并", text: "去重、建立冲突表、重新勾稽数字并标记待确认。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "10 分钟",
      action: "启动五专业角色并行复盘，展示各角色统一输出字段与主 Agent 的冲突清单。",
      promptId: "subagents",
      success: "五个角色状态可见，输出不相互覆盖，至少一条冲突或待确认项被正确保留。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "把强依赖前一步结果的工作同时启动，导致各 Agent 使用不同口径。",
        "多个 Agent 同时修改同一报告，最后无法判断谁覆盖了谁。",
        "某个角色失败后主 Agent 仍写成“全部审阅完成”。",
      ],
    },
  }),

  detail({
    id: "superpowers",
    sectionId: "capabilities",
    eyebrow: "进阶能力 05",
    title: "Superpowers：让复杂任务先澄清、再规划、后执行",
    summary: "这是第三方 workflow 项目，提供 brainstorming、planning、系统化执行与验证等成熟方法，不是 Codex 内置功能。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Superpowers 的价值不是多一个按钮，而是把成熟工作纪律带入任务：需求模糊时先访谈，方案确定后再拆实施计划，执行中分阶段验证，完成前提供证据。",
        "具体 Skill 名称和调用方式可能随项目版本变化，因此现场必须先检查当前安装状态与 README。无法确认时应明确停止，使用预录结果或普通 Plan 作为 fallback。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "需求方知道痛点，但目标、范围和完成标准仍然模糊时。",
        "网站、工作流或 Skill 创建等多阶段任务，需要先比较方案再实施时。",
        "排障、review 或交付前验证需要一个系统化检查过程时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "确认可用", text: "先列出当前安装的 Superpowers Skills 与实际调用名称。" },
        { label: "逐步访谈", text: "一次只解决一个关键决策，避免一轮抛出大量问题。" },
        { label: "比较方案", text: "给出两到三个方案、适用条件、风险和推荐理由。" },
        { label: "形成计划", text: "用户选定后再输出分阶段实施、验证与回退方案。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "5 分钟",
      action: "围绕“把月度经营复盘做成可重复工作流”发起需求访谈，只展示第一轮关键问题与方案框架。",
      promptId: "superpowers",
      success: "在未确认方案前不直接写代码或创建 Skill，并能说明第三方 workflow 的实际调用状态。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "把第三方项目误讲成 Codex 默认自带能力。",
        "没有安装或名称不匹配时，仍声称已经调用成功。",
        "把流程纪律当成业务正确性的保证，跳过口径与 Owner 确认。",
      ],
    },
  }),

  detail({
    id: "agents-md",
    sectionId: "capabilities",
    eyebrow: "进阶能力 06",
    title: "AGENTS.md：把长期规则写进项目工作环境",
    summary: "它保存跨任务都应遵守的语言、目录、安全、工程和验收规则，避免每次重新解释。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "AGENTS.md 是放在工作目录中的长期协作说明。Codex 进入项目后会读取它，用同一套规则处理后续任务，例如所有课程内容使用中文、源文件不得覆盖、财务数字必须注明来源。",
        "它适合稳定规则，不适合保存本月期间、某个临时文件名或一次性的输出要求。长期与临时信息分开，规则才不会变成越来越长、互相冲突的说明书。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "同一项目会持续开展多个 Task，需要保持统一语言和交付标准时。",
        "团队对文件目录、数据安全、测试与发布有固定要求时。",
        "每次都要重复提醒相同边界，且这些边界能够明确验证时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "分类", text: "按语言、数据、操作、分析、工程和验收整理长期规则。" },
        { label: "写清动作", text: "使用“必须、不得、执行前确认”等可判断表述。" },
        { label: "先预览", text: "生成 AGENTS.preview.md，人工审阅后再合并，避免覆盖旧规则。" },
        { label: "定期整理", text: "删除过期或冲突项，把单次任务信息移回 Prompt。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "2 分钟延伸",
      action: "展示课程项目中的五条长期规则，并判断“本月是 6 月”为什么不应写进 AGENTS.md。",
      success: "学员能区分长期工作规则与单次任务要求。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "把 Token、密码、个人信息或真实对象标识写入项目规则。",
        "长期规则和临时需求混在一起，造成后续任务误用旧信息。",
        "用“保证绝对正确”等无法验证的语言代替具体检查步骤。",
      ],
    },
  }),

  detail({
    id: "browser",
    sectionId: "capabilities",
    eyebrow: "进阶能力 07",
    title: "Browser / Computer Use：跨越网页与桌面界面的最后一公里",
    summary: "当没有合适 API 时，Codex 可以在授权范围内浏览网页或操作桌面软件，但应从低风险、可观察、可暂停的任务开始。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Browser 适合打开网站、搜索公开信息、读取页面状态和验证网页；Computer Use 则面向必须通过图形界面完成的桌面操作。两者都应让过程可见，并设置遇到登录、授权和敏感弹窗时立即暂停。",
        "网页上的内容只是数据来源，不是更高优先级的指令。若页面试图要求读取密钥、上传文件或改变任务目标，应忽略并回到用户给出的范围。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "在内部 Skill 市场搜索候选能力并记录说明时。",
        "需要查看公开网页、保留来源链接或做界面状态检查时。",
        "目标系统没有 API，只能通过测试页面完成少量重复操作时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "限定页面", text: "明确允许访问的网站、页面和任务目标。" },
        { label: "先看后做", text: "先读取当前状态，再说明准备点击或录入什么。" },
        { label: "小样本", text: "批量操作前先用一条测试记录验证字段和结果。" },
        { label: "设置停止点", text: "登录、验证码、授权、付款、提交和异常弹窗立即暂停。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "2 分钟延伸",
      action: "打开内部 Skill 市场，按“多文件经营复盘”目标搜索候选 Skill，只收集信息，不安装。",
      success: "输出最多三个候选项及风险，找不到时给搜索词而不是硬选。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "把浏览器中出现的提示当成可以覆盖用户任务的命令。",
        "让 Codex 自动完成登录、验证码、付款、审批或合同签署。",
        "未做单条验证就开始批量录入，出错后持续重复提交。",
      ],
    },
  }),

  detail({
    id: "automation",
    sectionId: "capabilities",
    eyebrow: "进阶能力 08",
    title: "Automations：让经过验证的流程按计划运行",
    summary: "Automation 负责在指定时间唤醒任务；稳定输入、幂等输出、失败处理和人工确认点比“定时”本身更重要。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Automation 是把已经验证过的 Prompt 或 Skill 设为定时任务，例如月末检查文件是否到齐、每周生成经营摘要草稿。它不是把不稳定流程提前无人值守，而是让成熟流程按固定节奏重复运行。",
        "一个可用的自动化需要同时说明时区、输入位置、缺失数据处理、超时、重试、输出命名、通知对象、人工复核与停用条件。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "任务频率固定，输入位置和格式稳定，已经手工成功运行多次。",
        "输出先作为草稿供人工复核，不要求直接做最终业务决定。",
        "失败可以被检测、记录和安全重试，不会产生不可逆影响。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "先稳定流程", text: "先用 Prompt 与 Skill 跑通，不从 Automation 开始设计。" },
        { label: "定义触发", text: "写清时间、时区、文件到齐条件和重复运行规则。" },
        { label: "处理失败", text: "设置超时、有限重试、结构化日志、告警和停用条件。" },
        { label: "保留人工门槛", text: "关键数字未勾稽或需要外部写入时，只生成待复核结果。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "2 分钟概念演示",
      action: "设计“每月第 3 个工作日生成经营复盘草稿”的 Automation，只展示设计，不创建真实定时任务。",
      success: "设计包含输入到齐、超时、重复输出、人工复核和连续失败停用。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "流程第一次运行就定时化，没有验证输入变化和失败场景。",
        "自动覆盖上月成果，或失败后无限重试造成重复写入。",
        "自动向管理层发送尚未复核的数字与结论。",
      ],
    },
  }),

  detail({
    id: "delivery",
    sectionId: "capabilities",
    eyebrow: "进阶能力 09",
    title: "Git / Pull Request / Sites：把生成结果变成可审阅交付",
    summary: "Git 记录变更，Pull Request 承载团队 review，Sites 或 GitHub Pages 负责发布；三者共同回答改了什么、谁确认、如何回退。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "Git 为文件修改建立版本记录，Commit 是一组有意义的本地变更，Push 把记录发送到远端。Pull Request 则让团队在发布前查看范围、Diff、测试、风险与截图。",
        "Sites 或 GitHub Pages 把网页成果变为可访问链接。发布成功只代表技术动作完成，不代表数据准确、内容适合公开或访问范围符合预期。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "生成网站、脚本或团队 Skill，需要多人审阅和长期维护时。",
        "希望保留每次修改记录，并能在出现问题时回到上一版本时。",
        "分析成果需要转成可分享网页，但仍需控制公开范围时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "检查 Diff", text: "确认只包含本次变更，没有日志、密钥、真实数据和大文件。" },
        { label: "运行验证", text: "执行 build、test、链接、移动端与 Console 检查。" },
        { label: "提交审阅", text: "Commit 与 Pull Request 写清范围、验证结果、风险和截图。" },
        { label: "确认发布", text: "发布前检查公开范围、项目子路径和静态资源。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "6 分钟",
      action: "从 management-review.md 生成中文交互网页，打开本地预览并检查桌面、手机、链接和动效降级。",
      promptId: "build-site",
      success: "页面可本地访问，数字有来源，移动端无溢出，未执行未经确认的公开发布。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "把 Pull Request 当成内容正确的自动认证，省略业务 review。",
        "只看页面漂亮，不验证数字、链接、移动端和 reduced motion。",
        "认为 private repository 会自动让 Pages 站点保持私密。",
      ],
    },
  }),

  detail({
    id: "case",
    sectionId: "case",
    eyebrow: "贯穿案例",
    title: "月度经营复盘：一个主 Agent，五个专业 Subagents",
    summary: "六份模拟材料从五个专业视角并行审阅，主 Agent 统一证据、冲突和数字，最后形成管理层汇报。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "这个案例把课程能力串成一条完整链路：只读检查材料、统一数据口径、五角色并行分析、主 Agent 勾稽、生成管理层报告、封装 Skill、生成网页，并可选择写入飞书测试空间。",
        "五个角色不是五套孤立观点。法务关注合同责任与付款风险，行政关注采购与执行阻塞，财务关注预算差异与现金影响，税务关注发票和申报事项，经营分析把指标变化转成管理动作。",
      ],
      roles: [
        { name: "法务", focus: "合同主体、付款、履约、违约、数据与知识产权", output: "风险等级、原文证据、修订建议、待确认" },
        { name: "行政", focus: "采购材料、供应商、预算占用、交付与责任人", output: "执行阻塞、Owner、期限与跨部门依赖" },
        { name: "财务", focus: "收入、成本、费用、预算差异、现金与勾稽", output: "指标、差异、公式、证据与可能驱动" },
        { name: "税务", focus: "主体、期间、税率、发票与税会差异", output: "风险事项、证据、复核动作与截止日期" },
        { name: "经营分析", focus: "KPI、趋势、驱动、影响与管理动作", output: "管理层结论、优先级与行动建议" },
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "月度复盘需要从多份材料和多个部门建立证据链时。",
        "同一事项可能同时产生合同、预算、税务和执行影响时。",
        "管理层需要一页结论，但底层仍要保留明细、风险和待确认事项时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "阶段 A", text: "只读确认六个文件，检查期间、币种、单位、缺失和冲突。" },
        { label: "阶段 B", text: "五个 Subagents 只读分析，统一输出发现、证据、影响、等级、建议。" },
        { label: "阶段 C", text: "主 Agent 回收结果，标记失败、去重、建立冲突表并重新勾稽。" },
        { label: "阶段 D", text: "输出摘要、明细、行动项、数据质量和验证报告。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "22 分钟主线",
      action: "先运行主 Agent 多文件复盘，再启动五角色并行审阅，最后追问“哪个结论最不可靠，缺什么证据，需要谁确认”。",
      promptId: "subagents",
      success: "管理层摘要不超过一页，事实、推断和待确认分开，行动项包含 Owner 与期限建议。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "经营分析 Agent 越俎代庖，替法务或税务作最终专业结论。",
        "为了得到完整报告，自动补造材料中不存在的原因或条款。",
        "只展示一页摘要，却没有保存来源、冲突和验证报告。",
      ],
    },
  }),

  detail({
    id: "labs",
    sectionId: "labs",
    eyebrow: "实战练习",
    title: "从一个可复制 Prompt 开始，拿到第一个可审阅成果",
    summary: "现场不追求每个人跑完全部案例；最低目标是成功运行一个 Demo，并检查一个来源或数字。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "实验包包含经营指标、预算差异、合同风险、税务事项、行政采购、汇报模板和飞书 Base JSON。全部是虚构、脱敏材料，字段之间设计了可以交叉核对的线索。",
        "练习分三层：单文件摘要适合第一次跟做，多文件复盘展示完整工作流，部门 Prompt 则让学员从自己的岗位视角带走一个可复用场景。",
      ],
    },
    whenToUse: {
      title: "怎么选择",
      items: [
        "第一次使用：选择经营指标摘要，控制输入范围，快速看到输出文件。",
        "希望体验能力上限：选择五角色 Subagents 或网页生成。",
        "希望马上带回岗位：从法务、行政、财务、税务、经营分析中选择对应 Prompt。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "下载", text: "把实验文件放到同一目录，并将该目录设为 Workspace。" },
        { label: "复制", text: "选择一张 Prompt 卡片，先阅读目标、限制和交付物再运行。" },
        { label: "观察", text: "确认 Codex 读取了正确文件，输出写入新目录且没有外部操作。" },
        { label: "复核", text: "打开成果，回到源文件抽查至少一个数字或一条证据。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "10 分钟跟做",
      action: "所有学员复制经营指标摘要 Prompt；完成者追加结果复核，其他人优先排查 Workspace 与文件位置。",
      promptId: "manager-report",
      success: "至少生成一个本地 Markdown 或飞书测试成果，并能指出一条已核验的来源。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "复制讲师的绝对路径，导致自己的电脑找不到文件。",
        "同时运行多个大任务，遇到排队后无法判断哪一个输出属于哪次执行。",
        "只看到文件生成就结束，没有检查数字、单位、来源和错误日志。",
      ],
    },
  }),

  detail({
    id: "feishu",
    sectionId: "feishu",
    eyebrow: "飞书交付",
    title: "把本地成果写入云文档与多维表格，并在写后重新核对",
    summary: "课堂默认飞书 CLI 已在课前完成安装与授权；现场只做测试空间的低风险调用，不集中处理账号与权限配置。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "飞书相关 Skills 让 Codex 可以读取测试文档、创建云文档、整理结构化摘要，并把风险或行动项写入测试 Base。它把本地成果带入团队协作，但也把任务从“生成草稿”升级为“改变外部系统”。",
        "因此飞书演示遵循四步：影响预览、人工确认、执行写入、写后读取。若无法确认目标对象为测试空间，任务应停止，而不是尝试扩大权限。",
      ],
    },
    whenToUse: {
      title: "什么时候用",
      items: [
        "管理层摘要需要沉淀为团队可共同阅读的云文档时。",
        "行动项需要进入 Base，按团队、Owner、优先级和状态持续跟踪时。",
        "需要读取已有测试文档，生成摘要、风险和待确认事项时。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "课前连接", text: "按指定教程完成 CLI、应用、授权与测试对象准备。" },
        { label: "写前预览", text: "显示目标对象、写入章节、字段映射、覆盖、通知和重复风险。" },
        { label: "明确确认", text: "由本人确认写入指定测试文档或测试 Base。" },
        { label: "写后验证", text: "重新读取目标，核对标题、章节、记录数、字段值与重复记录。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "8 分钟",
      action: "创建“【模拟】月度经营复盘”云文档，再把本地行动计划映射到测试 Base；两次写入都先展示影响预览。",
      promptId: "feishu",
      success: "返回文档与 Base 链接，写后核对通过，没有通知真实成员或改变权限。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "课堂临时处理 OAuth、应用审批或组织权限，让全场等待单台电脑。",
        "目标对象不明确时仍创建或写入，导致进入错误空间。",
        "失败后连续重试，却未先检查是否已经产生部分内容或重复记录。",
      ],
    },
  }),

  detail({
    id: "safety",
    sectionId: "safety",
    eyebrow: "安全与判断",
    title: "能力越强，越要把权限、证据和确认点写清楚",
    summary: "安全不是最后增加的一句提醒，而是从 Workspace、输入材料、工具权限到外部写入和最终判断的完整设计。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "课程把风险分成四类：数据是否可用、权限是否最小、操作是否可回退、结论是否有证据。任何一类不清楚，都应缩小范围或停下来确认。",
        "最实用的习惯是把高风险动作做成显式门槛：删除、覆盖、发送、发布、审批、权限变化和批量写入前，Codex 先列出对象、范围和影响，人再决定是否继续。",
      ],
    },
    whenToUse: {
      title: "什么时候检查",
      items: [
        "开始任务前：确认材料已模拟或脱敏，Workspace 范围正确。",
        "调用工具前：确认权限、目标、网络与脚本行为。",
        "交付结果前：复核来源、数字、公开范围和外部写入记录。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "数据", text: "不使用真实合同、薪酬、客户、身份证、银行或税务底稿。" },
        { label: "凭据", text: "API key、Token、密码、Cookie、SSH key 和验证码不进入 Prompt、日志或仓库。" },
        { label: "操作", text: "高风险写操作使用“预览 → 确认 → 执行 → 写后核对”。" },
        { label: "结论", text: "事实、推断、建议和待确认分开，关键数字保留期间、单位、口径和来源。" },
      ],
    },
    liveDemo: {
      title: "现场演示",
      duration: "贯穿全程",
      action: "每个 Demo 都展示一个安全动作：只读检查、输出新目录、来源复核、第三方 Skill 评估或飞书写入预览。",
      success: "学员能在外部写操作发生前主动要求影响预览，并能指出一条不能交给 Codex 自动判断的事项。",
    },
    guardrails: {
      title: "交付前五问",
      items: [
        "输入是否完整，是否混入错误版本或真实敏感文件？",
        "数字是否勾稽，期间、币种、单位、口径和正负号是否一致？",
        "结论能否追溯到来源，推断是否被误写成事实？",
        "输出是否写入错误对象、改变权限或扩大公开范围？",
        "另一位同事能否依据说明复现并检查这份成果？",
      ],
    },
  }),

  detail({
    id: "learning",
    sectionId: "learning",
    eyebrow: "课后路径",
    title: "从一次成功任务，逐步升级到稳定工作流",
    summary: "先把基本操作做稳，再进入岗位场景、Skill 与 Subagents，最后连接飞书、网页、Automation 和团队 review。",
    whatItIs: {
      title: "这是什么",
      paragraphs: [
        "课后路径按四级能力递进：Level 1 独立完成一个本地成果；Level 2 完成本部门多文件任务；Level 3 创建并测试一个工作流或 Skill；Level 4 完成飞书、网页或 Automation 的测试环境闭环。",
        "每一级都以成果和验证记录作为完成标志，而不是以看完多少页面衡量。遇到问题先缩小任务、保存错误原文和部分输出，不用反复盲目重试。",
      ],
    },
    whenToUse: {
      title: "怎么选择下一步",
      items: [
        "还不能独立选择 Workspace 和检查 Diff：先完成 Level 1。",
        "已经能稳定生成单文件成果：进入本部门 Prompt 与 Skill 搜索。",
        "有一个每周或每月重复任务：尝试 Subagents、AGENTS.md 或 Skill creation。",
        "流程已在模拟环境稳定运行：再做飞书、Sites、Automation 与 Git review。",
      ],
    },
    howToUse: {
      title: "怎么做",
      steps: [
        { label: "第一周", text: "单文件练习、本部门 Prompt、多文件复盘、评估一个 Skill。" },
        { label: "第二周", text: "Subagents、Superpowers、创建 Skill、飞书测试闭环。" },
        { label: "沉淀候选", text: "记录场景频率、人工耗时、输入输出、稳定规则和人工判断点。" },
        { label: "小步生产化", text: "优先选择高频、规则清楚、数据低风险、结果可验证的任务。" },
      ],
    },
    liveDemo: {
      title: "结课挑战",
      duration: "4 分钟收口",
      action: "学员勾选：运行一个 Prompt、生成一个成果、核对一个来源、知道去哪里找 Skill；再写下一个准备带回岗位的重复任务。",
      success: "每位学员至少完成一项可见成果，并选定一个课后岗位练习。",
    },
    guardrails: {
      title: "常见误区与边界",
      items: [
        "从最复杂、最敏感的生产流程开始，无法低成本验证。",
        "只收藏 Prompt，不记录输入、版本、检查结果和失败原因。",
        "为了追求自动化覆盖率，省略业务 Owner 与人工审批节点。",
      ],
    },
  }),
];

export const chapterDetailsById = Object.fromEntries(
  chapterDetails.map((chapter) => [chapter.id, chapter]),
);

export const capabilityDetailIds = [
  "prompt",
  "skills",
  "plugins",
  "subagents",
  "superpowers",
  "agents-md",
  "browser",
  "automation",
  "delivery",
];
