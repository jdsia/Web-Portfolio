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
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [open, setOpen] = useState({ experience: true, projects: true });

  const mono = "var(--font-jetbrains-mono), monospace";
  const muted = "var(--on-surface-variant)";
  const accent = "var(--primary)";
  const border = "var(--card-border)";
  const dimmed = "rgba(139,148,158,0.55)";

  const toggle = (key: keyof typeof open) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  const row = (section: string): React.CSSProperties => ({
    color: activeSection === section ? accent : muted,
    fontFamily: mono,
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "4px",
  });

  const child = (section: string): React.CSSProperties => ({
    color: activeSection === section ? accent : dimmed,
    fontFamily: mono,
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px 6px 36px",
    borderRadius: "4px",
  });

  return (
    <aside
      className="fixed right-0 top-0 h-screen flex flex-col border-l overflow-y-auto"
      style={{ width: "300px", backgroundColor: "var(--background)", borderColor: border }}
    >
      <nav className="flex-1 py-6 select-none space-y-1">
        <div style={row("home")} onClick={() => onNavigate("home")}>
          <FileIcon color={activeSection === "home" ? accent : muted} />
          home.tsx
        </div>

        <div style={row("about")} onClick={() => onNavigate("about")}>
          <FileIcon color={activeSection === "about" ? accent : muted} />
          about.tsx
        </div>

        <div style={row("education")} onClick={() => onNavigate("education")}>
          <FileIcon color={activeSection === "education" ? accent : muted} />
          education.tsx
        </div>

        <div style={row("experience")} onClick={() => toggle("experience")}>
          <FolderIcon open={open.experience} color={activeSection === "experience" ? accent : muted} />
          experience
        </div>
        {open.experience && (
          <>
            <div style={child("experience")} onClick={() => onNavigate("experience")}>
              <FileIcon color={dimmed} />stackform.ts
            </div>
            <div style={child("experience")} onClick={() => onNavigate("experience")}>
              <FileIcon color={dimmed} />gdgoc-dlsu.ts
            </div>
            <div style={child("experience")} onClick={() => onNavigate("experience")}>
              <FileIcon color={dimmed} />dlsu-futsal.ts
            </div>
          </>
        )}

        <div style={row("projects")} onClick={() => toggle("projects")}>
          <FolderIcon open={open.projects} color={activeSection === "projects" ? accent : muted} />
          projects
        </div>
        {open.projects && (
          <>
            <div style={child("projects")} onClick={() => onNavigate("projects")}>
              <FileIcon color={dimmed} />akyat.ts
            </div>
            <div style={child("projects")} onClick={() => onNavigate("projects")}>
              <FileIcon color={dimmed} />flood-pipeline.ts
            </div>
          </>
        )}

        <div style={row("skills")} onClick={() => onNavigate("skills")}>
          <FileIcon color={activeSection === "skills" ? accent : muted} />
          skills.tsx
        </div>

        <div style={row("connect")} onClick={() => onNavigate("connect")}>
          <FileIcon color={activeSection === "connect" ? accent : muted} />
          connect.tsx
        </div>
      </nav>
    </aside>
  );
}
