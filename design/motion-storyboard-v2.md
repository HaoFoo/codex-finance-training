# Codex 财运培训站 Motion Storyboard V2

## 1. Motion direction

### 1.1 唯一视觉基线

- 构图与产品物件继续参考 `design/references/selected-visual.png`；最终色彩方向以用户最新确认的 GSAP 官网式 dark stage 为准。
- 全站统一使用纯黑 / 炭黑基底、银白文字与 finance green 高光。章节之间只能在 `#030504`–`#101410` 的暗色范围内做层次变化，禁止黑白背景交替。
- 玻璃面板使用低透明银白、细描边与微弱 green reflection；纯白只用于标题、关键数字和聚焦瞬间，不允许形成完整浅色章节。
- 每章动效不同，但都遵循同一节奏：**建立镜头 15% → 解释内容 55% → 交付证据 20% → 转场 10%**。
- Apple 式“视频感”来自镜头关系、遮罩、景深和 match cut，不来自堆叠粒子、霓虹光效或无意义循环。

### 1.2 统一镜头语言

| Motion token | 规则 |
| --- | --- |
| Scroll scene | 桌面端重点章节 100–180vh；长内容章节按内容自然增高，不强行 pin |
| Scrub | 0.6–1.1；需要精准讲解的 UI 演示使用 0.8，章节交界使用 1.0 |
| Ease | 跟随滚动使用 `none`；自动入场使用 `power3.out`；卡片归位使用 `expo.out` |
| 运动距离 | 大画面 8–14vw；文字 24–56px；卡片 4–8vw，避免夸张飞越 |
| 景深 | 同时最多三层：前景暗色玻璃 / 银白内容主体 / 炭黑环境；scale 范围 0.94–1.08 |
| 转场 | 上一章主物件在最后 10% 成为下一章首物件，优先 match cut、mask wipe、focus pull |
| Ambient motion | 不做永久循环；仅 Hero 绿色光点可低频呼吸，且不影响阅读 |
| 内容优先 | Copy、Download、CTA、导航不得被覆盖或在可操作时持续位移 |

### 1.3 全站 dark stage 统一改造

现有 `.manifesto-section`、`.case-section`、`.safety-section` 的黑底方向保留，但需要统一为同一组 dark tokens、银白文字与 green highlight，不能继续像三座孤立“黑岛”。以下当前浅色 section 必须全部切换到统一黑色主调：

1. `.hero-section`、`.basics-section`、`.capabilities-section`。
2. `.skill-market-section`、`.labs-section`、`.feishu-section`。
3. `.learning-section`、`.guide-library-section`、`.closing-section` 与 `footer`。
4. 新增的桌面端设置详解章节同样使用 black / charcoal base，不做系统设置原生白底复刻。

建议全局建立 `--stage: #050706`、`--stage-raised: #0a0d0b`、`--stage-soft: #101410`、`--text: #f4f7f4`、`--muted: #9aa49e`、`--line: rgba(255,255,255,.12)`、`--green: #0ae448`。`.prompt-card pre` 使用略浅或略深的炭黑纸面与银白 monospace，靠边框、层级和 green cursor 区分，不靠突然反色。

---

## 2. 逐章 Storyboard

### Scene 00 — 全局导航与进度

**对应 DOM**：`.site-header`、`[data-scroll-progress]`、`.progress-rail`

- 入场：页面载入时导航由顶部 18px 位置滑入，玻璃模糊从 0 增至目标值；绿色进度线从左侧零点出现。
- 滚动中：Header 在章节交界进行轻微 focus pull——背景 blur 与阴影改变，但不缩放、不消失。Progress rail 的 active 点用 scale + green match cut 连接当前章节。
- 离场：不离场；进入 Closing 时导航降低 opacity 到 0.45，为 CTA 腾出视觉层级，向上滚动立即恢复。
- GSAP feature：全局 `timeline`、`quickTo` 更新 blur/opacity、ScrollTrigger progress。
- 视频隐喻：电影 HUD / 章节时间码，始终存在但不抢画面。
- 移动端：只保留 3px progress 和 menu；不做 blur 连续插值。
- Reduced motion：导航直接处于最终态，进度条仍按实际滚动更新。
- 验收：导航任何时刻可点击；无遮挡；active section 与正文视觉章节一致。

### Scene 01 — Hero「把复杂工作，变成一条清晰路径」

