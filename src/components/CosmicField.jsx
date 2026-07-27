import { useRef, useLayoutEffect } from "react";

/**
 * CosmicField
 * A decorative, additive Canvas 2D particle layer for a dark-space hero.
 * Three tasteful layers — twinkling starfield, drifting dust motes, and a
 * handful of orbital "流光" energy sparks with fading trails — composited with
 * 'lighter' over a transparent canvas so the underlying image shows through.
 *
 * Meant to be absolutely positioned to fill its parent:
 *   .cosmic-field { position:absolute; inset:0; }
 * with the parent being position:relative.
 */

// Accent palette (matches the finance-green / ice-blue / soft-violet theme).
const GREEN = "143, 211, 107"; // #8fd36b-ish green (finance green #33d46b family)
const GREEN_STRONG = "51, 212, 107"; // #33d46b
const ICE = "143, 211, 240"; // #8fd3f0
const VIOLET = "201, 182, 255"; // #c9b6ff
const WHITE = "255, 255, 255";

export function CosmicField({ className }) {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- state shared across resizes / frames ----
    let width = 0; // CSS pixels
    let height = 0; // CSS pixels
    let dpr = 1;
    let stars = [];
    let dust = [];
    let sparks = [];
    let rafId = null;
    let running = false;
    let onScreen = true;
    let pageVisible =
      typeof document === "undefined" || document.visibilityState !== "hidden";
    let lastTime = 0;

    const rand = (min, max) => min + Math.random() * (max - min);

    // Weight a horizontal position toward the RIGHT ~65% (crystal core).
    // Bias ~65% of picks into the right band, the rest spread everywhere.
    const biasedX = () =>
      Math.random() < 0.65 ? rand(0.4, 1) * width : rand(0, 1) * width;

    // ---- build the particle sets from current dimensions ----
    function seedParticles() {
      const area = width * height;
      // scale star count with area, clamped to the requested 90–130 band
      const starCount = Math.max(90, Math.min(130, Math.round(area / 9000)));
      const dustCount = 35;
      const sparkCount = 8;

      stars = new Array(starCount).fill(0).map(() => {
        const roll = Math.random();
        let color = WHITE;
        if (roll < 0.08) color = GREEN;
        else if (roll < 0.15) color = VIOLET;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: rand(0.4, 1.4),
          color,
          base: rand(0.25, 0.6), // baseline opacity
          amp: rand(0.15, 0.35), // twinkle amplitude
          phase: rand(0, Math.PI * 2),
          twSpeed: rand(0.4, 1.2), // twinkle speed
          driftX: rand(-2, 2), // px/sec, very subtle
          driftY: rand(-2, 2),
        };
      });

      dust = new Array(dustCount).fill(0).map(() => {
        const roll = Math.random();
        let color = WHITE;
        if (roll < 0.35) color = ICE;
        else if (roll < 0.55) color = GREEN;
        else if (roll < 0.7) color = VIOLET;
        return {
          x: biasedX(),
          y: Math.random() * height,
          r: rand(1, 2.5),
          color,
          alpha: rand(0.12, 0.32),
          vx: rand(-6, 6), // px/sec parallax drift
          vy: rand(-8, -2),
          wobPhase: rand(0, Math.PI * 2),
          wobSpeed: rand(0.3, 0.8),
          wobAmp: rand(2, 7),
        };
      });

      const sparkColors = [GREEN_STRONG, ICE, VIOLET, WHITE];
      sparks = new Array(sparkCount).fill(0).map((_, i) => {
        // slow parametric ellipse, centers weighted toward the right core
        const cx = rand(0.45, 0.95) * width;
        const cy = rand(0.15, 0.85) * height;
        const rx = rand(width * 0.05, width * 0.16);
        const ry = rand(height * 0.05, height * 0.16);
        return {
          cx,
          cy,
          rx,
          ry,
          color: sparkColors[i % sparkColors.length],
          angle: rand(0, Math.PI * 2),
          angSpeed: rand(0.12, 0.28) * (Math.random() < 0.5 ? 1 : -1), // rad/sec
          r: rand(1.2, 2.2),
          alpha: rand(0.45, 0.7),
          trail: [], // recent {x,y} points for the fading streak
        };
      });
    }

    // draw a soft radial glow dot
    function drawGlow(x, y, r, color, alpha) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      g.addColorStop(0, `rgba(${color}, ${alpha})`);
      g.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    function sparkPosition(s) {
      return {
        x: s.cx + Math.cos(s.angle) * s.rx,
        y: s.cy + Math.sin(s.angle) * s.ry,
      };
    }

    // Render stars + dust for a given time; used by both the loop and the
    // single reduced-motion frame.
    function renderStaticLayers(t) {
      // Starfield
      for (const st of stars) {
        const tw = st.base + st.amp * Math.sin(t * st.twSpeed + st.phase);
        const a = Math.max(0, Math.min(0.75, tw));
        if (a <= 0) continue;
        ctx.fillStyle = `rgba(${st.color}, ${a})`;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Dust motes (soft glow)
      for (const d of dust) {
        const wob = Math.sin(t * d.wobSpeed + d.wobPhase) * d.wobAmp;
        drawGlow(d.x + wob, d.y, d.r, d.color, d.alpha);
      }
    }

    function drawFrame(t, dt) {
      // Fully transparent clear — never paint a background.
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // update subtle star drift
      for (const st of stars) {
        st.x += st.driftX * dt;
        st.y += st.driftY * dt;
        if (st.x < 0) st.x += width;
        else if (st.x > width) st.x -= width;
        if (st.y < 0) st.y += height;
        else if (st.y > height) st.y -= height;
      }

      // advance dust + wrap around edges
      for (const d of dust) {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        const pad = d.r * 3;
        if (d.x < -pad) d.x = width + pad;
        else if (d.x > width + pad) d.x = -pad;
        if (d.y < -pad) d.y = height + pad;
        else if (d.y > height + pad) d.y = -pad;
      }

      renderStaticLayers(t);

      // Energy sparks: advance along ellipse, keep a short trail.
      for (const s of sparks) {
        s.angle += s.angSpeed * dt;
        const p = sparkPosition(s);
        s.trail.push(p);
        if (s.trail.length > 10) s.trail.shift();

        // fading trailing segments
        for (let i = 0; i < s.trail.length - 1; i++) {
          const p0 = s.trail[i];
          const p1 = s.trail[i + 1];
          const a = (i / s.trail.length) * s.alpha * 0.6;
          ctx.strokeStyle = `rgba(${s.color}, ${a})`;
          ctx.lineWidth = s.r * (0.5 + i / s.trail.length);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        // bright head with glow
        drawGlow(p.x, p.y, s.r, s.color, s.alpha);
        ctx.fillStyle = `rgba(${s.color}, ${Math.min(1, s.alpha + 0.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, s.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop(now) {
      if (!running) return;
      const t = now / 1000;
      let dt = lastTime ? (now - lastTime) / 1000 : 0;
      lastTime = now;
      // clamp dt to avoid large jumps after a pause
      if (dt > 0.05) dt = 0.05;
      drawFrame(t, dt);
      rafId = window.requestAnimationFrame(loop);
    }

    function start() {
      if (reduceMotion) return; // static only
      if (running) return;
      if (!onScreen || !pageVisible) return;
      if (width === 0 || height === 0) return;
      running = true;
      lastTime = 0;
      rafId = window.requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    // measure parent / self and (re)configure the backing store
    function resize() {
      const parent = canvas.parentElement;
      const w = canvas.clientWidth || (parent ? parent.clientWidth : 0);
      const h = canvas.clientHeight || (parent ? parent.clientHeight : 0);
      if (w === 0 || h === 0) {
        // zero-size: pause and wait for a real size
        stop();
        width = 0;
        height = 0;
        return;
      }
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = w;
      height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // draw in CSS pixel space
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seedParticles();

      if (reduceMotion) {
        // exactly one static frame: stars + dust, no sparks / no loop
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = "lighter";
        renderStaticLayers(0);
      } else {
        stop();
        start();
      }
    }

    // ---- observers & listeners ----
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    let intersectionObserver = null;
    if (typeof IntersectionObserver === "function") {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            onScreen = entry.isIntersecting;
          }
          if (onScreen && pageVisible) start();
          else stop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);
    }

    const onVisibility = () => {
      pageVisible = document.visibilityState !== "hidden";
      if (pageVisible && onScreen) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // initial sizing (ResizeObserver also fires once, but do it eagerly)
    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
