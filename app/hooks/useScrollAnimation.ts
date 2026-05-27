"use client";
import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollAnimation
 *
 * Attaches an IntersectionObserver to animate elements into view as they
 * scroll into the viewport. Elements must have an "animate-section",
 * "project-card", "timeline-item", or "skill-item" class (or any class
 * listed in the `selectors` option) to be observed. When they cross the
 * threshold, the "animate-in" class is toggled on/off for a fade-in-out
 * scroll effect.
 *
 * @param fadeOut - if true, elements fade back out when they leave viewport
 */
export function useScrollAnimation(fadeOut = false) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(
    (container: HTMLElement | Document = document) => {
      const selectors = [
        ".animate-section",
        ".project-card",
        ".timeline-item",
        ".skill-item",
        ".animate-slide-left",
        ".animate-slide-right",
        ".animate-scale-in",
      ].join(", ");

      const elements =
        container instanceof Document
          ? document.querySelectorAll(selectors)
          : container.querySelectorAll(selectors);

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
            } else if (fadeOut) {
              entry.target.classList.remove("animate-in");
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -60px 0px",
        }
      );

      elements.forEach((el) => observerRef.current!.observe(el));
    },
    [fadeOut]
  );

  useEffect(() => {
    // Small delay so the DOM is fully painted
    const timer = setTimeout(() => observe(), 100);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [observe]);

  return { reObserve: observe };
}
