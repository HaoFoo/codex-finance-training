import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 全站仅保留：首屏(#overview) 与结尾(#closing) 两处大标题的文字动效，
// 以及首屏封面的宇宙流光/粒子。其余章节一律静态呈现。
const RICH_TONE_CYCLE = [
  "silver", "silver", "green", "silver", "sky", "silver",
  "silver", "amber", "silver", "violet", "silver", "silver",
];
const CALM_TONE_CYCLE = [
  "silver", "silver", "green", "silver", "silver", "silver",
  "silver", "silver", "sky", "silver", "silver", "silver",
];
const OPENING_PUNCT = "“‘『「（《([{";
const CLOSING_PUNCT = "，。、；：！？…—～”’』」）》,.;:!?)]}%";
const WORD_CHAR = /[A-Za-z0-9@#&+._\-]/;

// 逐字 span 会让浏览器的避头点规则失效，先按“词 + 依附标点”分组，组内不换行，标点就不会落在行首。
function tokenizeTitleText(text) {
  const tokens = [];
  let pendingPrefix = [];

  Array.from(text).forEach((character) => {
    if (!character.trim()) {
      if (pendingPrefix.length) {
        tokens.push({ chars: pendingPrefix });
        pendingPrefix = [];
      }
      tokens.push({ space: true });
      return;
    }
    if (OPENING_PUNCT.includes(character)) {
      pendingPrefix.push(character);
      return;
    }
    const last = tokens[tokens.length - 1];
    if (CLOSING_PUNCT.includes(character) && last && !last.space && !pendingPrefix.length) {
      last.chars.push(character);
      return;
    }
    if (WORD_CHAR.test(character) && last?.word && !pendingPrefix.length) {
      last.chars.push(character);
      return;
    }
    tokens.push({ word: WORD_CHAR.test(character), chars: [...pendingPrefix, character] });
    pendingPrefix = [];
  });

  if (pendingPrefix.length) tokens.push({ chars: pendingPrefix });
  return tokens;
}

function prepareKineticTitles(root) {
  const snapshots = [];
  // 只对首屏和结尾两处大标题做逐字包裹，其余标题保持普通文本、无动效。
  const titles = Array.from(root.querySelectorAll("#overview h1, #closing h2"));

  const makeCharSpan = (character, glyphState) => {
    const span = document.createElement("span");
    span.className = character.trim()
      ? "kinetic-title__char"
      : "kinetic-title__char is-space";
    span.dataset.kineticChar = "";
    span.setAttribute("aria-hidden", "true");
    if (character.trim()) {
      span.dataset.tone = glyphState.cycle[glyphState.index % glyphState.cycle.length];
      glyphState.index += 1;
    }
    span.textContent = character === " " ? " " : character;
    return span;
  };

  const wrapTextNodes = (node, glyphState) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        const fragment = document.createDocumentFragment();
        tokenizeTitleText(child.textContent || "").forEach((token) => {
          if (token.space) {
            fragment.appendChild(makeCharSpan(" ", glyphState));
            return;
          }
          const word = document.createElement("span");
          word.className = "kinetic-title__word";
          token.chars.forEach((character) => word.appendChild(makeCharSpan(character, glyphState)));
          fragment.appendChild(word);
        });
        child.replaceWith(fragment);
        return;
      }

      if (child.nodeType === 1 && child.tagName !== "BR") {
        wrapTextNodes(child, glyphState);
      }
    });
  };

  titles.forEach((title, index) => {
    const originalHtml = title.innerHTML;
    const originalAriaLabel = title.getAttribute("aria-label");
    const label = (title.textContent || "").replace(/\s+/g, " ").trim();

    snapshots.push({ title, originalHtml, originalAriaLabel });
    title.dataset.kineticTitle = String(index);
    if (label) title.setAttribute("aria-label", label);
    wrapTextNodes(title, {
      index: 0,
      cycle: title.closest("#overview") ? RICH_TONE_CYCLE : CALM_TONE_CYCLE,
    });
  });

  return () => {
    snapshots.forEach(({ title, originalHtml, originalAriaLabel }) => {
      title.innerHTML = originalHtml;
      title.removeAttribute("data-kinetic-title");
      if (originalAriaLabel === null) title.removeAttribute("aria-label");
      else title.setAttribute("aria-label", originalAriaLabel);
    });
  };
}

