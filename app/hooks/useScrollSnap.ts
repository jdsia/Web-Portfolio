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
      const from = container.scrollTop;
      const delta = to - from;
      if (Math.abs(delta) < 1) return;

      isAnimating.current = true;
      const start = performance.now();

      function step(now: number) {
        if (!container) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        container.scrollTop = from + delta * easeInOut(progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          container.scrollTop = to;
          isAnimating.current = false;
        }
      }

      requestAnimationFrame(step);
    }

    function getNearestSection(direction: "up" | "down"): number {
      if (!container) return 0;
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>(sectionSelector)
      );
      const current = container.scrollTop;

      if (direction === "down") {
        const next = sections.find((s) => s.offsetTop > current + 10);
        return next ? next.offsetTop : sections[sections.length - 1].offsetTop;
      } else {
        const candidates = sections.filter((s) => s.offsetTop < current - 10);
        return candidates.length > 0
          ? candidates[candidates.length - 1].offsetTop
          : 0;
      }
    }

    function onWheel(e: WheelEvent) {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < threshold) return;
      e.preventDefault();
      animateTo(getNearestSection(e.deltaY > 0 ? "down" : "up"));
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [containerSelector, sectionSelector, duration, threshold]);
}