**对应 DOM**：`#overview`、`[data-hero-copy]`、`[data-hero-visual]`

- 入场：炭黑环境先从纯黑显影；标题两行通过逐行 `clip-path` 露出银白字面；右侧工作流资产以 dark/silver color treatment 从 0.96 scale 做 dolly-in，绿色玻璃 ribbon 比背景快半拍进入。
- 滚动中：Hero pin 约 120vh。前 40% 标题轻微上移，资产向镜头推进；40–75% 玻璃工作流横向穿过标题与 UI 之间；75–90% CTA 留在清晰焦点，资产逐步失焦或降低对比。
- 离场：Hero 的绿色“路径点”扩大成满宽浅绿色光晕，下一章从光晕中心显影，形成 match cut。
- GSAP feature：`timeline` labels、`clipPath`、ScrollTrigger `pin + scrub`、分层 parallax。
- 视频隐喻：产品广告的 macro dolly shot；相机向玻璃工作流推进，而不是网页元素普通淡入。
- 移动端：取消 pin；标题逐行揭示，asset 单次 scale 1.02；工作流不横穿正文。
- Reduced motion：标题、图像与 CTA 全部直接可见；不 pin，不改变 blur。
- 验收：1440×1024 首屏标题仍是主角；CTA 始终可点；动画过程无文字与资产相互遮盖；CLS = 0。

### Scene 02 — 认知宣言「Codex 不是聊天 AI」

**对应 DOM**：`#overview-story`、`.manifesto-copy`、`.manifesto-steps`

- 入场：承接 Hero 绿色光点，先定格关键词“不是聊天 AI”；背景保持相同 dark stage，文字由 muted grey 变 silver white，不做黑白硬切。
- 滚动中：章节短暂 pin。完整能力句按语义块逐段“擦亮”：理解材料 → 规划步骤 → 调用工具 → 验证 → 交付。底部三步卡不是同时 fade，而是像 film strip 一样依次横向过片，每次切换上一张降到 0.94 scale。
- 离场：最后的“审阅结果”卡收拢为下一章 Codex composer 的边框，完成 shape match cut。
- GSAP feature：手工 line split + `stagger`、`keyframes`、`transformOrigin`、ScrollTrigger scrub。
- 视频隐喻：旁白字幕逐句落版 + 三格胶片过片。
- 移动端：语义块逐段上移 20px；三张卡纵向 sequential reveal，不 pin。
- Reduced motion：所有句子高对比直接出现，三卡维持静态网格/纵向列表。
- 验收：每一滚动阶段至少有一条完整可读句；禁止半透明文字停留在不可读状态；`.manifesto-section` 与前后章节暗部亮度连续，不形成单独“黑岛”。

### Scene 03 — 桌面端基础「第一次任务」

**对应 DOM**：`#basics`、`.desktop-stage`、`.desktop-stage__sidebar`、`.composer-preview`、`.desktop-explanations`

- 入场：Codex 窗口像产品镜头一样从炭黑桌面中抬起，银白 rim light 与 scale 同步建立空间；Sidebar 先定位，Composer 后亮起。
- 滚动中：用一条有 labels 的 demo timeline 演示“选择工作目录 → 新建任务 → 输入 Prompt → 发送”。Sidebar 的 active pill 做 shared-axis 滑动；composer 文本用 mask reveal；发送按钮得到一次绿色能量压缩，不做循环 pulse。
- 离场：窗口缩小到 0.92 并向后景移动，Composer 边框向左右扩张成 Settings 主面板 frame，衔接下一章设置详解。
- GSAP feature：nested timelines、labels、`fromTo`、`gsap.set`、transform + shadow focus pull。
- 视频隐喻：OS onboarding 的 screen recording，被摄影机包装成产品广告镜头。
- 移动端：不模拟完整桌面窗口运动；Sidebar 与 composer 按阅读顺序单次 reveal，解释项按两列/单列自然流动。
- Reduced motion：默认显示“新建任务”active 与完整 Prompt，所有说明静态可读。
- 验收：动画不得真的修改表单或误导为可交互输入；“新建任务 / 拉取请求 / Sites / 设置”说明均至少停留 1 个完整阅读窗口。

### Scene 04 — 桌面端功能与设置详解「把界面设置成你的工作方式」

**对应 DOM**：建议新增设置章节 `[data-settings-stage]`、`[data-settings-sidebar]`、`[data-settings-panel]`；参考图 `design/references/codex-settings-overview.png`