function scheduleRefresh() {
  let refreshCall;

  const requestRefresh = () => {
    refreshCall?.kill();
    refreshCall = gsap.delayedCall(0.16, () => ScrollTrigger.refresh());
  };

  window.addEventListener("resize", requestRefresh, { passive: true });
  window.addEventListener("orientationchange", requestRefresh, { passive: true });

  return {
    requestRefresh,
    cleanup: () => {
      refreshCall?.kill();
      window.removeEventListener("resize", requestRefresh);
      window.removeEventListener("orientationchange", requestRefresh);
    },
  };
}

export function useCourseAnimations(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const refresh = scheduleRefresh();
    const restoreKineticTitles = prepareKineticTitles(root);
    const images = Array.from(root.querySelectorAll("img"));
    const imageListeners = [];

    images.forEach((image) => {
      if (image.complete) return;
      const onLoad = () => refresh.requestRefresh();
      image.addEventListener("load", onLoad, { once: true });
      image.addEventListener("error", onLoad, { once: true });
      imageListeners.push([image, onLoad]);
    });

    document.fonts?.ready.then(refresh.requestRefresh).catch(() => {});

    const context = gsap.context(() => {
      const select = (selector) => root.querySelector(selector);
      const selectAll = (selector) => gsap.utils.toArray(selector, root);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const heroChars = selectAll("#overview h1 [data-kinetic-char]");
      const closingChars = selectAll("#closing h2 [data-kinetic-char]");

      // 降级：直接静态可见（字符默认 opacity 1），不跑任何动效。
      if (reduceMotion) return;

      const nav = select("[data-nav]");
      const heroCopyChildren = selectAll("[data-hero-copy] > *");
      const heroVisual = select("[data-hero-visual]");
      const heroFlowLayers = selectAll("[data-hero-flow]");
      const heroImageLayers = selectAll(".hero-visual");

      // —— 首屏入场 ——
      const opening = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (nav) opening.from(nav, { y: -24, autoAlpha: 0, duration: 0.72 });
      if (heroCopyChildren.length) {
        opening.from(heroCopyChildren, { y: 54, autoAlpha: 0, duration: 0.92, stagger: 0.085 }, "-=0.34");
      }
      if (heroChars.length) {
        opening.from(
          heroChars,
          {
            autoAlpha: 0,
            x: (index) => ((index % 5) - 2) * 15,
            yPercent: (index) => (index % 2 ? 135 : -118),
            rotation: (index) => (index % 2 ? 18 : -16),
            scale: (index) => (index % 3 ? 0.7 : 1.2),
            duration: 1.28,
            stagger: { each: 0.03, from: "edges" },
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.82",
        );
      }
      if (heroVisual) {
        opening.from(
          heroVisual,
          {
            xPercent: 7,
            scale: 1.07,
            autoAlpha: 0.72,
            clipPath: "inset(8% 0 8% 18% round 52px)",
            duration: 1.35,
          },
          "-=1.05",
        );
      }

      // —— 首屏宇宙封面：图层缓慢漂浮 + 轨道扫光旋转 + 核心脉冲（持续，仅在视口内运行）——
      const heroLoopTweens = [];
      if (heroImageLayers.length) {
        heroLoopTweens.push(gsap.to(heroImageLayers, {
          xPercent: -0.65, yPercent: 0.35, scale: 1.012,
          duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut",
        }));
      }
      if (heroFlowLayers[0]) {
        heroLoopTweens.push(gsap.fromTo(heroFlowLayers[0],
          { autoAlpha: 0.42, "--orbit-angle": "0deg" },
          { autoAlpha: 0.42, "--orbit-angle": "360deg", duration: 10.8, repeat: -1, ease: "none" },
        ));
      }
      if (heroFlowLayers[1]) {
        heroLoopTweens.push(gsap.fromTo(heroFlowLayers[1],
          { autoAlpha: 0.2 },
          { autoAlpha: 0.56, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" },
        ));
      }

      const perpetualTitleWave = (chars) => {
        if (!chars?.length) return null;
        return gsap.to(chars, {
          yPercent: -22,
          duration: 0.5,
          ease: "power2.out",
          yoyo: true,
          yoyoEase: "bounce.out",
          repeat: -1,
          repeatDelay: 0.85,
          stagger: { each: 0.055, from: "start" },
          paused: true,
        });
      };

      const heroTitleWave = perpetualTitleWave(heroChars);
      if (heroTitleWave) {
        opening.eventCallback("onComplete", () => {
          heroTitleWave.play();
          heroLoopTweens.push(heroTitleWave);
        });
      }
      if (heroLoopTweens.length) {
        ScrollTrigger.create({
          trigger: "#overview",
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => heroLoopTweens.forEach(
            (tween) => (self.isActive ? tween.play() : tween.pause()),
          ),
        });
      }

      // —— 结尾入场 + 标题持续弹跳 ——
      const closing = select(".closing-section");
      const closingInner = closing?.querySelector(":scope > div");
      const closingEyebrow = closing?.querySelector(".eyebrow");
      const closingCopy = closing?.querySelector("p");
      const closingButton = closing?.querySelector(".primary-button");
      if (closing && closingInner) {
        gsap.timeline({
          scrollTrigger: { trigger: closing, start: "top 88%", end: "center 50%", scrub: 0.72 },
        })
          .fromTo(closingInner, { y: 150, scale: 0.78, autoAlpha: 0.18 }, { y: 0, scale: 1, autoAlpha: 1, ease: "power3.out" }, 0)
          .from(closingEyebrow, { y: 34, letterSpacing: "0.38em", autoAlpha: 0, ease: "power3.out" }, 0.16)
          .from(closingCopy, { y: 44, autoAlpha: 0, ease: "power3.out" }, 0.32)
          .from(closingButton, { y: 42, scale: 0.62, autoAlpha: 0, ease: "back.out(1.7)" }, 0.42);

        if (closingButton) {
          const pulse = gsap.to(closingButton, {
            scale: 1.035,
            boxShadow: "0 0 0 14px rgba(10, 228, 72, 0.05), 0 18px 60px rgba(10, 228, 72, 0.3)",
            duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
          ScrollTrigger.create({
            trigger: closing, start: "top bottom", end: "bottom top",
            onToggle: (self) => (self.isActive ? pulse.play() : pulse.pause()),
          });
        }

        const closingTitleWave = perpetualTitleWave(closingChars);
        if (closingTitleWave) {
          ScrollTrigger.create({
            trigger: closing, start: "top 55%", end: "bottom top",
            onEnter: () => closingTitleWave.play(),
            onEnterBack: () => closingTitleWave.play(),
            onLeave: () => closingTitleWave.pause(),
            onLeaveBack: () => closingTitleWave.pause(),
          });
        }
      }

      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    }, root);

    // 兜底：动效把首屏标题藏在 opacity 0 后面，如果 rAF 被系统节流导致 GSAP 停摆
    // （省电模式、投影扩展屏等），3 秒内没有任何帧就整体回退为静态可见。
    let lastFrame = gsap.ticker.frame;
    let stalledChecks = 0;
    const watchdog = window.setInterval(() => {
      if (document.visibilityState !== "visible") {
        lastFrame = gsap.ticker.frame;
        stalledChecks = 0;
        return;
      }
      if (gsap.ticker.frame === lastFrame) {
        stalledChecks += 1;
        if (stalledChecks >= 2) {
          window.clearInterval(watchdog);
          context.revert();
        }
        return;
      }
      lastFrame = gsap.ticker.frame;
      stalledChecks = 0;
    }, 1500);

    return () => {
      window.clearInterval(watchdog);
      imageListeners.forEach(([image, listener]) => {
        image.removeEventListener("load", listener);
        image.removeEventListener("error", listener);
      });
      refresh.cleanup();
      context.revert();
      restoreKineticTitles();
    };
  }, [rootRef]);
}
