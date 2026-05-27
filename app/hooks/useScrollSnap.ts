import { useEffect, useRef } from "react";

/**
 * useScrollSnap
 *
 * Replaces CSS scroll-snap with a fully JS-driven implementation so we
 * can control the animation duration and easing independently of the
 * browser's built-in snap speed (which has no configurable duration).
 *
 * On desktop (≥768px) it intercepts wheel + touch events, prevents
 * native scrolling, and animates the container to the nearest section
 * boundary using requestAnimationFrame + a cubic-bezier easing.
 *
 * On mobile the hook is inactive and native scrolling is untouched.
 */

// Cubic-bezier ease-in-out (matches CSS ease-in-out)
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

interface UseScrollSnapOptions {
  /** CSS selector for the scrollable container */
  containerSelector: string;
  /** CSS selector for each snap section */
  sectionSelector: string;
  /** Animation duration in milliseconds (default: 900) */
  duration?: number;
  /** Minimum pixel delta before a snap is triggered (default: 30) */
  threshold?: number;
}

export function useScrollSnap({
  containerSelector,
  sectionSelector,
  duration = 900,
  threshold = 30,
}: UseScrollSnapOptions) {
  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    // Only activate on desktop
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) return;

    /** Animate container.scrollTop from `from` to `to` over `duration` ms */
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
          container.scrollTop = to; // ensure exact landing
          isAnimating.current = false;
        }
      }

      requestAnimationFrame(step);
    }

    /** Return the scrollTop of the section closest to current scroll position */
    function getNearestSection(direction: "up" | "down"): number {
      if (!container) return 0;
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>(sectionSelector)
      );
      const current = container.scrollTop;

      if (direction === "down") {
        // Find first section whose top is strictly greater than current
        const next = sections.find((s) => s.offsetTop > current + 10);
        return next ? next.offsetTop : sections[sections.length - 1].offsetTop;
      } else {
        // Find last section whose top is strictly less than current
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
      const direction = e.deltaY > 0 ? "down" : "up";
      animateTo(getNearestSection(direction));
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      if (touchStartY.current === null) return;
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(dy) < threshold) return;
      e.preventDefault();
      const direction = dy > 0 ? "down" : "up";
      animateTo(getNearestSection(direction));
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [containerSelector, sectionSelector, duration, threshold]);
}
