"use client";

import React, { useState, useEffect } from "react";

interface LoadingBarProps {
  onComplete: () => void;
}

export default function LoadingBar({ onComplete }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const triggerComplete = () => {
    setIsFading(true);
    setTimeout(onComplete, 600);
  };

  // Progress animation
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 800; // ms total

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(elapsed / duration, 1);
      const p = Math.round(raw * 100);

      setProgress(p);

      if (raw < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // Brief pause at 100% before dismissing
        setTimeout(triggerComplete, 150);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none transition-all duration-600 ease-in-out ${isFading ? "opacity-0 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
        }`}
      style={{ backgroundColor: "var(--background)", fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      {/* Loading bar */}
      <div className="relative z-20 w-full max-w-sm px-8">
        {/* Text and percentage */}
        <div className="mb-4 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] opacity-70">
            {progress === 100 ? "ready" : "loading"}
          </p>
          <p className="text-xs font-medium text-[var(--primary)] mt-1">{progress}%</p>
        </div>

        {/* Track */}
        <div className="w-full h-[2px] bg-[rgba(235,219,178,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, rgba(131,165,152,0.6) 0%, var(--primary) 100%)",
              boxShadow: "0 0 8px rgba(131,165,152,0.5)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
