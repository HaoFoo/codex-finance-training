# Design QA

## QA 基线

- 目标视觉：`design/references/selected-visual.png`
- 桌面视口：1440 × 1024，DPR 1
- 移动视口：390 × 844，DPR 1
- 视觉语言：明亮银白舞台、超大黑色中文标题、绿色重点、玻璃质感工作流、Apple 式克制排版与 GSAP 滚动叙事
- 实现截图：`design/qa/implementation-desktop.png`
- 同屏对比：`design/qa/hero-comparison-pass2.png`
- 聚焦对比：`design/qa/hero-focus-comparison.png`

## 对比记录

### Pass 1

同屏检查 `design/qa/hero-comparison-pass1.png` 后发现：

- Hero 标题换行过多，字块密度与目标稿不一致。
- 首屏内容整体偏低，弱化了第一眼的视觉冲击。
- 品牌副标题中黑色与绿色层级不够明确。

已修复：扩大 Hero 文案宽度、限制标题字号上限、上移首屏内容，并将 `Codex` 与中文副标题拆成黑色/绿色层级。

### Pass 2

同屏检查 `design/qa/hero-comparison-pass2.png` 与聚焦检查 `design/qa/hero-focus-comparison.png`：

- 标题比例、两行换行、银白背景、绿色强调和 CTA 层级与目标稿一致。
- 右侧使用真实生成的工作流视觉资产，未使用占位图、div art 或手绘 SVG。
- 导航、正文与首屏视觉之间留白稳定；无裁切、错位或横向溢出。
- 剩余差异仅为 P3：实现保留了可操作的浮动导航，目标稿导航更平；实现素材细节更克制。这些差异服务于完整课程站点的可用性，不影响视觉方向。

## 交互与状态检查

- 顶部导航：章节跳转与 active 状态正常。
- Hero CTA：可滚动进入课程；“滚动探索”可跳转到认知章节。
- 横向能力轨道：ScrollTrigger pin、scrub 与卡片位移正常；证据见 `design/qa/implementation-capabilities-motion.png`。
- Prompt 卡片：复制后按钮切换为“已复制”。
- 实验材料：CSV / Markdown 下载链接指向正确文件。
- 移动端菜单：390 px 下可打开、关闭并完成导航。
- Reduced motion：系统开启减少动态效果后，内容保持可读且不依赖动画出现。
- Console：无 error 或 warning。
- 响应式：桌面 1440 px 与移动 390 px 均无横向溢出；移动截图见 `design/qa/implementation-mobile.png`。

## 构建与可访问性

- `npm run build`：通过。
- `npm run test:sites`：4/4 通过。
- GitHub Pages 子路径 `/codex-finance-training/`：构建产物引用路径已验证。
- 页面语言与 metadata：`zh-CN`，标题、导航、正文和按钮均为中文；产品名称与技术术语保留英文原名。
- 图片包含中文替代文本；按钮提供可读 label；键盘可聚焦原生按钮与链接。

## 最终结果

无未解决的 P0、P1 或 P2 视觉与功能问题。

Result: passed
