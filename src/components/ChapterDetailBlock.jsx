import {
  CheckSquareOffset,
  Clock,
  Lightbulb,
  PlayCircle,
  WarningCircle,
} from "@phosphor-icons/react";

export function ChapterDetailBlock({ chapter }) {
  if (!chapter) return null;

  return (
    <div className="chapter-detail" data-detail-stage>
      <div className="chapter-detail__lead" data-reveal>
        <span className="eyebrow accent">{chapter.eyebrow} · 深入理解</span>
        <h3>{chapter.title}</h3>
        <p>{chapter.summary}</p>
      </div>

      <div className="chapter-detail__grid" data-stagger>
        <article>
          <Lightbulb size={27} weight="duotone" />
          <h4>{chapter.whatItIs?.title || "这是什么"}</h4>
          {chapter.whatItIs?.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>

        <article>
          <Clock size={27} weight="duotone" />
          <h4>{chapter.whenToUse?.title || "什么时候用"}</h4>
          <ul>
            {chapter.whenToUse?.items?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article>
          <CheckSquareOffset size={27} weight="duotone" />
          <h4>{chapter.howToUse?.title || "怎么做"}</h4>
          <ol>
            {chapter.howToUse?.steps?.map((step) => (
              <li key={step.label}><strong>{step.label}</strong><span>{step.text}</span></li>
            ))}
          </ol>
        </article>
      </div>

      <div className="chapter-detail__footer" data-stagger>
        {chapter.liveDemo ? (
          <article className="demo-note">
            <PlayCircle size={28} weight="fill" />
            <div>
              <span>{chapter.liveDemo.title} · {chapter.liveDemo.duration || "跟着讲师操作"}</span>
              <h4>{chapter.liveDemo.action}</h4>
              {chapter.liveDemo.success ? <p><strong>完成标准：</strong>{chapter.liveDemo.success}</p> : null}
            </div>
          </article>
        ) : null}

        {chapter.guardrails ? (
          <article className="guardrail-note">
            <WarningCircle size={28} weight="duotone" />
            <div>
              <span>{chapter.guardrails.title}</span>
              <ul>{chapter.guardrails.items?.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
}