- 入场：上一章桌面窗口保持机位不变，Composer 向下虚化，Settings 主面板通过窗口内部的 `clip-path` 横向揭开，形成同一 app 内的 match cut，而非重新飞入一张截图。
- 滚动中：桌面端 pin 约 130–160vh。左侧设置侧栏按截图真实分组滚动聚焦，active pill 使用 shared-axis 纵向滑动；右侧主面板同步 spotlight 对应设置项。Spotlight 由局部银白 rim light、其余内容 opacity 0.36 和 2px blur 组成，推荐叙事顺序为：
  1. **常规 / 权限**：默认权限、自动审核、完全访问权限；明确课堂推荐和风险。
  2. **常规 / 使用方式**：默认文件打开目标、语言、菜单栏、底部面板、默认终端位置、防止系统休眠、速度、导入设置。
  3. **集成**：智能快照、插件、浏览器、电脑操控，解释“看到、连接、操作”的能力边界。
  4. **编码**：钩子、连接、Git、环境、工作树，解释非开发岗位何时会接触它们。
  5. **个人化与维护**：个人资料、外观、语音、配置、个性化、键盘快捷键、使用情况和计费、账户、已归档任务。
  每组先露出“它是什么”，再露出“课堂推荐值”和“改错后的影响”；不需要把每个设置做成可交互仿制品。
- 离场：镜头回切到“集成”中的插件 / 浏览器 / 电脑操控三行，它们的边框向右伸展成能力轨道；设置面板压到远景，顺接能力中心。
- GSAP feature：ScrollTrigger `pin + scrub`、`quickSetter/quickTo` 控制 spotlight、`clipPath` panel reveal、timeline labels、shared-axis active indicator。
- 视频隐喻：Apple 系统设置 walkthrough + 电影式 rack focus；相机不换位，只在同一产品内部切焦。
- 移动端：取消 pin 与双栏同步；侧栏变成顶部分组 chips 或章节 index，主面板按分组纵向排列。每组进入 viewport 时只做 16px 上移与边框变绿，截图保持完整宽度，不做 blur spotlight。
- Reduced motion：所有分组与说明直接显示；默认 active 标记第一组；不创建 pin、blur 或 clip reveal。
- 验收：设置名、用途、推荐值、风险四类信息必须同时可读；不得只展示截图不解释；侧栏 active 与主面板分组一一对应；截图/模拟 UI 仍处于统一 dark skin；任何真实设置不会被动画或演示自动修改。

### Scene 05 — 能力中心「完整能力地图」

**对应 DOM**：`#capabilities`、`[data-capability-viewport]`、`[data-capability-track]`、`.capability-panel`

- 入场：上一章桌面窗口的横向展开继续成为能力轨道；Intro panel 先占满画面，滚动提示向右轻推一次。
- 滚动中：维持 horizontal pin，但升级为 cover-flow 镜头。当前卡 scale 1 / opacity 1；前后卡 scale 0.94 / opacity 0.58；icon 做轻微 counter-parallax。每一张能力卡在画面中心形成一次明确停顿，必要时使用轻量 `snap`，不能夺取自然滚动控制。
- 离场：最后一张 Subagent/Workflow 卡的边框延展为五条并行轨道，进入贯穿案例。
- GSAP feature：ScrollTrigger `pin + scrub + snap`、`containerAnimation`、`gsap.utils.mapRange`。
- 视频隐喻：相机沿一排实体玻璃产品横移拍摄，每张卡到中心完成 rack focus。
- 移动端：完全取消横向 pin，改纵向卡片；当前卡通过 IntersectionObserver/ScrollTrigger 添加 1.0 scale 与 green top line。
- Reduced motion：轨道改正常水平可滚动区域或纵向列表；全部内容可键盘访问，不能靠动画出现。
- 验收：桌面横向轨道结束后自然回到纵向页面；不出现空白 pin；所有 9 项能力可见；滚轮方向认知明确。

### Scene 06 — 贯穿案例「五个专业视角汇成一份报告」

**对应 DOM**：`#case`、`[data-role-list]`、`[data-role-row]`、`.case-result`

