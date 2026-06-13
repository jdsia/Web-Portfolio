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
  // splash → wipe-in (curtain covers) → wipe-out (curtain reveals site) → done
  const [phase, setPhase] = useState<"splash" | "wipe-in" | "wipe-out" | "done">("splash");
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

    // Phase 1: black curtain sweeps down covering the splash
    setPhase("wipe-in");

    // Phase 2: after curtain fully covers, hide splash, start revealing site
    setTimeout(() => {
      // Reset scroll position so the about section (first section) is visible
      const container = document.querySelector<HTMLElement>(".snap-container");
      if (container) container.scrollTop = 0;
      setPhase("wipe-out");
    }, 500);

    // Phase 3: curtain exits, site is visible, fire complete
    setTimeout(() => {
      setPhase("done");
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (onComplete) onComplete();
      }
    }, 1100);
  }, [onComplete]);

  // Auto-dismiss on mobile after 3 seconds
  useEffect(() => {
    if (phase !== "splash") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const autoTimer = setTimeout(() => triggerReveal(), 3000);
    return () => clearTimeout(autoTimer);
  }, [phase, triggerReveal]);

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

  // Block scroll snap wheel events during wipe animation
  useEffect(() => {
    if (phase === "splash" || phase === "done") return;

    const blockWheel = (e: WheelEvent) => e.preventDefault();
    window.addEventListener("wheel", blockWheel, { passive: false });
    return () => window.removeEventListener("wheel", blockWheel);
  }, [phase]);

  const showSite = phase === "wipe-out" || phase === "done";

  const sidebarClass = showSite
    ? "transform translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    : "transform -translate-x-full transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  const contentClass = showSite
    ? "transform translate-x-0 opacity-100 transition-all duration-[600ms] ease-out delay-[80ms]"
    : "transform translate-x-[20px] opacity-0 transition-all duration-[600ms] ease-out";

  // Curtain position: off-screen top → covers screen → off-screen bottom
  let curtainTransform = "translateY(-100%)"; // hidden above
  if (phase === "wipe-in") curtainTransform = "translateY(0%)";     // covering screen
  if (phase === "wipe-out") curtainTransform = "translateY(100%)";  // exiting below
  if (phase === "done") curtainTransform = "translateY(100%)";

  const showSplash = phase === "splash" || phase === "wipe-in";

  return (
    <>
      {/* Children always in DOM */}
      {children({ sidebarClass, contentClass })}

      {/* Splash screen — behind curtain */}
      {showSplash && (
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
      )}

      {/* Black wipe curtain — sits above everything */}
      {phase !== "done" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            backgroundColor: "#000000",
            transform: curtainTransform,
            transition:
              phase === "splash"
                ? "none"
                : "transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)",
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}
