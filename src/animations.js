import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOTION_TARGETS = [
  "[data-nav]",
  "[data-hero-copy]",
  "[data-hero-visual]",
  "[data-hero-flow]",
  "[data-kinetic-char]",
  "[data-scroll-progress]",
  "[data-reveal]",
  "[data-stagger] > *",
  "[data-role-row]",
  "[data-capability-track]",
  ".capability-panel",
  ".desktop-stage",
  ".composer-preview",
  "[data-settings-stage]",
  "[data-settings-nav] > *",
  "[data-settings-panel]",
  "[data-settings-card]",
  ".skill-market-copy",
  ".skill-market-image-wrap",
  "[data-skill-image]",
  ".prompt-card",
  ".feishu-flow article",
  ".safety-rules article",
  ".learning-path article",
  ".resource-list > a",
  ".guide-file-list > a",
  ".closing-section > div",
].join(",");

function prepareKineticTitles(root) {
  const snapshots = [];
  const titles = Array.from(root.querySelectorAll("[data-scene] h1, [data-scene] h2"));
  const toneCycle = [
    "silver", "silver", "green", "silver", "sky", "silver",
    "silver", "amber", "silver", "violet", "silver", "silver",
  ];

  const wrapTextNodes = (node, glyphState) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        const fragment = document.createDocumentFragment();
        Array.from(child.textContent || "").forEach((character) => {
          const span = document.createElement("span");
          span.className = character.trim()
            ? "kinetic-title__char"
            : "kinetic-title__char is-space";
          span.dataset.kineticChar = "";
          span.setAttribute("aria-hidden", "true");
          if (character.trim()) {
            span.dataset.tone = toneCycle[glyphState.index % toneCycle.length];
            glyphState.index += 1;
          }
          span.textContent = character === " " ? "\u00a0" : character;
          fragment.appendChild(span);
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
    wrapTextNodes(title, { index: 0 });
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

    let media;
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

      if (reduceMotion) {
        gsap.set(MOTION_TARGETS, {
          clearProps: "opacity,transform,clipPath,filter,visibility",
        });
        gsap.set("[data-scroll-progress]", { scaleX: 1, opacity: 0.35 });
        return;
      }

      const revealHeading = (heading, trigger = heading) => {
        if (!heading) return null;
        return gsap.fromTo(
          heading,
          {
            autoAlpha: 0,
            y: 70,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger,
              start: "top 84%",
              once: true,
            },
          },
        );
      };

      const onceStagger = (trigger, targets, fromVars = {}) => {
        if (!trigger || !targets?.length) return null;
        return gsap.from(targets, {
          autoAlpha: 0,
          y: 42,
          duration: 0.82,
          stagger: 0.09,
          ease: "power3.out",
          ...fromVars,
          scrollTrigger: {
            trigger,
            start: "top 82%",
            once: true,
            ...(fromVars.scrollTrigger || {}),
          },
        });
      };

      const animateKineticTitle = (title, trigger = title, scrollTrigger = {}) => {
        if (!title) return null;
        const characters = gsap.utils.toArray("[data-kinetic-char]", title);
        if (!characters.length) return null;

        return gsap.fromTo(
          characters,
          {
            autoAlpha: 0,
            x: (index) => ((index % 5) - 2) * 11,
            yPercent: (index) => (index % 2 ? 128 : -112),
            rotation: (index) => (index % 2 ? 16 : -14),
            scale: (index) => (index % 3 ? 0.72 : 1.18),
          },
          {
            autoAlpha: 1,
            x: 0,
            yPercent: 0,
            rotation: 0,
            scale: 1,
            duration: 1.24,
            stagger: { each: 0.026, from: "edges" },
            ease: "elastic.out(1, 0.52)",
            scrollTrigger: {
              trigger,
              start: "top 86%",
              once: true,
              ...scrollTrigger,
            },
          },
        );
      };

      gsap.to("[data-scroll-progress]", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.18,
        },
      });

      const nav = select("[data-nav]");
      const heroCopyChildren = selectAll("[data-hero-copy] > *");
      const heroVisual = select("[data-hero-visual]");
      const heroFlowLayers = selectAll("[data-hero-flow]");
      const heroTitleChars = selectAll("#overview h1 [data-kinetic-char]");
      const heroMeta = select(".hero-meta");

      const opening = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (nav) opening.from(nav, { y: -24, autoAlpha: 0, duration: 0.72 });
      if (heroCopyChildren.length) {
        opening.from(
          heroCopyChildren,
          {
            y: 54,
            autoAlpha: 0,
            duration: 0.92,
            stagger: 0.085,
          },
          "-=0.34",
        );
      }
      if (heroTitleChars.length) {
        opening.from(
          heroTitleChars,
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

      heroFlowLayers.forEach((layer, index) => {
        gsap.fromTo(
          layer,
          {
            autoAlpha: index === 0 ? 0.18 : 0.1,
            webkitMaskPosition: index === 0 ? "-55% 0%" : "145% 0%",
            maskPosition: index === 0 ? "-55% 0%" : "145% 0%",
          },
          {
            autoAlpha: index === 0 ? 0.72 : 0.48,
            webkitMaskPosition: index === 0 ? "155% 0%" : "-55% 0%",
            maskPosition: index === 0 ? "155% 0%" : "-55% 0%",
            duration: index === 0 ? 3.2 : 4.4,
            repeat: -1,
            ease: "none",
          },
        );
        gsap.to(layer, {
          xPercent: index === 0 ? 1.8 : -1.2,
          yPercent: index === 0 ? -0.8 : 1.1,
          scale: index === 0 ? 1.018 : 1.012,
          duration: index === 0 ? 2.7 : 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      selectAll("[data-kinetic-title]")
        .filter((title) => !title.closest("#overview") && !title.closest(".capability-panel"))
        .forEach((title) => animateKineticTitle(title, title));

      const closing = select(".closing-section");
      const closingInner = closing?.querySelector(":scope > div");
      const closingEyebrow = closing?.querySelector(".eyebrow");
      const closingCopy = closing?.querySelector("p");
      const closingButton = closing?.querySelector(".primary-button");
      if (closing && closingInner) {
        gsap.timeline({
          scrollTrigger: {
            trigger: closing,
            start: "top 88%",
            end: "center 50%",
            scrub: 0.72,
          },
        })
          .fromTo(closingInner, {
            y: 150,
            scale: 0.78,
            autoAlpha: 0.18,
          }, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "power3.out",
          }, 0)
          .from(closingEyebrow, {
            y: 34,
            letterSpacing: "0.38em",
            autoAlpha: 0,
            ease: "power3.out",
          }, 0.16)
          .from(closingCopy, {
            y: 44,
            autoAlpha: 0,
            ease: "power3.out",
          }, 0.32)
          .from(closingButton, {
            y: 42,
            scale: 0.62,
            autoAlpha: 0,
            ease: "back.out(1.7)",
          }, 0.42);

        if (closingButton) {
          gsap.to(closingButton, {
            scale: 1.035,
            boxShadow: "0 0 0 14px rgba(10, 228, 72, 0.05), 0 18px 60px rgba(10, 228, 72, 0.3)",
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      media = gsap.matchMedia();

      media.add("(min-width: 900px)", () => {
        const hero = select("#overview");
        if (hero && heroVisual) {
          gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=82%",
              pin: true,
              pinSpacing: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
            .to(heroVisual, {
              scale: 1.15,
              yPercent: 4,
              clipPath: "inset(3% 2% 3% 2% round 46px)",
              ease: "none",
            }, 0)
            .to(".hero-copy", {
              yPercent: -23,
              scale: 0.95,
              autoAlpha: 0,
              ease: "power2.in",
            }, 0.2)
            .to(heroMeta, {
              y: 28,
              autoAlpha: 0,
              ease: "power2.in",
            }, 0.25)
            .to(heroVisual, {
              autoAlpha: 0.46,
              scale: 1.22,
              ease: "power2.in",
            }, 0.72);
        }

        const manifesto = select("#overview-story");
        const manifestoCopy = select(".manifesto-copy");
        const manifestoTitle = select(".manifesto-copy h2");
        const manifestoSteps = selectAll(".manifesto-steps article");
        if (manifesto && manifestoCopy) {
          gsap.fromTo(
            manifesto,
            {
              clipPath: "inset(12% 1.5% 0 1.5% round 54px)",
              scale: 0.975,
            },
            {
              clipPath: "inset(0% 0% 0 0% round 0px)",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: manifesto,
                start: "top 100%",
                end: "top 36%",
                scrub: 0.8,
              },
            },
          );

          gsap.timeline({
            scrollTrigger: {
              trigger: manifestoCopy,
              start: "top 78%",
              end: "center 45%",
              scrub: 0.75,
            },
          })
            .from(manifestoCopy.querySelector(".eyebrow"), {
              autoAlpha: 0,
              x: -70,
            }, 0)
            .from(manifestoCopy.querySelector("p"), {
              autoAlpha: 0,
              y: 55,
            }, 0.08)
            .from(manifestoTitle, {
              autoAlpha: 0,
              y: 110,
              scale: 0.82,
              clipPath: "inset(0 0 100% 0)",
              transformOrigin: "left bottom",
            }, 0.14)
            .from(manifestoSteps, {
              autoAlpha: 0,
              y: 75,
              stagger: 0.12,
            }, 0.45);
        }

        const basics = select("#basics");
        const basicsHeading = basics?.querySelector(".section-heading");
        const desktopStage = basics?.querySelector(".desktop-stage");
        revealHeading(basicsHeading, basics);
        if (desktopStage) {
          gsap.set(desktopStage, { transformPerspective: 1300, transformOrigin: "center top" });
          gsap.fromTo(
            desktopStage,
            {
              autoAlpha: 0.25,
              y: 150,
              scale: 0.84,
              rotateX: 9,
              clipPath: "inset(14% 9% 8% 9% round 56px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              clipPath: "inset(0% 0% 0% 0% round 34px)",
              ease: "none",
              scrollTrigger: {
                trigger: desktopStage,
                start: "top 92%",
                end: "top 30%",
                scrub: 0.9,
              },
            },
          );
          onceStagger(
            desktopStage,
            selectAll(".desktop-stage__sidebar button"),
            { x: -38, y: 0, stagger: 0.055 },
          );
          gsap.from(".composer-preview", {
            scale: 0.82,
            autoAlpha: 0,
            duration: 0.9,
            ease: "back.out(1.45)",
            scrollTrigger: {
              trigger: desktopStage,
              start: "top 56%",
              once: true,
            },
          });
          onceStagger(
            desktopStage.querySelector(".desktop-explanations"),
            selectAll(".desktop-explanations article"),
            { y: 28, stagger: 0.08 },
          );
        }

        const settingsStage = select("[data-settings-stage]");
        const settingsNav = select("[data-settings-nav]");
        const settingsNavItems = settingsNav
          ? Array.from(settingsNav.children)
          : [];
        const settingsPanels = selectAll("[data-settings-panel]");
        const settingsCards = selectAll("[data-settings-card]");
        if (settingsStage && settingsCards.length) {
          revealHeading(settingsStage.querySelector(".section-heading"), settingsStage);

          if (settingsPanels.length === 1 && !settingsPanels[0].matches("[data-settings-card]")) {
            gsap.fromTo(settingsPanels[0], {
              y: 70,
              scale: 0.94,
              autoAlpha: 0.45,
            }, {
              y: -34,
              scale: 1,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: settingsStage,
                start: "top 80%",
                end: "bottom 35%",
                scrub: 0.75,
              },
            });
          }

          const activateSettingsItem = (activeIndex) => {
            if (!settingsNavItems.length) return;
            gsap.to(settingsNavItems, {
              autoAlpha: 0.42,
              x: 0,
              color: "inherit",
              duration: 0.24,
              overwrite: "auto",
            });
            const active = settingsNavItems[Math.min(activeIndex, settingsNavItems.length - 1)];
            if (active) {
              gsap.to(active, {
                autoAlpha: 1,
                x: 10,
                color: "#0ae448",
                duration: 0.28,
                overwrite: "auto",
              });
            }
          };

          settingsCards.forEach((card, index) => {
            gsap.set(card, { transformPerspective: 1300, transformOrigin: "center top" });
            gsap.fromTo(card, {
              y: 105,
              z: -160,
              rotateX: 10,
              scale: 0.89,
              autoAlpha: 1,
              clipPath: "inset(12% 6% 10% 6% round 42px)",
            }, {
              y: 0,
              z: 0,
              rotateX: 0,
              scale: 1,
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "center 52%",
                scrub: 0.58,
                onEnter: () => activateSettingsItem(index),
                onEnterBack: () => activateSettingsItem(index),
              },
            });
          });
        }

        const capabilityViewport = select("[data-capability-viewport]");
        const capabilityTrack = select("[data-capability-track]");
        if (capabilityViewport && capabilityTrack) {
          const distance = () => Math.max(0, capabilityTrack.scrollWidth - window.innerWidth);
          const horizontalTween = gsap.to(capabilityTrack, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: capabilityViewport,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.68}`,
              pin: true,
              scrub: 0.72,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          selectAll(".capability-panel").forEach((panel, index) => {
            const elements = Array.from(panel.children);
            gsap.fromTo(
              elements,
              {
                autoAlpha: index === 0 ? 1 : 0.42,
                x: index === 0 ? 0 : 90,
                scale: index === 0 ? 1 : 0.92,
              },
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                ease: "none",
                stagger: 0.035,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 84%",
                  end: "center 58%",
                  scrub: 0.45,
                },
              },
            );
            animateKineticTitle(panel.querySelector("h2"), panel, {
              containerAnimation: horizontalTween,
              start: "left 82%",
            });
          });
        }

        const caseSection = select("#case");
        const caseHeading = caseSection?.querySelector(".section-heading");
        const roleRows = selectAll("[data-role-row]");
        const caseResult = select(".case-result");
        revealHeading(caseHeading, caseSection);
        if (caseSection && roleRows.length) {
          gsap.timeline({
            scrollTrigger: {
              trigger: select("[data-role-list]") || caseSection,
              start: "top 78%",
              end: "center 44%",
              scrub: 0.78,
            },
          })
            .from(roleRows, {
              x: (index) => (index % 2 ? 95 : -95),
              autoAlpha: 0,
              scale: 0.94,
              clipPath: (index) => index % 2
                ? "inset(0 0 0 100%)"
                : "inset(0 100% 0 0)",
              stagger: 0.1,
            }, 0)
            .from(caseResult, {
              x: 110,
              scale: 0.84,
              rotateY: -8,
              autoAlpha: 0,
              transformPerspective: 1200,
            }, 0.18);
        }

        const skillStage = select("[data-skill-stage]");
        const skillCopy = select(".skill-market-copy");
        const skillImageWrap = select(".skill-market-image-wrap");
        const skillImage = select("[data-skill-image]");
        if (skillStage && skillCopy && skillImageWrap) {
          gsap.timeline({
            scrollTrigger: {
              trigger: skillStage,
              start: "top 78%",
              end: "center 48%",
              scrub: 0.82,
            },
          })
            .from(skillCopy, {
              x: -110,
              autoAlpha: 0,
              clipPath: "inset(0 100% 0 0)",
            }, 0)
            .from(skillCopy.querySelectorAll("li"), {
              x: -42,
              autoAlpha: 0,
              stagger: 0.07,
            }, 0.22)
            .from(skillImageWrap, {
              x: 130,
              scale: 0.82,
              rotateY: -7,
              autoAlpha: 0,
              clipPath: "inset(8% 10% 8% 100% round 48px)",
              transformPerspective: 1400,
            }, 0.08);

          if (skillImage) {
            gsap.fromTo(
              skillImage,
              { yPercent: -2, scale: 1.03 },
              {
                yPercent: -15,
                scale: 1.11,
                ease: "none",
                scrollTrigger: {
                  trigger: skillStage,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              },
            );
          }
        }

        const labs = select("#labs");
        revealHeading(labs?.querySelector(".section-heading"), labs);
        const labDownloads = selectAll(".lab-downloads > *");
        onceStagger(select(".lab-downloads"), labDownloads, {
          y: 65,
          scale: 0.9,
          stagger: 0.07,
        });
        selectAll(".prompt-card").forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              x: index % 2 ? 105 : -105,
              y: 70,
              rotateY: index % 2 ? -7 : 7,
              scale: 0.9,
              autoAlpha: 0,
              clipPath: index % 2
                ? "inset(0 0 0 24% round 30px)"
                : "inset(0 24% 0 0 round 30px)",
              transformPerspective: 1200,
            },
            {
              x: 0,
              y: 0,
              rotateY: 0,
              scale: 1,
              autoAlpha: 1,
              clipPath: "inset(0 0% 0 0% round 22px)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                end: "top 48%",
                scrub: 0.66,
              },
            },
          );
        });

        const feishu = select(".feishu-section");
        const feishuCards = selectAll(".feishu-flow article");
        revealHeading(feishu?.querySelector(".section-heading"), feishu);
        if (feishu && feishuCards.length) {
          gsap.set(feishuCards, { transformPerspective: 1200, transformOrigin: "left center" });
          gsap.timeline({
            scrollTrigger: {
              trigger: select(".feishu-flow"),
              start: "top 85%",
              end: "center 45%",
              scrub: 0.74,
            },
          })
            .from(feishuCards, {
              rotateY: -48,
              x: -60,
              autoAlpha: 0,
              scale: 0.88,
              stagger: 0.11,
            })
            .from(feishu.querySelector(".outline-button"), {
              y: 35,
              autoAlpha: 0,
            }, "-=0.18");
        }

        const safety = select(".safety-section");
        const safetyTitle = select(".safety-title");
        const safetyRules = selectAll(".safety-rules article");
        if (safety && safetyTitle) {
          gsap.timeline({
            scrollTrigger: {
              trigger: safety,
              start: "top 78%",
              end: "center 48%",
              scrub: 0.8,
            },
          })
            .from(safetyTitle.querySelector("svg"), {
              rotate: -115,
              scale: 0.25,
              autoAlpha: 0,
            }, 0)
            .from(safetyTitle.querySelector("div"), {
              x: 82,
              autoAlpha: 0,
              clipPath: "inset(0 100% 0 0)",
            }, 0.05)
            .from(safetyRules, {
              y: 95,
              rotateX: 15,
              scale: 0.88,
              autoAlpha: 0,
              transformPerspective: 1100,
              stagger: 0.1,
            }, 0.18);
        }

        const learning = select(".learning-section");
        const learningCards = selectAll(".learning-path article");
        const resourceItems = selectAll(".resource-list > a");
        revealHeading(learning?.querySelector(".section-heading"), learning);
        if (learning && learningCards.length) {
          gsap.timeline({
            scrollTrigger: {
              trigger: select(".learning-path"),
              start: "top 84%",
              end: "center 43%",
              scrub: 0.72,
            },
          }).from(learningCards, {
            y: 125,
            z: -240,
            rotateX: 20,
            autoAlpha: 0,
            scale: 0.82,
            transformPerspective: 1250,
            stagger: 0.13,
          });
          onceStagger(select(".resource-list"), resourceItems, {
            x: 85,
            y: 0,
            clipPath: "inset(0 0 0 100%)",
            stagger: 0.075,
          });
        }

        const guides = select(".guide-library-section");
        const guideCopy = select(".guide-library-copy");
        const guideFiles = selectAll(".guide-file-list > a");
        if (guides && guideCopy) {
          gsap.timeline({
            scrollTrigger: {
              trigger: guides,
              start: "top 80%",
              end: "center 50%",
              scrub: 0.78,
            },
          })
            .from(guideCopy, {
              x: -110,
              autoAlpha: 0,
              scale: 0.9,
              clipPath: "inset(0 100% 0 0)",
            }, 0)
            .from(guideFiles, {
              x: 120,
              autoAlpha: 0,
              clipPath: "inset(0 0 0 100%)",
              stagger: 0.08,
            }, 0.1);
        }

      });

      media.add("(max-width: 899px)", () => {
        if (heroVisual) {
          gsap.to(heroVisual, {
            yPercent: 8,
            scale: 1.045,
            ease: "none",
            scrollTrigger: {
              trigger: "#overview",
              start: "top top",
              end: "bottom top",
              scrub: 0.55,
            },
          });
        }

        const mobileHeadings = selectAll(
          ".section-heading, .manifesto-copy, .skill-market-copy, .safety-title, .guide-library-copy",
        );
        mobileHeadings.forEach((heading) => revealHeading(heading, heading));

        const mobileGroups = [
          [".manifesto-steps", ".manifesto-steps article", { x: -32, y: 24 }],
          [".desktop-stage", ".desktop-stage__sidebar button, .desktop-explanations article", { y: 34 }],
          ["[data-settings-nav]", "[data-settings-nav] > *", { x: -30, y: 0 }],
          ["[data-settings-stage]", "[data-settings-card]", { y: 42, scale: 0.94 }],
          ["[data-role-list]", "[data-role-row]", { x: -42, y: 0 }],
          [".lab-downloads", ".lab-downloads > *", { y: 38, scale: 0.94 }],
          [".feishu-flow", ".feishu-flow article", { x: -38, y: 0 }],
          [".safety-rules", ".safety-rules article", { y: 42, scale: 0.94 }],
          [".learning-path", ".learning-path article", { y: 48, scale: 0.94 }],
          [".resource-list", ".resource-list > a", { x: 42, y: 0 }],
          [".guide-file-list", ".guide-file-list > a", { x: 42, y: 0 }],
        ];

        mobileGroups.forEach(([triggerSelector, targetSelector, vars]) => {
          onceStagger(select(triggerSelector), selectAll(targetSelector), {
            ...vars,
            duration: 0.7,
            stagger: 0.065,
          });
        });

        const desktopStage = select(".desktop-stage");
        if (desktopStage) {
          gsap.from(desktopStage, {
            y: 70,
            scale: 0.94,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: desktopStage,
              start: "top 88%",
              once: true,
            },
          });
        }

        selectAll(".capability-panel").forEach((panel, index) => {
          gsap.from(panel.children, {
            y: 46,
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.72,
            stagger: 0.055,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 86%",
              once: true,
            },
          });
          animateKineticTitle(panel.querySelector("h2"), panel, { start: "top 88%" });
        });

        const skillImageWrap = select(".skill-market-image-wrap");
        if (skillImageWrap) {
          gsap.from(skillImageWrap, {
            y: 70,
            scale: 0.91,
            autoAlpha: 0,
            clipPath: "inset(12% 0 0 0 round 30px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillImageWrap,
              start: "top 88%",
              once: true,
            },
          });
        }

        selectAll(".prompt-card").forEach((card, index) => {
          gsap.from(card, {
            x: index % 2 ? 32 : -32,
            y: 42,
            scale: 0.95,
            autoAlpha: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      imageListeners.forEach(([image, listener]) => {
        image.removeEventListener("load", listener);
        image.removeEventListener("error", listener);
      });
      refresh.cleanup();
      media?.revert();
      context.revert();
      restoreKineticTitles();
    };
  }, [rootRef]);
}
