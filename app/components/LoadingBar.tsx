"use client";

import React, { useState, useEffect } from "react";

interface LoadingBarProps {
  onComplete: () => void;
}

export default function LoadingBar({ onComplete }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("Initializing...");
  const [isFading, setIsFading] = useState(false);

  const labels = [
    { threshold: 0, text: "Initializing..." },
    { threshold: 20, text: "Loading modules..." },
    { threshold: 45, text: "Fetching projects..." },
    { threshold: 65, text: "Compiling assets..." },
    { threshold: 85, text: "Almost ready..." },
    { threshold: 98, text: "Done." },
  ];

  // Keyboard shortcut to skip
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        triggerComplete();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const triggerComplete = () => {
    setIsFading(true);
    setTimeout(onComplete, 600);
  };

  // Progress animation
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 2200; // ms total

    // Easing: fast start, slow near end
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = ease(raw);
      const p = Math.round(eased * 100);

      setProgress(p);

      // Update label based on progress
      for (let i = labels.length - 1; i >= 0; i--) {
        if (p >= labels[i].threshold) {
          setLabel(labels[i].text);
          break;
        }
      }

      if (raw < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // Brief pause at 100% before dismissing
        setTimeout(triggerComplete, 400);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b] select-none transition-all duration-600 ease-in-out ${isFading ? "opacity-0 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
        }`}
    >
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-sm px-8 flex flex-col gap-6">

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          {/* Track */}
          <div className="w-full h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, rgba(23,147,209,0.6) 0%, #1793d1 100%)",
                boxShadow: "0 0 8px rgba(23,147,209,0.5)",
                transition: "width 0.05s linear",
              }}
            />
          </div>

          {/* Labels row */}
          <div
            className="flex items-center justify-between text-[10px] tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              color: "var(--text-secondary)",
            }}
          >
            <span className="transition-all duration-300">{label}</span>
            <span style={{ color: "var(--primary)", fontVariantNumeric: "tabular-nums" }}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Skip hint */}
        <div className="flex justify-center">
          <button
            onClick={triggerComplete}
            className="text-[10px] tracking-widest uppercase border border-transparent hover:border-[rgba(23,147,209,0.25)] hover:text-[var(--primary)] px-3 py-1.5 rounded transition-all duration-200"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              color: "var(--text-secondary)",
              opacity: 0.5,
            }}
          >
            [esc] skip
          </button>
        </div>
      </div>
    </div>
  );
}
