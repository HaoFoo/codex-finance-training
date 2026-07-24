import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  CheckCircle,
  DownloadSimple,
  FileCsv,
  FileMd,
  FolderOpen,
  LockKey,
  Play,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useCourseAnimations } from "./animations";
import { CapabilityManual } from "./components/CapabilityManual";
import { CapabilityRail } from "./components/CapabilityRail";
import { ChapterDetailBlock } from "./components/ChapterDetailBlock";
import { Header } from "./components/Header";
import { ProgressRail } from "./components/ProgressRail";
import { PromptCard } from "./components/PromptCard";
import {
  desktopEntries,
  learningPath,
  navigation,
  resourceLinks,
  roles,
} from "./data/course";
import { demoPrompts } from "./data/prompts";
import { chapterDetails } from "./data/chapterDetails";
import { settingsGroups } from "./data/settings";

const base = import.meta.env.BASE_URL;

const labFiles = [
  { name: "经营指标", file: "01-operating-metrics.csv", icon: FileCsv },
  { name: "预算差异", file: "02-budget-variance.csv", icon: FileCsv },
  { name: "合同风险", file: "03-contract-risk.md", icon: FileMd },
  { name: "税务事项", file: "04-tax-items.md", icon: FileMd },
  { name: "行政采购", file: "05-admin-procurement.md", icon: FileMd },
  { name: "汇报模板", file: "06-management-report-template.md", icon: FileMd },
];

const guideFiles = [
  ["完整课程文档", "16 章功能、概念、案例与安全边界", "course-outline.html"],
  ["Codex 桌面端设置详解", "逐项解释权限、集成、编码与个性化设置", "codex-desktop-guide.html"],
  ["33 组可复制提示词", "从只读检查到最终验收的完整 Prompt Pack", "prompt-pack.html"],
  ["课前检查清单", "安装、Workspace、飞书 CLI、网络与安全确认", "preclass-checklist.html"],
  ["课后自学路径", "四级能力成长路线与五团队岗位分支", "self-study.html"],
];

const chapterById = Object.fromEntries(chapterDetails.map((chapter) => [chapter.id, chapter]));
const capabilityChapters = [
  "prompt",
  "skills",
  "plugins",
  "subagents",
  "superpowers",
  "agents-md",
  "browser",
  "automation",
  "delivery",
].map((id) => chapterById[id]).filter(Boolean);