- 入场：五条暗色玻璃轨道从能力地图末尾分别进入，银白角色名称沿轨道落位；整个章节保持同一 charcoal stage，不做反相切换。
- 滚动中：角色行按 `utils.distribute` 错峰推进，输入材料在左、分析结论在中、输出标签在右；右侧管理报告 sticky 并逐项接收五路结果。每接收一路，报告上的对应 checklist 由 grey 变 green。
- 离场：五条轨道收束成一条绿色光线，沿曲线进入“Skill 搜索框”，完成 workflow merge。
- GSAP feature：`utils.distribute`、scrubbed `xPercent`、stroke dash animation；若使用 MotionPathPlugin，只作用于五个小型状态点，不移动正文。
- 视频隐喻：多机位并行素材在剪辑台汇成 master timeline。
- 移动端：五角色按纵向 stepper 展开；报告卡放在最后，不 sticky；绿色进度线按滚动增长。
- Reduced motion：静态五角色表 + 完整报告清单；不依赖移动轨迹说明数据归集关系。
- 验收：五角色与五输出一一对应；炭黑层级与银白文字满足可读对比；`.case-section`、`.section-heading.inverse` 与全站 dark tokens 一致，不形成孤立反相章节。

### Scene 07 — Skill Discovery「从内部市场找到能力」

**对应 DOM**：`.skill-market-section`、`[data-skill-stage]`、`[data-skill-image]`

- 入场：上一章绿色汇流线变成搜索框光标；市场截图从搜索框区域做 aperture reveal，而不是整张图 fade。
- 滚动中：左侧四步规则按搜索→筛选→检查→安装依次高亮；右侧截图在固定玻璃 viewport 内做 8% 垂直 parallax，并用 focus window 突出当前区域。CTA 只有当安全检查步骤完成后才提升 green 层级。
- 离场：截图内选中的 Skill 卡像下载文件一样缩成卡片，落入下一章模拟材料包。
- GSAP feature：`clipPath: inset()`、`fromTo`、scrubbed parallax、timeline labels。
- 视频隐喻：镜头通过搜索框进入软件世界，再把选中物件带回现实桌面。
- 移动端：图片完整展示、无 parallax；四步按顺序单次 reveal；CTA 始终可访问。
- Reduced motion：无裁切动画，截图和四步直接出现。
- 验收：截图不被拉伸；搜索与分类文字清晰；外链可点击；视差不超过图片可裁切安全区。

### Scene 08 — 实战 Labs「文件落桌，Prompt 产出成果」

**对应 DOM**：`#labs`、`.lab-downloads`、`.prompt-grid`、`.prompt-card`

- 入场：从 Skill 市场掉落的卡片变成模拟材料包主卡；六个文件像 card deal 从中心依次落位，角度最终归零。
- 滚动中：使用 ScrollTrigger.batch 让 prompt cards 以“打开文件夹”的折页动作进入；当前 Prompt 的输入区从短摘要扩展到完整文本。Copy button 和 Download link 不参与持续 scrub，确保可点击稳定。
- 离场：成功复制/下载后的绿色状态点沿页面右侧上行，成为飞书交付 pipeline 的起点；无用户点击时也呈现静态 transition seed，不伪造成功状态。
- GSAP feature：`ScrollTrigger.batch`、stagger、`keyframes`、3D rotateX（最大 6°）、event-based micro timeline。
- 视频隐喻：制片台上依次摊开素材、脚本与成片，而不是普通卡片瀑布。
- 移动端：文件和 Prompt 卡纵向 reveal；取消 rotateX；长 Prompt 默认完整可滚动且 Copy button 保持顶部可见。
- Reduced motion：所有文件与 Prompt 静态排列；复制后的“已复制”文字状态仍工作。
- 验收：动画不触发下载/复制；按钮在任何 transform 状态下 hit target ≥ 44px；prompt code surface 与章节只做炭黑深浅层级，不突然切成白色纸面。

### Scene 09 — 飞书 CLI「从本地进入团队协作」

**对应 DOM**：`.feishu-section`、`.feishu-flow`

- 入场：上一章状态点接入四段 horizontal pipeline；第一段“课前”由灰变 green。
- 滚动中：课前 → 课堂 → 确认 → 会后逐段推进；一条 1px 绿色线使用 `strokeDashoffset`/scaleX 绘制，卡片不位移，只做 focus 与 z-depth。每个阶段完成时，下一阶段标题从模糊 2px 回到清晰。
- 离场：pipeline 在“确认”节点短暂停顿，节点外圈闭合成为下一章安全锁的圆环。
- GSAP feature：SVG/DOM line draw、timeline position parameters、ScrollTrigger scrub、filter focus pull。
- 视频隐喻：物流追踪镜头 / 任务交付流水线。
- 移动端：管线改垂直，线条按阅读方向增长；不 pin。
- Reduced motion：四阶段全部清晰可见，连接线为完整静态线。
- 验收：明确显示“课前完成配置、课堂只调用”；外部指南链接可点；任何写入动作的“预览→确认”文案不可被动画跳过。

