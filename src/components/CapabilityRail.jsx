import { capabilities } from "../data/course";

export function CapabilityRail() {
  return (
    <div className="capability-viewport" data-capability-viewport>
      <div className="capability-track" data-capability-track>
        <div className="capability-intro capability-panel">
          <span className="section-index">进阶能力</span>
          <h2>不是只有<br />Superpowers<br />和 Subagents</h2>
          <p>Codex 是一套从任务定义、能力扩展、外部连接到自动交付的完整工作系统。</p>
          <span className="scroll-hint">继续滚动，横向展开能力地图</span>
        </div>

        {capabilities.map((capability) => {
          const Icon = capability.icon;
          return (
            <article className="capability-panel capability-card" key={capability.key}>
              <div className="capability-card__icon" aria-hidden="true">
                <Icon size={36} weight="duotone" />
              </div>
              <span className="eyebrow">{capability.eyebrow}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
              <blockquote>{capability.example}</blockquote>
            </article>
          );
        })}
      </div>
    </div>
  );
}

