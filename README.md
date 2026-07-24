# 财运中心 Codex 实战课

一套面向法务、行政、财务、税务与经营分析团队的中文 Codex 培训网站。课程采用 90 分钟线下演示主线，并提供完整的桌面端设置、Skills、Subagents、Superpowers、Plugins/MCP、飞书 CLI、自动化与 GitHub 协作课后材料。网站使用统一黑色舞台和分章 GSAP 滚动叙事。

## 本地运行

```bash
npm install
npm run dev
```

生产构建与基础测试：

```bash
npm run build
npm run test:sites
```

## 目录

- `src/`：React 页面、交互与 GSAP 滚动动画
- `content/`：课程大纲、讲师手册、Prompt Pack、课前检查与自学路径（Markdown 源文件）
- `content/codex-desktop-guide.md`：Codex Desktop 功能与设置逐项详解
- `public/labs/`：课堂演示用的脱敏模拟材料
- `public/guides/`：由 `content/` 渲染出的站点风格 HTML 文档 + Markdown 下载版（`npm run build:content` 生成，请勿手改）
- `public/codex-labs.zip`：学员一键下载的课程材料包（同样由 `build:content` 生成）
- `scripts/`：guides 渲染、labs 打包与 Sites 构建脚本
- `design/`：视觉参考与 QA 记录
- `.github/workflows/`：GitHub Pages 自动部署

修改课程文档时只改 `content/` 与 `public/labs/`，然后运行 `npm run build:content` 同步生成物。

## 发布

推送到 `main` 后，GitHub Actions 会构建并发布 `dist/client` 到 GitHub Pages。站点路径配置为 `/codex-finance-training/`。

## 安全边界

课堂只使用脱敏或模拟材料，不粘贴合同原文、员工信息、客户信息、API Key 或其他敏感数据。第三方 Skill 安装前需检查来源、权限和脚本；所有对外发送、飞书写入与 Git 操作均先预览再确认。
