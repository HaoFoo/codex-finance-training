import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCourseAnimations(rootRef) {
  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set("[data-reveal], [data-hero-copy] > *, [data-role-row]", {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-nav]", { y: -22, opacity: 0, duration: 0.7 })
        .from("[data-hero-copy] > *", {
          y: 44,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
        }, "-=0.35")
        .from("[data-hero-visual]", {
          x: 90,
          opacity: 0,
          scale: 0.96,
          duration: 1.25,
        }, "-=0.8");

      gsap.to("[data-hero-visual]", {
        yPercent: 8,
        scale: 1.055,
        ease: "none",
        scrollTrigger: {
          trigger: "#overview",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-scroll-progress]", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray("[data-stagger]").forEach((container) => {
        gsap.from(container.children, {
          y: 34,
          opacity: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.from("[data-role-row]", {
        x: (index) => (index % 2 === 0 ? -50 : 50),
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-role-list]",
          start: "top 78%",
          once: true,
        },
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 900px)", () => {
        const viewport = document.querySelector("[data-capability-viewport]");
        const track = document.querySelector("[data-capability-track]");
        if (!viewport || !track) return undefined;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.55}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        return () => tween.kill();
      });

      gsap.to("[data-skill-image]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-skill-stage]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [rootRef]);
}

