"use client";

import React, { useState, useEffect, useRef } from "react";

interface IntroAnimationProps {
  onComplete?: () => void;
  children: (props: {
    sidebarClass: string;
    contentClass: string;
  }) => React.ReactNode;
}

export default function IntroAnimation({ onComplete, children }: IntroAnimationProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const hasCompletedRef = useRef(false);

  const completeAnimation = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    if (onComplete) onComplete();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSkipped(true);
        setSidebarVisible(true);
        setContentVisible(true);
        completeAnimation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Snappy, instant slide-in on mount
    setSidebarVisible(true);
    setContentVisible(true);

    // Trigger completion after the slide transitions settle (500ms)
    const settleTimer = setTimeout(() => {
      completeAnimation();
    }, 500);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(settleTimer);
    };
  }, []);

  if (isSkipped) {
    return (
      <>
        {children({
          sidebarClass: "translate-x-0",
          contentClass: "translate-x-0 opacity-100",
        })}
      </>
    );
  }

  // Sidebar transition: cubic-bezier(0.22, 1, 0.36, 1) ease-out, 500ms
  const sidebarClass = sidebarVisible
    ? "transform translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    : "transform -translate-x-full";

  // Main content transition: translate-x(20px) -> translate-x(0), opacity: 0 -> 1, 400ms duration
  const contentClass = contentVisible
    ? "transform translate-x-0 opacity-100 transition-all duration-400 ease-out"
    : "transform translate-x-[20px] opacity-0";

  return (
    <>
      {children({
        sidebarClass,
        contentClass,
      })}
    </>
  );
}
