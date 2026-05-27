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

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  theme: "minimal-light" | "minimal-dark";
  onToggleTheme: () => void;
}

export default function Sidebar({ activeSection, onNavigate, theme, onToggleTheme }: SidebarProps) {
  const [open, setOpen] = useState({ experience: true, projects: true });

  const border = "var(--card-border)";

  const toggle = (key: keyof typeof open) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  // Dynamic VS Code Tree Row class builder matching user design exactly
  const getRowClass = (section: string) => {
    const isActive = activeSection === section;
    return `flex items-center gap-2 px-3 py-1.5 mx-2 rounded text-[13px] font-mono select-none cursor-pointer transition-all duration-150 ${
      isActive 
        ? "text-[var(--foreground)] bg-[var(--btn-secondary-bg)] border border-[var(--card-border)] font-medium" 
        : "text-[var(--text-secondary)] border border-transparent hover:bg-[var(--btn-secondary-bg)] hover:opacity-90"
    }`;
  };

  const getChildClass = () => {
    return `flex items-center gap-2 pl-8 pr-3 py-1.5 mx-2 rounded text-[13px] font-mono select-none cursor-pointer border border-transparent text-[var(--text-dimmed)] hover:bg-[var(--btn-secondary-bg)] hover:opacity-90 transition-all duration-150`;
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
        <div className={getRowClass("home")} onClick={() => onNavigate("home")}>
          <FileIcon color={activeSection === "home" ? accentColor : mutedColor} />
          home.tsx
        </div>

        <div className={getRowClass("about")} onClick={() => onNavigate("about")}>
          <FileIcon color={activeSection === "about" ? accentColor : mutedColor} />
          about.tsx
        </div>

        <div className={getRowClass("education")} onClick={() => onNavigate("education")}>
          <FileIcon color={activeSection === "education" ? accentColor : mutedColor} />
          education.tsx
        </div>

        <div className={getRowClass("experience")} onClick={() => toggle("experience")}>
          <FolderIcon open={open.experience} color={activeSection === "experience" ? accentColor : mutedColor} />
          experience
        </div>
        {open.experience && (
          <>
            <div className={getChildClass()} onClick={() => onNavigate("experience")}>
              <FileIcon color={dimmedColor} />stackform.ts
            </div>
            <div className={getChildClass()} onClick={() => onNavigate("experience")}>
              <FileIcon color={dimmedColor} />gdgoc-dlsu.ts
            </div>
            <div className={getChildClass()} onClick={() => onNavigate("experience")}>
              <FileIcon color={dimmedColor} />dlsu-futsal.ts
            </div>
          </>
        )}

        <div className={getRowClass("projects")} onClick={() => toggle("projects")}>
          <FolderIcon open={open.projects} color={activeSection === "projects" ? accentColor : mutedColor} />
          projects
        </div>
        {open.projects && (
          <>
            <div className={getChildClass()} onClick={() => onNavigate("projects")}>
              <FileIcon color={dimmedColor} />akyat.ts
            </div>
            <div className={getChildClass()} onClick={() => onNavigate("projects")}>
              <FileIcon color={dimmedColor} />flood-pipeline.ts
            </div>
          </>
        )}

        <div className={getRowClass("skills")} onClick={() => onNavigate("skills")}>
          <FileIcon color={activeSection === "skills" ? accentColor : mutedColor} />
          skills.tsx
        </div>

        <div className={getRowClass("connect")} onClick={() => onNavigate("connect")}>
          <FileIcon color={activeSection === "connect" ? accentColor : mutedColor} />
          connect.tsx
        </div>

        <div className="h-[1px] my-3 mx-4" style={{ backgroundColor: "var(--card-border)" }} />

        <div 
          className="flex items-center gap-2 px-3 py-1.5 mx-2 rounded text-[13px] font-mono select-none cursor-pointer transition-all duration-150 text-[var(--primary)] font-medium hover:bg-[var(--btn-secondary-bg)]"
          onClick={onToggleTheme}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" style={{ flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{theme === "minimal-dark" ? "lightmode.sh" : "darkmode.sh"}</span>
        </div>
      </nav>
    </aside>
  );
}
