#!/usr/bin/env node
// 把 content/*.md 渲染成站点风格的 HTML 放进 public/guides/，
// 同时把 Markdown 原文同步过去作为“下载版”。构建前（prebuild）自动运行。
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "content");
const outDir = path.join(root, "public", "guides");

marked.use({ gfm: true, breaks: false });

const template = ({ title, body, mdName }) => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<meta name="theme-color" content="#050706" />
<link rel="icon" type="image/svg+xml" href="../favicon.svg" />
<title>${title}｜Codex 财运智能工作流</title>
<style>
  :root {
    color-scheme: dark;
    --ink: #fbfff9;
    --muted: #bdc8c0;
    --line: rgba(255, 255, 255, 0.13);
    --green: #0ae448;
    --stage: #050706;
    --panel: rgba(255, 255, 255, 0.055);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--stage);
    color: var(--ink);
    font-family: "SF Pro Display", "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
    line-height: 1.85;
    font-size: 16px;
  }
  .guide-top {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px clamp(20px, 4vw, 44px);
    background: rgba(5, 7, 6, 0.9);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
    font-size: 14px;
  }
  .guide-top a {
    color: var(--muted);
    text-decoration: none;
    padding: 6px 12px;
    border: 1px solid var(--line);
    border-radius: 999px;
    white-space: nowrap;
  }
  .guide-top a:hover { color: var(--green); border-color: rgba(10, 228, 72, 0.5); }
  main {
    max-width: 880px;
    margin: 0 auto;
    padding: clamp(36px, 6vw, 72px) clamp(20px, 4vw, 44px) 120px;
  }
  h1 { font-size: clamp(30px, 4.6vw, 44px); letter-spacing: -0.03em; line-height: 1.25; margin: 0 0 28px; }
  h2 { font-size: clamp(23px, 3vw, 30px); letter-spacing: -0.02em; margin: 62px 0 18px; padding-top: 26px; border-top: 1px solid var(--line); }
  h3 { font-size: 20px; margin: 40px 0 12px; }
  h4 { font-size: 17px; margin: 30px 0 10px; color: var(--green); }
  p, li { color: #dbe3dd; }
  strong { color: var(--ink); }
  a { color: var(--green); }
  hr { border: 0; border-top: 1px solid var(--line); margin: 48px 0; }
  blockquote {
    margin: 22px 0;
    padding: 14px 22px;
    border-left: 3px solid var(--green);
    background: var(--panel);
    border-radius: 0 14px 14px 0;
    color: var(--muted);
  }
  blockquote p { margin: 0; }
  code {
    font-family: "SFMono-Regular", "Cascadia Code", "PingFang SC", monospace;
    font-size: 0.88em;
    background: rgba(255, 255, 255, 0.09);
    border-radius: 6px;
    padding: 2px 7px;
  }
  pre {
    background: #0b0e0c;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 22px 24px;
    overflow-x: auto;
    line-height: 1.75;
  }
  pre code { background: none; padding: 0; font-size: 13px; color: #d9dfdb; }
  table {
    display: block;
    width: 100%;
    overflow-x: auto;
    border-collapse: collapse;
    margin: 26px 0;
    font-size: 15px;
  }
  th, td { border: 1px solid var(--line); padding: 10px 14px; text-align: left; vertical-align: top; }
  th { background: var(--panel); color: var(--ink); white-space: nowrap; }
  input[type="checkbox"] { accent-color: var(--green); margin-right: 8px; }
  li { margin: 6px 0; }
  img { max-width: 100%; }
</style>
</head>
<body>
<div class="guide-top">
  <a href="../">← 返回课程网站</a>
  <a href="./${mdName}" download>下载 Markdown 版</a>
</div>
<main>
${body}
</main>
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });

const files = readdirSync(contentDir).filter((name) => name.endsWith(".md"));
for (const name of files) {
  const source = readFileSync(path.join(contentDir, name), "utf8");
  const title = (source.match(/^#\s+(.+)$/m)?.[1] || name.replace(/\.md$/, "")).trim();
  const body = marked.parse(source);
  const htmlName = name.replace(/\.md$/, ".html");
  writeFileSync(path.join(outDir, htmlName), template({ title, body, mdName: name }));
  copyFileSync(path.join(contentDir, name), path.join(outDir, name));
}

console.log(`Rendered ${files.length} guides into public/guides/`);
