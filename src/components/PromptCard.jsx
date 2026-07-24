import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function PromptCard({ item }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = item.prompt;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      setCopied(true);
    }
  };

  return (
    <article className="prompt-card" data-reveal>
      <div className="prompt-card__header">
        <div>
          <span className="eyebrow accent">{item.badge}</span>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </div>
        <button className="copy-button" type="button" onClick={copyPrompt} aria-live="polite">
          {copied ? <Check size={18} weight="bold" /> : <Copy size={18} />}
          {copied ? "已复制" : "复制提示词"}
        </button>
      </div>
      <pre tabIndex="0"><code>{item.prompt}</code></pre>
    </article>
  );
}