function SectionHeading({ index, eyebrow, title, body, inverse = false }) {
  return (
    <div className={inverse ? "section-heading inverse" : "section-heading"} data-reveal>
      <span className="section-index">{index}</span>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

export function App() {
  const rootRef = useRef(null);
  const [activeSection, setActiveSection] = useState("overview");

  useCourseAnimations(rootRef);

  useEffect(() => {
    const observers = navigation
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
      .map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(section.id);
          },
          { rootMargin: "-38% 0px -55%", threshold: 0 },
        );
        observer.observe(section);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main ref={rootRef} className="site-shell">
      <div className="scroll-progress" data-scroll-progress />
      <Header activeSection={activeSection} />
      <ProgressRail activeSection={activeSection} />

      <section id="overview" className="hero-section section-anchor" data-scene="hero">
        <div className="hero-media" data-hero-visual>
          <img
            className="hero-visual hero-visual--base"
            src={`${base}assets/hero-bright-workflow-v3.webp`}
            alt="高亮银白玻璃工作流从 Codex 对话连接到管理层汇报"
          />
          <img
            className="hero-visual hero-visual--flow hero-visual--flow-a"
            data-hero-flow
            src={`${base}assets/hero-bright-workflow-v3.webp`}
            alt=""
            aria-hidden="true"
          />
          <img
            className="hero-visual hero-visual--flow hero-visual--flow-b"
            data-hero-flow
            src={`${base}assets/hero-bright-workflow-v3.webp`}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="hero-copy" data-hero-copy>
          <span className="eyebrow">财运学院 · AI 实践课</span>
          <h1>把复杂工作，<br />变成一条清晰路径</h1>
          <p className="hero-title"><strong>Codex</strong> <span>财运智能工作流</span></p>
          <p className="hero-description">从本地文件到飞书交付，一次走完整条工作流。</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => jumpTo("basics")}>
              进入课程 <ArrowRight size={20} weight="bold" />
            </button>
            <button className="text-button" type="button" onClick={() => jumpTo("overview-story")}>
              <ArrowDown size={18} /> 滚动探索
            </button>
          </div>
        </div>
        <div className="hero-meta" data-hero-copy>
          <span>90 分钟</span>
          <span>线下实操</span>
          <span>Mac 现场演示</span>
        </div>
      </section>

      <section id="overview-story" className="manifesto-section" data-scene="mindset">
        <div className="manifesto-copy" data-reveal>
          <span className="eyebrow accent">先建立一个正确认知</span>
          <p>Codex 不是“更会聊天的 AI”。</p>
          <h2>它能理解材料、规划步骤、调用工具、修改文件、验证结果，并把工作交付出去。</h2>
        </div>
        <div className="manifesto-steps" data-stagger>
          {[
            ["01", "说清任务", "目标 + 上下文 + 限制 + 完成标准"],
            ["02", "让它工作", "读取、分析、调用 Skill、执行和验证"],
            ["03", "审阅结果", "保留人类判断，确认后再写入或发布"],
          ].map(([index, title, text]) => (
            <article key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <ChapterDetailBlock chapter={chapterById.overview} />
      </section>

      <section id="basics" className="basics-section section-anchor" data-scene="basics">
        <SectionHeading
          index="01"
          eyebrow="快速入门"
          title="先看懂桌面端，再开始第一个任务"
          body="安装默认放在课前完成。课堂从打开 Codex、选择工作目录和新建任务开始。"
        />

        <div className="desktop-stage" data-reveal>
          <div className="desktop-stage__sidebar" aria-hidden="true">
            <strong>Codex</strong>
            {desktopEntries.map((entry, index) => {
              const Icon = entry.icon;
              return (
                <button
                  className={index === 0 ? "is-selected" : ""}
                  type="button"
                  tabIndex={-1}
                  key={entry.title}
                >
                  <Icon size={19} weight="duotone" /> {entry.title}
                </button>
              );
            })}
          </div>
          <div className="desktop-stage__content">
            <span className="eyebrow">新建任务</span>
            <h3>今天希望 Codex 帮你完成什么？</h3>
            <div className="composer-preview">
              <p>读取 labs 中的模拟材料，生成月度经营复盘。</p>
              <span>目标清楚 · 材料明确 · 完成标准可验证</span>
              <button type="button" aria-hidden="true" tabIndex={-1}><ArrowRight size={20} /></button>
            </div>
            <div className="desktop-explanations" data-stagger>
              {desktopEntries.map((entry) => {
                const Icon = entry.icon;
                return (
                  <article key={entry.title}>
                    <Icon size={28} weight="duotone" />
                    <div><h4>{entry.title}</h4><p>{entry.summary}</p><small>{entry.action}</small></div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <ChapterDetailBlock chapter={chapterById.basics} />
      </section>

      <section id="settings" className="settings-section section-anchor" data-settings-stage data-scene="settings">
        <SectionHeading
          index="02"
          eyebrow="Codex 桌面端设置"
          title="每一个开关，都对应一条能力边界"
          body="这不是设置项清单。你要理解它会改变什么、什么时候应该开启，以及打开以后由谁承担确认责任。"
        />

        <div className="settings-layout">
          <aside className="settings-nav" data-settings-nav aria-label="设置分组">
            {settingsGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.key}>
                  <Icon size={20} weight="duotone" />
                  <span>{group.label}</span>
                </div>
              );
            })}
          </aside>

          <div className="settings-panel" data-settings-panel>
            <figure className="settings-screenshot" data-reveal>
              <a href={`${base}assets/codex-settings-overview.webp`} target="_blank" rel="noreferrer">
                <img src={`${base}assets/codex-settings-overview.webp`} alt="Codex 桌面端设置页面，包含常规、集成、编码与归档设置导航" />
              </a>
              <figcaption><span>你当前客户端的栏目可能因版本和公司封装而不同；功能解释以实际界面与管理员策略为准。</span><strong>点击查看原图</strong></figcaption>
            </figure>

            <div className="settings-card-stack">
              {settingsGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article className="settings-card" data-settings-card key={group.key}>
                    <div className="settings-card__heading">
                      <div><Icon size={30} weight="duotone" /></div>
                      <span className="eyebrow accent">{group.eyebrow}</span>
                      <h3>{group.title}</h3>
                      <p>{group.summary}</p>
                    </div>
                    <div className="settings-card__items">
                      {group.items.map((item) => (
                        <div key={item.name}>
                          <strong>{item.name}</strong>
                          <p>{item.detail}</p>
                        </div>
                      ))}
                    </div>
                    <p className="settings-card__recommendation"><CheckCircle size={20} weight="fill" />{group.recommendation}</p>
                  </article>
                );
              })}
            </div>

            <a className="outline-button settings-guide-link" href={`${base}guides/codex-desktop-guide.html`} target="_blank" rel="noreferrer">
              打开《Codex 桌面端功能与设置详解》 <BookOpenText size={20} />
            </a>
          </div>
        </div>
      </section>

      <section id="capabilities" className="capabilities-section section-anchor" data-scene="capabilities">
        <CapabilityRail />
        <CapabilityManual chapters={capabilityChapters} />
      </section>

      <section id="case" className="case-section section-anchor" data-scene="case">
        <SectionHeading
          index="03"
          eyebrow="贯穿案例"
          title="一个任务，唤醒五个专业视角"
          body="月度经营复盘把本地文件、Subagents、Skills、管理层汇报和飞书交付串成一条完整主线。"
          inverse
        />

        <div className="case-layout">
          <div className="role-list" data-role-list>
            {roles.map((role, index) => (
              <article data-role-row key={role.name} style={{ "--role-accent": role.accent }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{role.name}</h3><p>{role.task}</p></div>
                <strong>{role.output}</strong>
              </article>
            ))}
          </div>

          <aside className="case-result" data-reveal>
            <span className="eyebrow">主 Agent 汇总</span>
            <h3>事实不混推断，结论必须有证据</h3>
            <ul>
              <li><CheckCircle size={21} weight="fill" /> 一页执行摘要</li>
              <li><CheckCircle size={21} weight="fill" /> 指标与预算差异</li>
              <li><CheckCircle size={21} weight="fill" /> 风险与待确认事项</li>
              <li><CheckCircle size={21} weight="fill" /> 行动计划与负责人</li>
            </ul>
            <button className="inverse-button" type="button" onClick={() => jumpTo("labs")}>
              打开实战提示词 <ArrowRight size={19} />
            </button>
          </aside>
        </div>
        <ChapterDetailBlock chapter={chapterById.case} />
      </section>

      <section className="skill-market-section" data-skill-stage data-scene="skill-market">
        <div className="skill-market-copy" data-reveal>
          <span className="section-index">Skill discovery</span>
          <span className="eyebrow accent">优先内部，再扩展 GitHub</span>
          <h2>不知道用什么 Skill？<br />先搜索，再让 Codex 评估。</h2>
          <ol>
            <li><span>1</span>描述目标，不要先猜 Skill 名称</li>
            <li><span>2</span>优先搜索内部 Skill 市场</li>
            <li><span>3</span>需要扩展时，再通过课程指引访问 GitHub</li>
            <li><span>4</span>安装前检查来源、权限、脚本和维护状态</li>
          </ol>
          <a className="primary-button" href="https://skills.ijovo.com/" target="_blank" rel="noreferrer">
            打开内部 Skill 市场 <ArrowRight size={19} />
          </a>
        </div>
        <div className="skill-market-image-wrap" data-reveal>
          <img
            data-skill-image
            src={`${base}assets/internal-skill-market.webp`}
            alt="瓶子星球 Skill 市场，展示技能分类、搜索和安装入口"
          />
        </div>
      </section>

      <section id="labs" className="labs-section section-anchor" data-scene="labs">
        <SectionHeading
          index="04"
          eyebrow="实战练习"
          title="复制一个提示词，拿到一个真实成果"
          body="现场 success criteria：至少成功运行一个 demo prompt，生成本地成果或飞书成果。"
        />

        <div className="lab-downloads" data-stagger>
          <div className="lab-downloads__intro">
            <FolderOpen size={32} weight="duotone" />
            <div><h3>模拟材料包</h3><p>全部为虚构、脱敏数据，解压后把整个文件夹交给 Codex 作为 Workspace。</p></div>
          </div>
          <a className="lab-downloads__all" href={`${base}codex-labs.zip`} download>
            <DownloadSimple size={26} weight="duotone" />
            <span>
              <strong>一键下载全部材料</strong>
              <small>codex-labs.zip · 含 9 个文件，解压得到 codex-labs 课程材料文件夹</small>
            </span>
            <ArrowRight size={19} />
          </a>
          {labFiles.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.file} href={`${base}labs/${item.file}`} download>
                <Icon size={22} weight="duotone" />
                <span><strong>{item.name}</strong><small>{item.file}</small></span>
                <DownloadSimple size={19} />
              </a>
            );
          })}
        </div>

        <div className="prompt-grid">
          {demoPrompts.map((item) => <PromptCard key={item.id} item={item} />)}
        </div>
        <ChapterDetailBlock chapter={chapterById.labs} />
      </section>

      <section className="feishu-section" data-scene="feishu">
        <SectionHeading
          index="05"
          eyebrow="飞书 CLI"
          title="让成果离开本地，进入团队协作"
          body="课前完成安装与授权，课堂只调用；配置问题统一参考飞书实战指南，会后自行补齐。"
        />
        <div className="feishu-flow" data-stagger>
          {[
            ["课前", "完成安装与授权", "安装 CLI 与全部飞书 Skills，重启 Codex 后验证。"],
            ["课堂", "调用已配置能力", "创建云文档、读取并总结文档、操作多维表格。"],
            ["确认", "预览写入动作", "任何写操作先展示目标、内容与范围，再由人确认。"],
            ["会后", "扩展到真实岗位", "从低风险、可回滚的重复任务开始沉淀 Skill。"],
          ].map(([step, title, text]) => (
            <article key={step}>
              <span>{step}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
        <a className="outline-button" href="https://www.feishu.cn/community/prompts?id=7649306513806216122&from=ug_from_subscribe_update" target="_blank" rel="noreferrer">
          查看《Codex × 飞书 CLI 实战指南》 <ArrowRight size={19} />
        </a>
        <ChapterDetailBlock chapter={chapterById.feishu} />
      </section>

      <section className="safety-section" data-scene="safety">
        <div className="safety-title" data-reveal>
          <ShieldCheck size={42} weight="duotone" />
          <div><span className="eyebrow">安全边界</span><h2>能力越强，确认点越清楚</h2></div>
        </div>
        <div className="safety-rules" data-stagger>
          {[
            ["只用脱敏材料", "课堂禁止真实客户、合同、薪酬、税务底稿和个人信息。"],
            ["不暴露密钥", "API key、Token、密码和授权码不进入提示词、截图或代码仓库。"],
            ["审查第三方 Skill", "确认来源、权限、脚本内容、维护活跃度和安装范围。"],
            ["写操作前确认", "创建、发送、覆盖、删除、发布等动作先预览目标与影响。"],
          ].map(([title, text]) => (
            <article key={title}><LockKey size={24} weight="duotone" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <ChapterDetailBlock chapter={chapterById.safety} />
      </section>

      <section className="learning-section" data-scene="learning">
        <SectionHeading
          index="06"
          eyebrow="学习路径"
          title="90 分钟只是起点"
          body="先完成一个成果，再把高频任务逐步变成 Prompt、Skill 和 Automation。"
        />
        <div className="learning-path" data-stagger>
          {learningPath.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.step}>
                <span>{item.step}</span><Icon size={31} weight="duotone" />
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>
            );
          })}
        </div>
        <div className="resource-list" data-stagger>
          {resourceLinks.map((resource) => (
            <a href={resource.href} target="_blank" rel="noreferrer" key={resource.title}>
              <div><h3>{resource.title}</h3><p>{resource.description}</p></div>
              <span>{resource.label} <ArrowRight size={18} /></span>
            </a>
          ))}
        </div>
        <ChapterDetailBlock chapter={chapterById.learning} />
      </section>

      <section className="guide-library-section" data-scene="guides">
        <div className="guide-library-copy" data-reveal>
          <span className="section-index">课程资料库</span>
          <h2>现场看主线，<br />网站保留完整深度</h2>
          <p>所有材料均为中文，可下载、可复用，也可以直接交给 Codex 继续学习。</p>
        </div>
        <div className="guide-file-list" data-stagger>
          {guideFiles.map(([title, description, file], index) => (
            <a key={file} href={`${base}guides/${file}`} target="_blank" rel="noreferrer">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <BookOpenText size={28} weight="duotone" />
              <div><h3>{title}</h3><p>{description}</p></div>
              <ArrowRight size={20} />
            </a>
          ))}
        </div>
      </section>

      <section id="closing" className="closing-section" data-scene="closing">
        <div data-reveal>
          <span className="eyebrow">课程结束 · 行动开始</span>
          <h2>今天不是课程的终点。<br />是你和 Codex 一起交付的<br />全新起点。</h2>
          <p>运行第一个任务，把一次成果沉淀成下一次可复用的团队能力。</p>
          <button className="primary-button" type="button" onClick={() => jumpTo("labs")}>
            <Play size={19} weight="fill" /> 启动第一个任务
          </button>
        </div>
      </section>

      <footer>
        <span>财运学院 · Finance Learning Hub</span>
        <span>Codex 财运智能工作流 · 2026</span>
      </footer>
    </main>
  );
}