### Scene 10 — 安全边界「能力越强，确认点越清楚」

**对应 DOM**：`.safety-section`、`.safety-title`、`.safety-rules`

- 入场：飞书 pipeline 的圆环扩成暗色磨砂玻璃保险库转盘，Shield icon 以银白 rim light 从中心显影；背景保持炭黑。
- 滚动中：四条规则像四枚锁销从四周向中心归位，顺序为脱敏 → 密钥 → 第三方 Skill → 写操作。每次归位只旋转 8–12°，同时把对应标题从 muted grey 提升为 silver white。
- 离场：四枚锁销组成一个 green check；check 轻微缩小成为学习路径的第一个里程碑编号。
- GSAP feature：`transformOrigin`、radial `keyframes`、`gsap.utils.wrap`、scrubbed rotate/scale。
- 视频隐喻：高端腕表 / 保险库的 macro mechanical assembly，不是恐怖片式黑场。
- 移动端：取消径向运动，四条规则按锁销顺序纵向落位；Shield 保持静态。
- Reduced motion：完整规则与 green check 直接可见。
- 验收：`.safety-section` 与全站统一黑底 token；安全规则在动效中始终可读；绿色仅用于确认，不把风险项装饰成“已完成”。

### Scene 11 — 学习路径「从一个成果到 Automation」

**对应 DOM**：`.learning-section`、`.learning-path`、`.resource-list`

- 入场：上一章 green check 变成 Step 01；三张学习阶段卡从相同 z 轴位置依次向前推进。
- 滚动中：用 vertical camera move 表达 Level-up。当前阶段 scale 1、其他阶段 0.96；资源列表像片尾字幕一样上行，但速度只比页面快 5–8%，保持可扫读。
- 离场：最后一个 Automation 节点展开成五条书脊，匹配下一章资料库五个文件。
- GSAP feature：scrubbed `scale + yPercent`、`snapDirectional` 或轻量 snap、`containerAnimation`（仅桌面）。
- 视频隐喻：电梯上升 / 摄影机逐层进入能力楼层。
- 移动端：正常纵向 timeline，左侧 green progress 按滚动增长；不做 z 轴推进。
- Reduced motion：三阶段与资源链接按原布局显示。
- 验收：用户可快速扫完阶段差异；外链 hover/focus 独立工作；动画不改变资源列表 DOM 顺序。

### Scene 12 — 课程资料库「网站保留完整深度」

**对应 DOM**：`.guide-library-section`、`.guide-file-list`

- 入场：五条书脊从学习路径最后节点扇形展开，落成右侧五个 guide rows；左侧标题先固定，文件逐项进入。
- 滚动中：桌面端轻 pin 左侧 copy，右侧文件像 book pages 逐层翻至前景；每行只做 y + 轻微 rotateX，落位后完全静止并可点。
- 离场：最后一份资料翻页后露出大面积纯黑负空间，Closing 的银白标题从纸面下方进入。
- GSAP feature：3D perspective、`staggerFrom`/stagger、ScrollTrigger pin、`clearProps` 释放交互态。
- 视频隐喻：翻完一本产品手册后进入最后一页，不是简单 list reveal。
- 移动端：不 pin；文件逐条向上 20px 显示，保持原生链接区域。
- Reduced motion：静态两栏/单栏资料库；不设置 perspective。
- 验收：五个文档链接全部可访问；标题 pin 不覆盖 footer；离开 section 后 transforms 已清理。

### Scene 13 — Closing「现在就运行一个任务」

**对应 DOM**：`.closing-section`、`footer`

