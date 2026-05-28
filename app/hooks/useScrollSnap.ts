import { useEffect, useRef } from "react";

/**
 * useScrollSnap
 *
 * JS-driven scroll snap for desktop only. Intercepts `wheel` events on
 * screens ≥768px and animates the container to the nearest section with
 * a configurable duration + cubic-bezier easing.
 *
 * Touch / mobile is intentionally untouched — users get completely free
 * native scrolling on any touch-primary device.
 */

// Cubic-bezier ease-in-out
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

interface UseScrollSnapOptions {
  containerSelector: string;
  sectionSelector: string;
  /** Animation duration in ms (default: 700) */
  duration?: number;
  /** Minimum deltaY before a snap is triggered (default: 30) */
  threshold?: number;
}

export function useScrollSnap({
  containerSelector,
  sectionSelector,
  duration = 700,
  threshold = 30,
}: UseScrollSnapOptions) {
  const isAnimating = useRef(false);

  useEffect(() => {
    // Desktop only — leave touch devices alone entirely
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) return;

    function animateTo(to: number) {
      if (!container) return;
      const from = container.scrollLeft;
      const delta = to - from;
      if (Math.abs(delta) < 1) return;

      isAnimating.current = true;
      const start = performance.now();

      function step(now: number) {
        if (!container) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        container.scrollLeft = from + delta * easeInOut(progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          container.scrollLeft = to;
          isAnimating.current = false;
        }
      }

      requestAnimationFrame(step);
    }

    function getNearestSection(direction: "left" | "right"): number {
      if (!container) return 0;
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>(sectionSelector)
      );
      const current = container.scrollLeft;
      const W = window.innerWidth - 300; // Fixed width of each section on desktop

      // Map each section to its mathematically constant scroll position
      const offsets = sections.map((_, i) => i * W);

      if (direction === "right") {
        const nextOffset = offsets.find((offset) => offset > current + 10);
        return nextOffset !== undefined ? nextOffset : offsets[offsets.length - 1];
      } else {
        const candidates = offsets.filter((offset) => offset < current - 10);
        return candidates.length > 0
          ? candidates[candidates.length - 1]
          : 0;
      }
    }

    function onWheel(e: WheelEvent) {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      // On vertical scrolling mouse/trackpad, deltaY is the primary scroll delta.
      // We want to map deltaY to horizontal scroll. If deltaX is also present, we handle it too.
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < threshold) return;
      e.preventDefault();
      animateTo(getNearestSection(delta > 0 ? "right" : "left"));
    }

    function onKeyDown(e: KeyboardEvent) {
      // Ignore if focus is inside an input/textarea so typing still works
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const isRight = e.key === "j" || e.key === "ArrowRight";
      const isLeft = e.key === "k" || e.key === "ArrowLeft";
      if (!isRight && !isLeft) return;
      if (isAnimating.current) return;
      e.preventDefault();
      animateTo(getNearestSection(isRight ? "right" : "left"));
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [containerSelector, sectionSelector, duration, threshold]);
}
