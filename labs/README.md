# 月度经营复盘模拟材料｜维护说明

## 目标

这组材料服务于 90 分钟 Codex 财运中心线下培训，支持以下现场演示：

- 本地多文件读取与结构化汇总；
- Superpowers 的 brainstorming、planning 和 parallel agent workflow；
- 法务、行政、财务、税务、经营分析五个 Subagents 并行分析；
- 生成管理层汇报和中文交互式网页；
- 将重复复盘流程封装为 Skill；
- 通过飞书 CLI 创建/读取云文档与 Base。

全部可下载文件位于 `public/labs/`，网站应使用 `/labs/<filename>` 的 Vite-safe 路径链接。

## 发布文件

1. `public/labs/01-operating-metrics.csv`
2. `public/labs/02-budget-variance.csv`
3. `public/labs/03-contract-risk.md`
4. `public/labs/04-tax-items.md`
5. `public/labs/05-admin-procurement.md`
6. `public/labs/06-management-report-template.md`
7. `public/labs/07-feishu-base.json`
8. `public/labs/prompts.md`
9. `public/labs/README.md`

## 数据勾稽基线

| 检查项 | 预期结果 |
|---|---:|
| 毛利额 | 1,280 - 896 = 384 万元 |
| 期间费用 | 75 + 88 + 62 + 25 = 250 万元 |
| 经营利润 | 384 - 250 = 134 万元 |
| 经营利润预算差异 | 134 - 188.5 = -54.5 万元 |
| 毛利与费用对利润差异的解释 | -34.5 - 20 = -54.5 万元 |
| 行政采购 | 12 + 8 + 5 = 25 万元 |
| 行政采购超预算 | 25 - 18 = 7 万元 |
| 合同逾期应收 | 120 万元，占期末应收 620 万元的 19.35% |
| 合同验收导致收入递延 | 60 万元 |
| Base 记录数 | 7 条 |

## 练习验收

- **基础汇总：**结论包含结果、原因、风险、行动，数字有来源且不编造。
- **并行分析：**实际启动 5 个 Subagents；角色边界清楚；最终结果去重并识别跨团队依赖。
- **管理层汇报：**完全遵循模板，列出管理层决策、行动 Owner、截止日期和验收证据。
- **交互网页：**中文、可本地打开、KPI 与风险可交互、支持 reduced motion、不上传数据。
- **Skill：**包含输入校验、勾稽规则、错误处理、日志、人工复核 gate 与至少 3 个 tests。
- **飞书：**新建对象后回读校验；不覆盖或修改既有业务对象；失败时准确返回阻塞原因。

## 维护规则

- 修改任意财务数字时，同步检查 CSV、Markdown、JSON、prompt 验收数字和两份 README。
- 任何新增主体都必须明确为虚构，禁止引入真实公司或个人信息。
- 课堂 prompts 必须可整段复制；外部写操作默认只作用于新建的培训对象。
