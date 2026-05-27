"use client";

import React, { useState, useEffect } from "react";

interface LoadingBarProps {
  onComplete: () => void;
}

export default function LoadingBar({ onComplete }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let current = 0;

    // Fast, ultra-smooth premium top loading line (500ms total duration)
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 400); // Trigger completion state transition
        }, 150);
      }
      setProgress(Math.round(current));
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] transition-opacity duration-300 pointer-events-none"
      style={{
        opacity: isFading ? 0 : 1,
        height: "3px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <div
        className="h-full transition-all duration-75 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, var(--btn-secondary-border) 0%, var(--primary) 100%)",
          boxShadow: "0 0 10px var(--primary), 0 0 5px var(--primary)",
        }}
      />
    </div>
  );
}
