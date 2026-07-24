import { CaretDown } from "@phosphor-icons/react";

export function CapabilityManual({ chapters }) {
  return (
    <div className="capability-manual" data-capability-manual>
      <div className="capability-manual__heading" data-reveal>
        <span className="eyebrow accent">完整说明</span>
        <h2>看完能力地图，<br />再把每一种能力讲透。</h2>
        <p>展开任一能力，查看适用时机、标准步骤、现场 Demo 和风险边界。</p>
      </div>

      <div className="capability-manual__list" data-stagger>
        {chapters.map((chapter, index) => (
          <details key={chapter.id} open={index === 0}>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><small>{chapter.eyebrow}</small><h3>{chapter.title}</h3></div>
              <CaretDown size={22} weight="bold" />
            </summary>
            <div className="capability-manual__body">
              <div>
                <h4>{chapter.whatItIs?.title}</h4>
                {chapter.whatItIs?.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div>
                <h4>{chapter.whenToUse?.title}</h4>
                <ul>{chapter.whenToUse?.items?.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h4>{chapter.howToUse?.title}</h4>
                <ol>{chapter.howToUse?.steps?.map((step) => <li key={step.label}><strong>{step.label}</strong>{step.text}</li>)}</ol>
              </div>
              <div className="capability-manual__demo">
                <span>现场 Demo</span>
                <p>{chapter.liveDemo?.action}</p>
                <strong>完成标准：{chapter.liveDemo?.success}</strong>
              </div>
              <div className="capability-manual__risk">
                <span>常见误区与边界</span>
                <ul>{chapter.guardrails?.items?.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
