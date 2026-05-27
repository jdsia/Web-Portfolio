"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LoadingBar from "./components/LoadingBar";
import Sidebar from "./components/Sidebar";

const projects = [
  {
    id: 1,
    title: "Akyat",
    description:
      "Full-stack bouldering training and logging platform featuring JWT authentication, Supabase Auth, HTTP-only cookie session management, and role-scoped data isolation. Eliminates manual climb tracking via structured session logging with active-session persistence, and surfaces actionable training insights through an analytics dashboard with animated grade pyramids, performance trends, and a 'Climbing DNA' breakdown of hold types and wall angles.",
    image: "/akyat.png",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Supabase Auth",
      "JWT",
      "Express",
    ],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Flood Control Data Analysis Pipeline",
    description:
      "High-throughput JavaScript data pipeline engineered to parse, clean, and validate raw DPWH flood control datasets containing 10,000+ records across multi-year intervals. Implements multi-level aggregation algorithms and statistical models to compute derived metrics, transforming unstructured CSV inputs into regional infrastructure financial reports with minimal memory overhead.",
    image: "/pipeline.png",
    technologies: ["JavaScript", "Node.js", "CSV Parsing", "Data Analytics"],
    demoUrl: "#",
    githubUrl: "",
  },
];

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const fullHeadline = "Ethan Sia builds software and systems.";
  const [displayedHeadline, setDisplayedHeadline] = useState("");
  const [headlineDone, setHeadlineDone] = useState(false);
  const headlineRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (showLoader) return;
    let i = 0;
    const type = () => {
      if (i < fullHeadline.length) {
        setDisplayedHeadline(fullHeadline.slice(0, i + 1));
        i++;
        headlineRef.current = setTimeout(type, 42);
      } else {
        setHeadlineDone(true);
      }
    };
    headlineRef.current = setTimeout(type, 300);
    return () => { if (headlineRef.current) clearTimeout(headlineRef.current); };
  }, [showLoader]);

  const mobileTabs = [
    { id: "home", label: "home.tsx" },
    { id: "about", label: "about.tsx" },
    { id: "education", label: "education.tsx" },
    { id: "experience", label: "experience.tsx" },
    { id: "projects", label: "projects.tsx" },
    { id: "skills", label: "skills.tsx" },
    { id: "connect", label: "connect.tsx" },
  ];

  const currentTabIndex = mobileTabs.findIndex((t) => t.id === activeSection);
  const prevTab = currentTabIndex > 0 ? mobileTabs[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < mobileTabs.length - 1 ? mobileTabs[currentTabIndex + 1] : null;

  return (
    <div
      className="min-h-screen pt-[45px] md:pt-0 md:pr-[300px] pr-0"
      style={{ backgroundColor: "var(--background)" }}
    >
      {showLoader && (
        <LoadingBar onComplete={() => setShowLoader(false)} />
      )}

      {/* Mobile-Only Top Tab Explorer */}
      <div
        className="fixed top-0 left-0 right-0 z-30 flex md:hidden items-end overflow-x-auto select-none border-b scrollbar-none"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--card-border)",
          height: "45px",
        }}
      >
        {[
          { id: "home", label: "home.tsx" },
          { id: "about", label: "about.tsx" },
          { id: "education", label: "education.tsx" },
          { id: "experience", label: "experience.tsx" },
          { id: "projects", label: "projects.tsx" },
          { id: "skills", label: "skills.tsx" },
          { id: "connect", label: "connect.tsx" },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className="h-full px-4 flex items-center gap-2 border-r text-xs transition-all duration-150 relative focus:outline-none whitespace-nowrap"
              style={{
                backgroundColor: isActive ? "var(--background)" : "rgba(0,0,0,0.15)",
                color: isActive ? "var(--foreground)" : "var(--text-secondary)",
                borderColor: "var(--card-border)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              {/* Active indicator line on top of active tab */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}

              {/* VS Code styled SVG FileIcon matching the sidebar tree */}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="opacity-80 flex-shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>

              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen px-12 md:px-20 flex flex-col justify-center"
        style={{ display: activeSection === "home" ? undefined : "none" }}
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / home</p>
        <div className="max-w-3xl">
          <h1
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
              minHeight: "1.2em",
            }}
          >
            {displayedHeadline}
            <span
              className="inline-block w-[2px] h-[0.9em] ml-[2px] align-middle"
              style={{
                backgroundColor: "var(--primary)",
                opacity: headlineDone ? 0 : 1,
                transition: "opacity 0.4s ease",
                animation: headlineDone ? "none" : "blink 0.75s step-end infinite",
              }}
            />
          </h1>
          <p
            className="text-lg md:text-xl font-light leading-relaxed mb-12"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Studying CS @ DLSU.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <a
              href="https://drive.google.com/drive/u/0/folders/135D34vp7vVqp8yJuy76m2zc0nDOTtOgZ"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-widest uppercase border-b pb-2 hover:opacity-70 transition-all duration-300 px-6 py-2 w-max"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.85rem",
              }}
            >
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen px-12 md:px-20 flex flex-col justify-center"
        style={{ display: activeSection === "about" ? undefined : "none" }}
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / about</p>
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            A builder.
          </h2>
          <p
            className="text-lg md:text-xl font-light leading-relaxed mb-12"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Computer Science student at De La Salle University focused on software development and web technologies. I enjoy building full-stack applications, learning new technologies, and creating practical solutions to real-world problems.
          </p>
          <p
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              color: "var(--on-surface-variant)",
              letterSpacing: "0.15em",
            }}
          >
            OUTSIDE OF CODING, I SPEND MY TIME PLAYING FOOTBALL, RUNNING, AND BOULDERING
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="min-h-screen px-12 md:px-20 flex flex-col justify-center"
        style={{ display: activeSection === "education" ? undefined : "none" }}
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / education</p>
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            De La Salle University - Manila
          </h2>
          <p
            className="text-lg md:text-xl font-light leading-relaxed mb-12 text-[var(--on-surface-variant)]"
            style={{
              color: "var(--on-surface)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            BS Computer Science, Major in Software Technology (2024 – Present). Manila, Philippines.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-screen px-12 md:px-20 flex flex-col justify-center py-20"
        style={{ display: activeSection === "experience" ? undefined : "none" }}
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / experience</p>
        <div className="max-w-3xl space-y-12">
          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Stackform — Co-Founder & Lead Engineer
              </h3>
              <span className="text-xs tracking-widest uppercase opacity-60" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                April 2026 – Present
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider mb-3 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              Remote
            </p>
            <p className="text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Architected and shipped a full-stack inventory management system for a local salon business using Node.js, Express, Prisma, PostgreSQL (Supabase), and React (Vite) + Tailwind CSS. Replaced manual Excel processes to secure single-source-of-truth transaction visibility managing 500,000+ PHP monthly, while delivering embedded analytics to optimize purchasing and reduce overstock costs.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Google Developer Groups on Campus — Relations Executive
              </h3>
              <span className="text-xs tracking-widest uppercase opacity-60" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                Oct. 2025 – Present
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider mb-3 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              DLSU Manila, Philippines
            </p>
            <p className="text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Managed external partnerships and sponsorships with technical communities and student organizations, leading outreach initiatives to drive event collaborations and partnership opportunities.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                DLSU Futsal Club — Internals Committee Officer
              </h3>
              <span className="text-xs tracking-widest uppercase opacity-60" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                Oct. 2025 – Present
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider mb-3 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              Manila, Philippines
            </p>
            <p className="text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Coordinated logistics, scheduling, and attendance workflows for training sessions and social activities serving 200+ members, establishing internal records to streamline planning and committee communication.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen px-12 md:px-20 flex flex-col justify-center py-20"
        style={{ display: activeSection === "projects" ? undefined : "none" }}
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / projects</p>
        <div className="max-w-3xl space-y-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Akyat
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Supabase Auth", "JWT", "Express"].map((tech) => (
                <span key={tech} className="text-[11px] uppercase border-b border-dotted pb-0.5" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}>
                  {tech}
                </span>
              ))}
            </div>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)] mb-4" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <li>
                Architected full-stack bouldering logging platform with Supabase Auth, HTTP-only cookie session management, and role-scoped data isolation.
              </li>
              <li>
                Eliminated manual climb tracking via structured session logging with active-session persistence — reducing data loss during multi-hour gym sessions for highly reliable training records.
              </li>
              <li>
                Surfaced actionable training insights through an analytics dashboard with animated grade pyramids — identifying user weaknesses by hold type and wall angle to enable data-informed training decisions.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Flood Control Data Analysis Pipeline
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["JavaScript", "Node.js", "CSV Parsing", "Data Analytics"].map((tech) => (
                <span key={tech} className="text-[11px] uppercase border-b border-dotted pb-0.5" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}>
                  {tech}
                </span>
              ))}
            </div>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)] mb-4" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <li>
                Engineered high-throughput JavaScript data pipeline parsing, cleaning, and validating raw DPWH flood control datasets containing 10,000+ records across multi-year intervals.
              </li>
              <li>
                Implemented multi-level aggregation algorithms and statistical models computing derived metrics, transforming unstructured CSV inputs into actionable regional infrastructure financial reports.
              </li>
              <li>
                Optimized data processing layers maintaining structural integrity and minimizing memory overhead during heavy validation and filtering workflows.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen px-12 md:px-20 flex flex-col justify-center"
        style={{ display: activeSection === "skills" ? undefined : "none" }}
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / skills</p>
        <div className="max-w-3xl space-y-8">
          <div>
            <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Languages</h3>
            <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Java, Python, C, JavaScript, TypeScript, SQL
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Frameworks & Libraries</h3>
            <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              React, Node.js, Express, Tailwind CSS, Prisma ORM, Next.js, OpenCV, Mediapipe
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Databases & Tools</h3>
            <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              PostgreSQL, MongoDB, MySQL, Git, Linux, Vim, VS Code, Supabase, Render, Vercel, GitHub Actions
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Coursework</h3>
            <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Data Structures & Algorithms, Object-Oriented Programming, Discrete Mathematics, Database Systems, Software Engineering
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Connect Section */}
      <footer
        id="connect"
        className="min-h-screen px-12 md:px-20 flex flex-col justify-center"
        style={{
          backgroundColor: "var(--background)",
          display: activeSection === "connect" ? undefined : "none",
        }}
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / connect</p>
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Connect
          </h2>
          <p
            className="text-lg md:text-xl font-light leading-relaxed mb-12"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Feel free to reach out for collaborations, opportunities, or just to say hi.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 mb-16">
            <a
              href="https://github.com/jdsia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ethan-sia-807500358"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:siaethan83@gmail.com"
              className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}
            >
              siaethan83@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile-Only Section Bottom Navigation Pagination */}
      <div className="md:hidden px-12 pb-24 mt-4 select-none">
        <div className="flex justify-between items-center pt-6 border-t" style={{ borderColor: "var(--card-border)" }}>
          {prevTab ? (
            <button
              onClick={() => {
                setActiveSection(prevTab.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-[11px] tracking-wider opacity-70 hover:opacity-100 flex items-center gap-1.5 border px-3 py-1.5 rounded active:scale-95 transition-all duration-150"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                color: "var(--text-secondary)",
                borderColor: "var(--card-border)",
                backgroundColor: "rgba(0,0,0,0.1)"
              }}
            >
              <span>&lt;--</span>
              <span>{prevTab.label}</span>
            </button>
          ) : <div />}

          {nextTab ? (
            <button
              onClick={() => {
                setActiveSection(nextTab.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-[11px] tracking-wider flex items-center gap-1.5 border px-3 py-1.5 rounded active:scale-95 transition-all duration-150"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                color: "var(--primary)",
                borderColor: "rgba(131,165,152,0.3)",
                backgroundColor: "rgba(131,165,152,0.05)"
              }}
            >
              <span>{nextTab.label}</span>
              <span>--&gt;</span>
            </button>
          ) : <div />}
        </div>
      </div>

      {/* Desktop-Only Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      </div>
    </div>
  );
}
