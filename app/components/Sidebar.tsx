"use client";
import { useState } from "react";

function FileIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function FolderIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d={open
        ? "M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5z"
        : "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"} />
    </svg>
  );
}

import AsciiScrambler from "./AsciiScrambler";

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  theme: "minimal-light" | "minimal-dark";
  onToggleTheme: () => void;
  isLoaded: boolean;
}

export default function Sidebar({ activeSection, onNavigate, theme, onToggleTheme, isLoaded }: SidebarProps) {
  const [open, setOpen] = useState({ experience: true, projects: true });

  const border = "var(--card-border)";

  const toggle = (key: keyof typeof open) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  // Dynamic VS Code Tree Row class builder matching user design exactly
  const getRowClass = (section: string) => {
    const isActive = activeSection === section;
    return `flex items-center gap-2 px-3 py-1.5 mx-2 rounded text-[13px] font-mono select-none cursor-pointer transition-all duration-150 ${isActive
      ? "text-[var(--foreground)] bg-[var(--btn-secondary-bg)] border border-[var(--card-border)] font-medium opacity-100"
      : "text-[var(--text-secondary)] border border-transparent hover:bg-[var(--btn-secondary-bg)] opacity-75 hover:opacity-100"
      }`;
  };

  const getChildClass = (parentSection: string) => {
    const isParentActive = activeSection === parentSection;
    return `flex items-center gap-2 pl-8 pr-3 py-1.5 mx-2 rounded text-[13px] font-mono select-none cursor-pointer border border-transparent transition-all duration-150 ${isParentActive
      ? "text-[var(--foreground)] font-medium opacity-100"
      : "text-[var(--text-secondary)] opacity-65 hover:opacity-100"
      }`;
  };

  const accentColor = "var(--primary)";
  const mutedColor = "var(--text-secondary)";
  const dimmedColor = "var(--text-dimmed)";

  return (
    <aside
      className="fixed right-0 top-0 h-screen flex flex-col border-l overflow-y-auto"
      style={{ width: "300px", backgroundColor: "var(--background)", borderColor: border }}
    >
      <nav className="flex-1 py-6 select-none space-y-1">
        <div className={getRowClass("theme-toggle")} onClick={onToggleTheme}>
          <FileIcon color={mutedColor} />
          <AsciiScrambler text={theme === "minimal-dark" ? "lightmode.sh" : "darkmode.sh"} isLoaded={isLoaded} delay={50} speed={30} resolveCount={1} />
        </div>
        <div className={getRowClass("home")} onClick={() => onNavigate("home")}>
          <FileIcon color={activeSection === "home" ? accentColor : mutedColor} />
          <AsciiScrambler text="home.md" isLoaded={isLoaded} delay={100} speed={30} resolveCount={1} />
        </div>

        <div className={getRowClass("about")} onClick={() => onNavigate("about")}>
          <FileIcon color={activeSection === "about" ? accentColor : mutedColor} />
          <AsciiScrambler text="about.md" isLoaded={isLoaded} delay={150} speed={30} resolveCount={1} />
        </div>

        <div className={getRowClass("education")} onClick={() => onNavigate("education")}>
          <FileIcon color={activeSection === "education" ? accentColor : mutedColor} />
          <AsciiScrambler text="education.md" isLoaded={isLoaded} delay={200} speed={30} resolveCount={1} />
        </div>

        <div className={getRowClass("skills")} onClick={() => onNavigate("skills")}>
          <FileIcon color={activeSection === "skills" ? accentColor : mutedColor} />
          <AsciiScrambler text="skills.md" isLoaded={isLoaded} delay={250} speed={30} resolveCount={1} />
        </div>

        <div className={getRowClass("experience")} onClick={() => toggle("experience")}>
          <FolderIcon open={open.experience} color={activeSection === "experience" ? accentColor : mutedColor} />
          <AsciiScrambler text="experience" isLoaded={isLoaded} delay={300} speed={30} resolveCount={1} />
        </div>
        {open.experience && (
          <>
            <div className={getChildClass("experience")} onClick={() => onNavigate("experience")}>
              <FileIcon color={activeSection === "experience" ? accentColor : mutedColor} />
              <AsciiScrambler text="stackform.md" isLoaded={isLoaded} delay={350} speed={30} resolveCount={1} />
            </div>
            <div className={getChildClass("experience")} onClick={() => onNavigate("experience")}>
              <FileIcon color={activeSection === "experience" ? accentColor : mutedColor} />
              <AsciiScrambler text="gdgoc-dlsu.md" isLoaded={isLoaded} delay={400} speed={30} resolveCount={1} />
            </div>
            <div className={getChildClass("experience")} onClick={() => onNavigate("experience")}>
              <FileIcon color={activeSection === "experience" ? accentColor : mutedColor} />
              <AsciiScrambler text="dlsu-futsal.md" isLoaded={isLoaded} delay={450} speed={30} resolveCount={1} />
            </div>
          </>
        )}

        <div className={getRowClass("projects")} onClick={() => toggle("projects")}>
          <FolderIcon open={open.projects} color={activeSection === "projects" ? accentColor : mutedColor} />
          <AsciiScrambler text="projects" isLoaded={isLoaded} delay={500} speed={30} resolveCount={1} />
        </div>
        {open.projects && (
          <>
            <div className={getChildClass("projects")} onClick={() => onNavigate("projects")}>
              <FileIcon color={activeSection === "projects" ? accentColor : mutedColor} />
              <AsciiScrambler text="akyat.md" isLoaded={isLoaded} delay={550} speed={30} resolveCount={1} />
            </div>
            <div className={getChildClass("projects")} onClick={() => onNavigate("projects")}>
              <FileIcon color={activeSection === "projects" ? accentColor : mutedColor} />
              <AsciiScrambler text="flood-pipeline.md" isLoaded={isLoaded} delay={600} speed={30} resolveCount={1} />
            </div>
          </>
        )}

        <div className={getRowClass("connect")} onClick={() => onNavigate("connect")}>
          <FileIcon color={activeSection === "connect" ? accentColor : mutedColor} />
          <AsciiScrambler text="connect.md" isLoaded={isLoaded} delay={650} speed={30} resolveCount={1} />
        </div>

      </nav>
    </aside>
  );
}
