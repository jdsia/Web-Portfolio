"use client";
import { useState } from "react";

import { PROJECTS } from "../data/projects";
import { EXPERIENCES } from "../data/experiences";

function FileIcon() {
  return (
    <svg
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, opacity: 0.7 }}
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

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

  const toggle = (key: keyof typeof open) =>
    setOpen((p) => ({ ...p, [key]: !p[key] }));

  const rowStyle = (section: string): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "5px 20px",
    fontSize: "13px",
    letterSpacing: "0.06em",
    cursor: "pointer",
    opacity: activeSection === section ? 1 : 0.45,
    fontWeight: activeSection === section ? 500 : 400,
    color: "var(--foreground)",
    transition: "opacity 0.15s",
    userSelect: "none",
    fontFamily: "var(--font-jetbrains-mono), monospace",
  });

  const childStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "3px 20px 3px 32px",
    fontSize: "12px",
    letterSpacing: "0.04em",
    cursor: "pointer",
    opacity: isActive ? 1 : 0.38,
    fontWeight: isActive ? 500 : 400,
    color: "var(--foreground)",
    transition: "opacity 0.15s",
    userSelect: "none",
    fontFamily: "var(--font-jetbrains-mono), monospace",
  });

  const labelStyle: React.CSSProperties = {
    padding: "18px 20px 4px",
    fontSize: "10px",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
    opacity: 0.6,
    userSelect: "none",
    fontFamily: "var(--font-jetbrains-mono), monospace",
  };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "240px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--card-border)",
        backgroundColor: "var(--background)",
        overflowY: "auto",
        transition: "background-color 0.35s, border-color 0.35s",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid var(--card-border)",
          padding: "18px 20px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "13px",
            color: "var(--foreground)",
            letterSpacing: "0.12em",
            fontWeight: 500,
          }}
        >
          ethan sia
        </p>

        {/* Theme toggle — small text button */}
        <button
          onClick={onToggleTheme}
          title={theme === "minimal-dark" ? "light" : "dark"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 0",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--text-secondary)",
            opacity: 0.55,
            transition: "opacity 0.15s",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
        >
          {theme === "minimal-dark" ? "light" : "dark"}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, paddingTop: "12px", paddingBottom: "24px" }}>

        {/* Resume — plain underlined link */}
        <div style={{ padding: "8px 20px 16px", borderBottom: "1px solid var(--card-border)", marginBottom: "8px" }}>
          <a
            href="https://drive.google.com/drive/u/0/folders/135D34vp7vVqp8yJuy76m2zc0nDOTtOgZ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: "var(--foreground)",
              textDecoration: "underline",
              textDecorationColor: "var(--card-border)",
              textUnderlineOffset: "3px",
              opacity: 0.7,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            resume.pdf ↗
          </a>
        </div>

        {/* Top-level items */}
        <div
          style={rowStyle("home")}
          onClick={() => onNavigate("home")}
          onMouseEnter={(e) => { if (activeSection !== "home") (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = activeSection === "home" ? "1" : "0.45"; }}
        >
          <FileIcon />home
        </div>

        <div
          style={rowStyle("about")}
          onClick={() => onNavigate("about")}
          onMouseEnter={(e) => { if (activeSection !== "about") (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = activeSection === "about" ? "1" : "0.45"; }}
        >
          <FileIcon />about
        </div>

        {/* Experience group */}
        <div style={labelStyle}>experience</div>
        {EXPERIENCES.map((exp) => {
          const isActive = activeSection === "experience" && exp.id === activeExperienceId;
          return (
            <div
              key={exp.id}
              style={childStyle(isActive)}
              onClick={() => onNavigate(exp.id)}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.38"; }}
            >
              <FileIcon />{exp.filename}
            </div>
          );
        })}

        {/* Projects group */}
        <div style={labelStyle}>projects</div>
        {PROJECTS.map((project) => {
          const isActive = activeSection === "projects" && project.id === activeProjectId;
          return (
            <div
              key={project.id}
              style={childStyle(isActive)}
              onClick={() => onNavigate(project.id)}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.38"; }}
            >
              <FileIcon />{project.filename}
            </div>
          );
        })}

        <div style={{ height: "8px" }} />

        <div
          style={rowStyle("skills")}
          onClick={() => onNavigate("skills")}
          onMouseEnter={(e) => { if (activeSection !== "skills") (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = activeSection === "skills" ? "1" : "0.45"; }}
        >
          <FileIcon />skills
        </div>

        <div
          style={rowStyle("education")}
          onClick={() => onNavigate("education")}
          onMouseEnter={(e) => { if (activeSection !== "education") (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = activeSection === "education" ? "1" : "0.45"; }}
        >
          <FileIcon />education
        </div>

        <div
          style={rowStyle("connect")}
          onClick={() => onNavigate("connect")}
          onMouseEnter={(e) => { if (activeSection !== "connect") (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = activeSection === "connect" ? "1" : "0.45"; }}
        >
          <FileIcon />connect
        </div>
      </nav>
    </aside>
  );
}