- 入场：资料库最后一张炭黑书页扩大到满屏；结尾银白标题从 paper mask 下方显影，CTA 在标题稳定后从 0.96 scale 归位。
- 滚动中：背景出现极轻的绿色 radial glow（不循环闪烁）；CTA hover/focus 使用 2px lift 与短促 arrow move，内容本身不随滚动离开焦点。
- 离场：无强制离场；footer 自然出现。回到 Labs 的 CTA 触发原生 smooth scroll，并让目标章节的 heading 短暂 green focus flash。
- GSAP feature：mask reveal、`scale`、event timeline、ScrollTo 行为可继续使用原生 `scrollIntoView`。
- 视频隐喻：产品发布片的 final title card + action button。
- 移动端：标题按两行自然换行；CTA 不做 scale，只保留颜色反馈。
- Reduced motion：最终卡完整静态显示；跳转改即时定位或遵循系统设置。
- 验收：最终 CTA 是全页最高对比操作；无自动循环；footer 清晰但不抢 CTA。

---

## 3. 推荐 implementation hooks

不要再把所有章节挂到通用 `[data-reveal]` / `[data-stagger]` 后统一 fade。保留通用 hooks 作为 fallback，每章增加明确的 scene hooks：

| Scene | 推荐 hooks |
| --- | --- |
| Global | `[data-scene]`、`[data-scene-progress]`、`[data-transition-seed]` |
| Hero | `[data-hero-line]`、`[data-hero-layer="back|mid|front"]`、`[data-hero-ribbon]` |
| Manifesto | `[data-statement-line]`、`[data-film-step]`、`[data-composer-match]` |
| Basics | `[data-desktop-window]`、`[data-desktop-nav-item]`、`[data-composer-line]` |
| Settings | `[data-settings-stage]`、`[data-settings-sidebar]`、`[data-settings-group]`、`[data-settings-row]`、`[data-settings-spotlight]` |
| Capabilities | `[data-capability-panel]`、`[data-capability-icon]`、`[data-capability-focus]` |
| Case | `[data-role-stream]`、`[data-role-status]`、`[data-report-check]` |
| Skill market | `[data-search-seed]`、`[data-market-mask]`、`[data-market-step]` |
| Labs | `[data-lab-file]`、`[data-prompt-card]`、`[data-copy-state]` |
| Feishu | `[data-flow-node]`、`[data-flow-line]`、`[data-confirm-ring]` |
| Safety | `[data-lock-pin]`、`[data-safety-check]`、`[data-vault-ring]` |
| Learning | `[data-learning-step]`、`[data-learning-progress]`、`[data-guide-seed]` |
| Guides | `[data-guide-row]`、`[data-guide-page]`、`[data-paper-transition]` |
| Closing | `[data-closing-line]`、`[data-closing-cta]`、`[data-target-flash]` |

Implementation 建议每章建立独立函数，例如 `buildHeroScene(scope)`、`buildSettingsScene(scope)`、`buildCaseScene(scope)`，统一由 `gsap.matchMedia()` 注册；不要继续把所有 timeline 堆进一个 effect。每个函数必须返回 cleanup，ScrollTrigger `id` 使用 `scene-01-hero` 这类可诊断命名。

---

## 4. Mobile 与 Reduced Motion 总规则

### Mobile（≤ 899px）

- 禁止 horizontal pin、长距离 scrub、scroll-jacking 和大幅 3D rotation。
- 所有内容改为原生纵向顺序；最多保留 20px translate、0.98→1 scale、mask reveal 和短 line draw。
- 任何图片 parallax 不超过 3%，不得裁掉教程截图中的标题、按钮或关键文字。
- 固定 Header 展开时必须暂停其下方 scene interaction；菜单关闭后再 refresh ScrollTrigger。
- 长 Prompt、下载、Copy 与外链的点击区域不得处于正在变化的 transform layer。

### `prefers-reduced-motion: reduce`

- 不仅要把 duration 设为 0.01ms；应在 JS 分支中**不创建** pin、scrub、snap、blur、clip-path 与 3D timeline。
- 清除 inline transforms、opacity、filter、clip-path，确保所有正文、图片、CTA 从首帧可见。
- 保留必要的滚动进度、active navigation 和复制成功状态，但不插值运动。
- 章节之间不做 match cut；使用自然文档流。

---

## 5. Performance budget

