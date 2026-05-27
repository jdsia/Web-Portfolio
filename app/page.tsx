"use client";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", paddingRight: "300px" }}
    >
      {showLoader && (
        <LoadingBar onComplete={() => setShowLoader(false)} />
      )}

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
            }}
          >
            Ethan Sia builds software and systems.
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
              href="#projects"
              onClick={(e) => { e.preventDefault(); setActiveSection("projects"); }}
              className="tracking-widest uppercase border-b pb-2 hover:opacity-70 transition-all duration-300 px-6 py-2 w-max"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.85rem",
              }}
            >
              View Projects
            </a>
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
                April 2025 – Present
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider mb-4 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              Remote
            </p>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <li>
                Architected and shipped full-stack inventory management system for local salon business using Node.js, Express, Prisma ORM, PostgreSQL (Supabase), React (Vite) + Tailwind CSS — JWT authentication, RBAC (Admin/Staff), audit logging, automated low-stock alerting
              </li>
              <li>
                Replaced manual Excel/paper inventory with centralized software managing 500,000+ PHP in monthly transactions — eliminated stock discrepancies, provided employee-level transaction visibility to reduce inventory loss, providing single source of truth across transactions, deliveries, and supplier orders
              </li>
              <li>
                Delivered embedded analytics surfacing consumption trends and underperforming stock, enabling data-informed purchasing — reducing overstock costs and preventing operational stockouts
              </li>
            </ul>
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
            <p className="text-xs uppercase tracking-wider mb-4 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              DLSU Manila, Philippines
            </p>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <li>
                Managed external partnerships with student organizations and technical communities, coordinating event collaborations and sponsorship engagements
              </li>
              <li>
                Lead outreach communications to university and non-university organizations for event invitations and partnership opportunities
              </li>
            </ul>
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
            <p className="text-xs uppercase tracking-wider mb-4 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              Manila, Philippines
            </p>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              <li>
                Coordinate logistics for training sessions, team-building events, and social activities serving 200+ members — handling scheduling and attendance tracking
              </li>
              <li>
                Maintain internal records and communication workflows to support organizational planning and improve information flow across the committee
              </li>
            </ul>
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
                <span key={tech} className="text-[11px] uppercase opacity-70 border-b border-dotted pb-0.5" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", borderColor: "var(--primary)" }}>
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
            <div className="flex space-x-6">
              <a href="#" className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}>View Demo</a>
              <a href="#" className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}>GitHub</a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Flood Control Data Analysis Pipeline
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["JavaScript", "Node.js", "CSV Parsing", "Data Analytics"].map((tech) => (
                <span key={tech} className="text-[11px] uppercase opacity-70 border-b border-dotted pb-0.5" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", borderColor: "var(--primary)" }}>
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
            <div className="flex space-x-6">
              <a href="#" className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}>View Demo</a>
            </div>
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
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
    </div>
  );
}
