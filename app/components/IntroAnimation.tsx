"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface IntroAnimationProps {
  onComplete?: () => void;
  children: (props: {
    sidebarClass: string;
    contentClass: string;
  }) => React.ReactNode;
}

export default function IntroAnimation({ onComplete, children }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"splash" | "transitioning" | "done">("splash");
  const [splashTextVisible, setSplashTextVisible] = useState(false);
  const hasTriggeredRef = useRef(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setSplashTextVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const triggerReveal = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setPhase("transitioning");

    setTimeout(() => {
      setPhase("done");
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (onComplete) onComplete();
      }
    }, 850);
  }, [onComplete]);

  // Splash-phase input listeners
  useEffect(() => {
    if (phase !== "splash") return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 10) triggerReveal();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY - e.touches[0].clientY > 25) triggerReveal();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "j", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        triggerReveal();
      }
    };

    // Click/tap to dismiss on mobile
    const onClick = () => triggerReveal();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
    };
  }, [phase, triggerReveal]);

  const showSite = phase === "transitioning" || phase === "done";

  const sidebarClass = showSite
    ? "transform translate-x-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    : "transform -translate-x-full transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  const contentClass = showSite
    ? "transform translate-x-0 opacity-100 transition-all duration-[700ms] ease-out delay-[100ms]"
    : "transform translate-x-[20px] opacity-0 transition-all duration-[700ms] ease-out";

  return (
    <>
      {/* Children always in DOM so scroll-snap hook stays attached */}
      {children({ sidebarClass, contentClass })}

      {/* Splash overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          backgroundColor: "var(--background)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase === "splash" ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: phase === "splash" ? "auto" : "none",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--foreground)",
            letterSpacing: "0.04em",
            marginBottom: "1.2rem",
            opacity: splashTextVisible ? 1 : 0,
            transform: splashTextVisible ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          ethan sia
        </h1>
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            fontWeight: 400,
            color: "var(--on-surface-variant)",
            letterSpacing: "0.08em",
            opacity: splashTextVisible ? 0.7 : 0,
            transform: splashTextVisible ? "translateY(0)" : "translateY(12px)",
            transition:
              "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.15s",
          }}
        >
          CS @ DLSU.
        </p>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: splashTextVisible ? 0.3 : 0,
            transition: "opacity 1.2s ease 0.9s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--foreground)",
            }}
          >
            scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            style={{ animation: "splashBounce 2s ease-in-out infinite" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