| 项目 | Budget / rule |
| --- | --- |
| Frame rate | Mac 演示机 Chrome 在 1440×1024 目标 55–60fps；连续 1 秒低于 45fps 判 P1 |
| Layout | Scroll tick 内禁止读取后立刻写入布局；尺寸函数仅在 refresh / resize 计算 |
| Animated properties | 优先 transform、opacity；clip-path 仅用于 1–2 个大元素；不连续动画 box-shadow / backdrop-filter |
| GPU layers | 单场同时 `will-change` 元素 ≤ 8，timeline 结束后清除 `will-change` |
| Pins | 同一滚动位置最多一个 pin；禁止嵌套 pin；pin-spacer 无空白闪烁 |
| Images | Hero/market 以实际显示尺寸输出 WebP/AVIF fallback；桌面单图建议 ≤ 450KB，移动端避免加载超大副本 |
| ScrollTriggers | 每章集中创建，组件卸载全部 kill；resize 后仅一次 debounced refresh |
| Blur | 连续 scrub 不修改大面积 backdrop-filter；需要 focus pull 时优先 opacity/contrast 或小范围 filter |
| DOM | 不为了逐字动画永久拆分全部正文；只拆 Hero 与宣言的关键行，销毁时恢复结构 |
| Interaction | Copy、Download、导航与 CTA 响应延迟 < 100ms，不等待动画结束 |

---

## 6. QA matrix

### P0 — Blocker

- 任意正文或 CTA 因初始 opacity / clip-path / transform 在 JS 失败时永久不可见。
- 动画触发下载、复制、外链、飞书写入或其他真实动作。
- 移动端 horizontal pin 导致无法继续滚动，或键盘焦点进入屏幕外元素。
- 泄露 API key、Token、真实业务材料或个人信息。

### P1 — 必须修复后发布

- 任意完整章节仍使用白色 / 浅灰 full-bleed 背景，导致全站黑白交替；或黑底章节使用互不相干的色温与亮度 token。
- 滚动出现明显卡顿：连续 1 秒低于 45fps、主线程长任务 > 100ms 或 pin spacer 跳动。
- 章节转场覆盖标题、按钮或 Prompt，导致内容在正常阅读速度下不可完成阅读。
- 1440×1024、1280×800、390×844 任一基准视口出现横向溢出、section 大片空白或 CTA 不可点击。
- Reduced motion 下仍创建 pin/snap/3D/blur 动画，或内容未处于完成态。

### P2 — 发布前修复

- 每章只使用相同的 fade + y reveal，没有形成 storyboard 指定的独特 motion identity。
- 视频式 match cut 不连续：上一章 transition seed 与下一章首物件位置、颜色或尺寸明显跳变。
- 暗色 section 之间仅靠背景色细微变化，章节层级不清楚；应通过 framing、grid、silver glass depth 和 green path 区分，而不是插入白底章节。
- 当前卡/当前阶段对比不足，或绿色高亮数量过多导致视觉重点失效。
- 动画完成后保留 transform，影响 hover、focus outline、sticky 或链接 hit area。

### P3 — Polish

- 章节 transition 的 easing、进入方向或停顿时长存在轻微不一致。
- icon counter-parallax、绿色光点或 shadow depth 不够精细，但不影响理解和操作。

### Evidence required

每轮 design QA 至少保存以下证据到 `design/qa/`：

1. 1440×1024 全页起始截图，以及 13 个内容 scene 在 50% progress 的关键帧截图。
2. 四组章节交界连拍：Hero→Manifesto、Basics→Settings、Case→Skill market、Feishu→Safety，分别记录离场 90% / 入场 10%。
3. 390×844 Hero、Settings、Capabilities、Labs、Closing 五个移动关键帧。
4. `prefers-reduced-motion` 下 Hero、Settings、Capabilities、Guides 截图与 DOM 可见性检查。
5. Console error/warning、页面 horizontal overflow、所有 CTA/Copy/Download/外链点击验证。
6. Performance trace：至少记录 Hero pin、Capabilities 横轨、Case 汇流三段，确认 FPS 与 long task budget。

最终 `design-qa.md` 必须明确：所有章节已统一为 black / charcoal stage、没有浅色 full-bleed 章节、每章拥有不同的 GSAP motion、交互未被 motion 影响，并以 `Result: passed` 结束。

---

## 7. 实现优先级

1. **P0 foundation**：先把所有章节统一到 black / charcoal tokens、建立 `matchMedia` / cleanup 架构、保证 reduced motion 与移动端自然流。
2. **P1 signature scenes**：Hero pin、Settings spotlight、Capabilities cover-flow、Case 五路汇流、Feishu→Safety match cut。
3. **P1 chapter coverage**：补齐其余章节独立 motion，消除通用 fade-only。
4. **P2 polish**：跨章 transition seed、focus pull、micro-interaction 与 performance tuning。
5. **QA gate**：三视口、reduced motion、交互、console、performance 全部通过再发布。
