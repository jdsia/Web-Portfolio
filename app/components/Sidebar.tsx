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

import { PROJECTS } from "../data/projects";
import { EXPERIENCES } from "../data/experiences";

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  theme: "minimal-light" | "minimal-dark";
  onToggleTheme: () => void;
  isLoaded: boolean;
  activeExperienceId?: string;
  activeProjectId?: string;
}

export default function Sidebar({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
  isLoaded,
  activeExperienceId,
  activeProjectId,
}: SidebarProps) {
  const [open, setOpen] = useState({ experience: true, projects: true });
  const [showKeybindTip, setShowKeybindTip] = useState(false);

  const border = "var(--card-border)";

  const toggle = (key: keyof typeof open) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  // Dynamic VS Code Tree Row class builder matching user design exactly
  const getRowClass = (section: string) => {
    const isActive = activeSection === section;
    return `flex items-center gap-2 px-3 py-1.5 mx-2 rounded text-[14px] font-mono select-none cursor-pointer border border-transparent transition-all duration-150 ${isActive
      ? "text-[var(--foreground)] bg-[var(--btn-secondary-bg)] border-[var(--card-border)] font-medium opacity-100"
      : "text-[var(--text-secondary)] opacity-65 hover:opacity-100"
      }`;
  };

  const getChildClass = (parentSection: string, isFileActive?: boolean) => {
    const isActive = isFileActive !== undefined ? isFileActive : activeSection === parentSection;
    return `flex items-center gap-2 pl-8 pr-3 py-1.5 mx-2 rounded text-[14px] font-mono select-none cursor-pointer border border-transparent transition-all duration-150 ${isActive
      ? "text-[var(--foreground)] bg-[var(--btn-secondary-bg)] border-[var(--card-border)] font-medium opacity-100"
      : "text-[var(--text-secondary)] opacity-65 hover:opacity-100"
      }`;
  };

  const accentColor = "var(--primary)";
  const mutedColor = "var(--text-secondary)";

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col border-r overflow-y-auto"
      style={{
        width: "300px",
        backgroundColor: "var(--background)",
        borderColor: border,
        boxShadow: theme === "minimal-dark" ? "6px 0 24px rgba(0, 0, 0, 0.4)" : "6px 0 24px rgba(0, 0, 0, 0.03)",
        transition: "box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Sidebar header */}
      <div style={{ borderBottom: "1px solid var(--card-border)", padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "13px",
              color: "var(--foreground)",
              letterSpacing: "0.08em",
              fontWeight: 500,
              marginBottom: "2px",
            }}>
              ethan sia
            </p>
            {/* <p style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "var(--text-secondary)",
              letterSpacing: "0.05em",
              opacity: 0.7,
            }}>
              ~ / portfolio
            </p> */}
          </div>

          {/* Icon buttons */}
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>

            {/* Theme toggle icon */}
            <button
              onClick={onToggleTheme}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "5px", borderRadius: "4px",
                color: "var(--text-primary)",
                opacity: 0.6,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
              title={theme === "minimal-dark" ? "switch to light mode" : "switch to dark mode"}
            >
              {theme === "minimal-dark" ? (
                /* Sun icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                /* Moon icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Keybinds dropdown — expands inside header, no overflow issues */}
        <div style={{ maxHeight: showKeybindTip ? "56px" : "0px", overflow: "hidden", transition: "max-height 0.2s ease" }}>
          <div style={{ borderTop: "1px dashed var(--card-border)", marginTop: "10px", paddingTop: "8px" }}>
            <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11px", color: "var(--text-secondary)", lineHeight: "2" }}>
              <span style={{ color: "var(--foreground)" }}>j</span>&nbsp;&nbsp;scroll down&nbsp;&nbsp;&nbsp;
              <span style={{ color: "var(--foreground)" }}>k</span>&nbsp;&nbsp;scroll up
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 select-none space-y-1">
        {/* resume.pdf — top of nav, emphasized */}
        <div className="px-2 mb-1">
          <a
            href="https://drive.google.com/drive/u/0/folders/135D34vp7vVqp8yJuy76m2zc0nDOTtOgZ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded text-[14px] font-mono select-none cursor-pointer transition-all duration-150 hover:opacity-80"
            style={{
              backgroundColor: "var(--btn-secondary-bg)",
              color: "var(--foreground)",
              textDecoration: "none",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
              <rect x="2" y="5" width="20" height="14" rx="2" strokeLinejoin="round" />
              <circle cx="8.5" cy="11" r="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 9h4M14 13h3M5.5 17c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5" />
            </svg>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>resume.pdf</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto" style={{ opacity: 0.45 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>


        <div className={getRowClass("home")} onClick={() => onNavigate("home")}>
          <FileIcon color={activeSection === "home" ? accentColor : mutedColor} />
          <span>home.md</span>
        </div>

        <div className={getRowClass("about")} onClick={() => onNavigate("about")}>
          <FileIcon color={activeSection === "about" ? accentColor : mutedColor} />
          <span>about.md</span>
        </div>

        <div className={getRowClass("experience")} onClick={() => toggle("experience")}>
          <FolderIcon open={open.experience} color={activeSection === "experience" ? accentColor : mutedColor} />
          <span>experience</span>
        </div>
        {open.experience && EXPERIENCES.map((exp, idx) => {
          const isFileActive = activeSection === "experience" && exp.id === activeExperienceId;
          return (
            <div key={exp.id} className={getChildClass("experience", isFileActive)} onClick={() => onNavigate(exp.id)}>
              <FileIcon color={isFileActive ? accentColor : mutedColor} />
              <span>{exp.filename}</span>
            </div>
          );
        })}

        <div className={getRowClass("projects")} onClick={() => toggle("projects")}>
          <FolderIcon open={open.projects} color={activeSection === "projects" ? accentColor : mutedColor} />
          <span>projects</span>
        </div>
        {open.projects && PROJECTS.map((project, idx) => {
          const isFileActive = activeSection === "projects" && project.id === activeProjectId;
          return (
            <div key={project.id} className={getChildClass("projects", isFileActive)} onClick={() => onNavigate(project.id)}>
              <FileIcon color={isFileActive ? accentColor : mutedColor} />
              <span>{project.filename}</span>
            </div>
          );
        })}

        <div className={getRowClass("skills")} onClick={() => onNavigate("skills")}>
          <FileIcon color={activeSection === "skills" ? accentColor : mutedColor} />
          <span>skills.md</span>
        </div>

        <div className={getRowClass("education")} onClick={() => onNavigate("education")}>
          <FileIcon color={activeSection === "education" ? accentColor : mutedColor} />
          <span>education.md</span>
        </div>

        <div className={getRowClass("connect")} onClick={() => onNavigate("connect")}>
          <FileIcon color={activeSection === "connect" ? accentColor : mutedColor} />
          <span>connect.md</span>
        </div>

      </nav>

    </aside>
  );
}
