"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalLoadingScreenProps {
  onComplete: () => void;
}

interface LogHistoryItem {
  id: string;
  type: "prompt" | "input" | "print" | "log" | "neofetch" | "progress" | "success" | "ready";
  text?: string;
  color?: string;
  success?: boolean;
}

export default function TerminalLoadingScreen({ onComplete }: TerminalLoadingScreenProps) {
  const [history, setHistory] = useState<LogHistoryItem[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Keyboard shortcut to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleEnterSite = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const scrollToBottom = () => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, currentInput, currentPrompt, progress, showProgress]);

  // Run boot sequence
  useEffect(() => {
    let isMounted = true;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const addLog = (
      type: LogHistoryItem["type"],
      text?: string,
      success?: boolean,
      color?: string
    ) => {
      if (!isMounted) return;
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          type,
          text,
          success,
          color,
        },
      ]);
    };

    const typeCommand = async (prompt: string, command: string, speed = 40) => {
      if (!isMounted) return;
      setCurrentPrompt(prompt);
      setCurrentInput("");

      for (let i = 0; i <= command.length; i++) {
        if (!isMounted) return;
        setCurrentInput(command.substring(0, i));
        await wait(speed);
      }

      addLog("prompt", prompt);
      setHistory((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.type === "prompt") {
          return [
            ...prev.slice(0, -1),
            { ...last, type: "input", text: prompt + command },
          ];
        }
        return prev;
      });
      setCurrentPrompt("");
      setCurrentInput("");
    };

    const runSequence = async () => {
      await wait(100);

      // 1. SSH Connection
      await typeCommand("guest@jdsia.dev:~$ ", "ssh guest@jdsia.dev", 10);
      await wait(50);
      addLog("print", "Authorized access only.\nConnecting to node jdsia.dev... Established (SSHv2).", false, "text-[var(--text-secondary)]");
      await wait(80);

      // 2. Neofetch
      await typeCommand("guest@jdsia.dev:~$ ", "neofetch", 10);
      await wait(50);
      addLog("neofetch");
      await wait(120);

      // 3. Boot portfolio
      await typeCommand("guest@jdsia.dev:~$ ", "./boot_portfolio.sh", 8);
      await wait(50);

      const logs = [
        { text: "Initializing kernel bootstrap...", delay: 8 },
        { text: "Loading React 19.2 + Next.js client environments...", delay: 8 },
        { text: "Supabase connection... SUCCESS", success: true, delay: 10 },
        { text: "Loading projects...", delay: 10 },
        { text: "Mapping educational history & career parameters... OK", success: true, delay: 8 },
        { text: "oh yeahhh im employed...", success: true, delay: 8 },
        { text: "Mounting core portfolio components... DONE", success: true, delay: 10 },
      ];

      for (const log of logs) {
        if (!isMounted) return;
        addLog("log", log.text, log.success);
        await wait(log.delay);
      }

      await wait(50);

      // 4. Progress bar
      setShowProgress(true);
      for (let p = 0; p <= 100; p += 10) {
        if (!isMounted) return;
        setProgress(p);
        await wait(10);
      }
      await wait(50);
      addLog("success", "System operational. Environment successfully compiled.");
      await wait(50);

      // 5. Exit command
      await typeCommand("guest@jdsia.dev:~$ ", "exit", 10);
      await wait(50);
      addLog("print", "Connection to jdsia.dev closed.", false, "text-[var(--text-secondary)]");
      await wait(100);

      // Auto-enter the portfolio site without key confirmation
      handleEnterSite();
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  // Simple, ultra-clean ASCII chevron
  const asciiChevron = `    /\\
   /  \\
  /\\   \\
 /  \\   \\
/____\\___\\`;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#0a0a0b] text-[10px] md:text-xs select-none p-6 md:p-12 transition-all duration-700 ease-in-out ${isFading ? "opacity-0 scale-98 pointer-events-none" : "opacity-100 scale-100"
        }`}
      style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      {/* Scanline overlay for raw terminal aesthetic (very subtle) */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      {/* Top Status Header */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between text-[var(--text-secondary)] opacity-60 border-b border-[rgba(23,147,209,0.15)] pb-3 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
          {/*<span>JDSIA // TERMINAL_BOOT</span>*/}
        </div>
        <div className="flex items-center gap-4">
          <span>v3.4.12-lts</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="hover:text-[var(--primary)] border border-transparent hover:border-[rgba(23,147,209,0.3)] px-2 py-0.5 rounded transition-all duration-200"
          >
            [ESC] SKIP
          </button>
        </div>
      </div>

      {/* Fullscreen Terminal Output */}
      <div className="flex-1 w-full max-w-3xl mx-auto overflow-y-auto py-8 space-y-3.5 custom-scrollbar text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">

        {/* History Log */}
        {history.map((item) => {
          if (item.type === "input") {
            return (
              <div key={item.id} className="text-white font-semibold">
                {item.text}
              </div>
            );
          }
          if (item.type === "print") {
            return (
              <div key={item.id} className={`whitespace-pre-line leading-relaxed ${item.color || "text-[var(--foreground)]"}`}>
                {item.text}
              </div>
            );
          }
          if (item.type === "neofetch") {
            return (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-2 my-1.5 opacity-90">
                <div className="sm:col-span-3 text-[var(--primary)] font-bold whitespace-pre leading-4 flex items-center">
                  {asciiChevron}
                </div>
                <div className="sm:col-span-9 flex flex-col justify-center space-y-1 text-xs">
                  <div>
                    <span className="text-[var(--primary)] font-bold">jdsia</span>
                    <span className="text-white">@</span>
                    <span className="text-[var(--primary)] font-bold">ethan-sia</span>
                  </div>
                  <div className="text-white border-t border-[rgba(255,255,255,0.1)] w-28 h-[1px]" />
                  <div className="flex flex-col gap-0.5 text-[var(--on-surface-variant)]">
                    <div><span className="text-[var(--primary)] font-medium">OS:</span> Arch Linux x86_64</div>
                    <div><span className="text-[var(--primary)] font-medium">Kernel:</span> 6.8.9-arch1-jdsia</div>
                    <div><span className="text-[var(--primary)] font-medium">Shell:</span> bash 5.9</div>
                    <div><span className="text-[var(--primary)] font-medium">WM:</span> Hyprland</div>
                    <div><span className="text-[var(--primary)] font-medium">CPU:</span> LARP Core v4</div>
                    <div><span className="text-[var(--primary)] font-medium">Memory:</span> 10.4 GiB / 16.0 GiB (65%)</div>
                  </div>
                </div>
              </div>
            );
          }
          if (item.type === "log") {
            return (
              <div key={item.id} className="flex items-start space-x-2 text-[var(--on-surface-variant)] text-[10px] md:text-xs">
                <span className="text-[var(--primary)] select-none font-semibold">[ok]</span>
                <span className="flex-1 font-normal">{item.text}</span>
              </div>
            );
          }
          if (item.type === "success") {
            return (
              <div key={item.id} className="flex items-start space-x-2 text-green-400 font-normal my-1 text-[10px] md:text-xs">
                <span className="select-none font-semibold">[success]</span>
                <span className="flex-1">{item.text}</span>
              </div>
            );
          }
          return null;
        })}

        {/* Minimal Progress Bar */}
        {showProgress && (
          <div className="space-y-1.5 py-1 text-[10px] md:text-xs">
            <div className="flex justify-between text-[10px] text-[var(--primary)]">
              <span>Compiling modules...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded bg-[rgba(30,30,35,0.6)] overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Interactive Line */}
        {(currentPrompt || currentInput) && (
          <div className="text-white font-semibold flex items-center">
            <span>{currentPrompt}</span>
            <span>{currentInput}</span>
            {showCursor && (
              <span className="inline-block w-2 h-4 bg-[var(--primary)] ml-0.5 align-middle shadow-[0_0_8px_var(--primary)]" />
            )}
          </div>
        )}

        <div ref={logsEndRef} />
      </div>

      {/* Auto-entering status indicator */}
      <div className="w-full max-w-3xl mx-auto mt-4 pt-4 border-t border-[rgba(23,147,209,0.1)] flex items-center justify-between text-[var(--text-secondary)] opacity-40 text-[10px] tracking-wider select-none">
        <div>[ boot_sequence: complete ]</div>
        <div>[ redirecting_to_node ]</div>
      </div>

      {/* Tiny Escape instructions at footer */}
      <div className="w-full max-w-3xl mx-auto pt-6 text-center text-[var(--text-secondary)] opacity-40 text-[10px] tracking-wider select-none pointer-events-none">
        guest@jdsia:~$ exit
      </div>
    </div>
  );
}
