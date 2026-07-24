# 财运中心 Codex 实战课

一套面向法务、行政、财务、税务与经营分析团队的中文 Codex 培训网站。课程采用 90 分钟线下演示主线，并提供完整的桌面端基础、Skills、Subagents、Superpowers、Plugins/MCP、飞书 CLI、自动化与 GitHub 协作课后材料。

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
- `content/`：课程大纲、讲师手册、Prompt Pack、课前检查与自学路径
- `public/labs/`：课堂演示用的脱敏模拟材料
- `public/guides/`：网站内可直接打开的完整课程文档
- `design/`：视觉参考与 QA 记录
- `.github/workflows/`：GitHub Pages 自动部署

## 发布

推送到 `main` 后，GitHub Actions 会构建并发布 `dist/client` 到 GitHub Pages。站点路径配置为 `/codex-finance-training/`。

## 安全边界

课堂只使用脱敏或模拟材料，不粘贴合同原文、员工信息、客户信息、API Key 或其他敏感数据。第三方 Skill 安装前需检查来源、权限和脚本；所有对外发送、飞书写入与 Git 操作均先预览再确认。
