"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useScrollSnap } from "./hooks/useScrollSnap";
import Sidebar from "./components/Sidebar";
import AsciiScrambler from "./components/AsciiScrambler";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"minimal-light" | "minimal-dark">("minimal-dark");

  // State to track interactive command-line expansion blocks (only for projects)
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({
    akyat: true,     // Start Akyat expanded so the user sees it immediately
    flood: false,
  });

  const toggleBlock = (key: string) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Custom JS scroll snap — mandatory-style but with a controllable duration
  useScrollSnap({
    containerSelector: ".snap-container",
    sectionSelector: ".snap-section",
    duration: 700,   // ms — increase for slower, decrease for faster
    threshold: 30,
  });

  // Load theme and mount page elements
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "minimal-light" || saved === "minimal-dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      setTheme("minimal-dark");
      document.documentElement.setAttribute("data-theme", "minimal-dark");
    }
    // Instantly trigger high-fidelity entrance animation transition on client mount
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "minimal-dark" ? "minimal-light" : "minimal-dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  };

  // Navigate to sections smoothly (scroll snap target) and expand project blocks automatically
  const handleNavigate = (id: string) => {
    let targetSectionId = id;
    if (["akyat", "flood"].includes(id)) {
      setExpandedBlocks((prev) => ({ ...prev, [id]: true }));
      targetSectionId = "projects";
    }

    const el = document.getElementById(targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scrollspy: update sidebar activeState based on viewport scroll snap position
  useEffect(() => {
    if (!isLoaded) return;

    const observerOptions = {
      root: null, // viewport
      rootMargin: "-45% 0px -45% 0px", // triggers when section dominates the center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["home", "about", "education", "skills", "experience", "projects", "connect"];

    const timeoutId = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isLoaded]);

  return (
    <div
      className="snap-container md:pr-[300px] pr-0"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Dynamic Overlay Grid */}
      <div className="grid-overlay" />
      {/* Hero Section */}
      <section
        id="home"
        className="snap-section px-12 md:px-20 flex flex-col justify-center"
      >
        <p
          className={`transition-all duration-700 transform ease-out ${isLoaded ? "opacity-60 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "3rem" }}
        >
          <AsciiScrambler text="~ / home" isLoaded={isLoaded} delay={0} speed={30} resolveCount={1} />
        </p>
        <div className={`max-w-3xl transition-all duration-[1200ms] transform ease-out ${isLoaded ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-8 filter blur-[6px]"
          }`}>
          <h1
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
              minHeight: "1.2em",
            }}
          >
            <AsciiScrambler text="ethan sia" isLoaded={isLoaded} delay={100} speed={30} resolveCount={1} />
            <span
              className="inline-block w-[2px] h-[0.9em] ml-[2px] align-middle"
              style={{
                backgroundColor: "var(--primary)",
                animation: "blink 1s step-end infinite",
              }}
            />
          </h1>
          <p
            className={`text-lg md:text-xl font-light leading-relaxed mb-12 transition-all duration-[1000ms] delay-150 transform ease-out ${isLoaded ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-6 filter blur-[4px]"
              }`}
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            <AsciiScrambler text="Studying CS @ DLSU." isLoaded={isLoaded} delay={200} speed={30} resolveCount={2} />
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-6 mb-16 transition-all duration-[1000ms] delay-300 transform ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
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
              <AsciiScrambler text="View Resume" isLoaded={isLoaded} delay={300} speed={30} resolveCount={1} />
            </a>
          </div>
        </div>
      </section >

      {/* About Section */}
      < section
        id="about"
        className="snap-section px-12 md:px-20 flex flex-col justify-center"
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / about</p>
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            athlete turned builder.
            <span
              className="inline-block w-[2px] h-[0.9em] ml-[2px] align-middle"
              style={{
                backgroundColor: "var(--primary)",
                animation: "blink 1s step-end infinite",
              }}
            />
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
            OUTSIDE OF CODING, I SPEND MY TIME PLAYING FOOTBALL, RUNNING, AND BOULDERING (and working to fund these activities)
          </p>
        </div>
      </section >

      {/* Education Section */}
      < section
        id="education"
        className="snap-section px-12 md:px-20 flex flex-col justify-center"
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / education</p>
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            De La Salle University - Manila
            <span
              className="inline-block w-[2px] h-[0.9em] ml-[2px] align-middle"
              style={{
                backgroundColor: "var(--primary)",
                animation: "blink 1s step-end infinite",
              }}
            />
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
      </section >

      {/* Skills Section */}
      < section
        id="skills"
        className="snap-section px-12 md:px-20 flex flex-col justify-center"
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / skills</p>
        <div className="max-w-3xl space-y-8">
          <div>
            <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Languages</h3>
            <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              TypeScript, Java, Python, C, JavaScript, SQL
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
      </section >

      {/* Experience Section */}
      <section
        id="experience"
        className="snap-section px-12 md:px-20 flex flex-col justify-center py-20"
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / experience</p>
        <div className="max-w-3xl space-y-12">
          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Stackform — Co-Founder & Lead Engineer
              </h3>
              <span className="text-xs tracking-widest uppercase opacity-60" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                April 2026 – Present
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider mb-3 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              a web agency focused on providing client-first solutions
            </p>
            <p className="text-xs uppercase tracking-wider mb-3 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              Remote
            </p>
            <p className="text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Architected and shipped a full-stack inventory management system for a local salon business using Node.js, Express, Prisma, PostgreSQL (Supabase), and React (Vite) + Tailwind CSS. Replaced manual Excel processes to secure single-source-of-truth transaction visibility managing 500,000+ PHP in monthly transactions,
              while delivering embedded analytics to optimize purchasing and reduce overstock costs.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
            <p className="text-xs uppercase tracking-wider mb-3 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
              +competing athlete
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="snap-section px-12 md:px-20 flex flex-col justify-center py-20"
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / projects</p>
        <div className="max-w-3xl space-y-8">

          {/* Akyat Block */}
          <div className="space-y-3">
            <div
              onClick={() => toggleBlock("akyat")}
              className="group flex items-center gap-2 cursor-pointer font-mono text-sm md:text-base select-none hover:opacity-90 transition-opacity"
              style={{ color: "var(--primary)" }}
            >
              {/* <span className="opacity-50">~ / projects</span> */}
              <span>$</span>
              <span className="text-[var(--foreground)] group-hover:underline">cat akyat.md</span>
              <span className={`ml-auto transition-transform duration-200 text-xs opacity-40 ${expandedBlocks.akyat ? "rotate-90" : ""}`}>▶</span>
            </div>

            <div
              style={{
                maxHeight: expandedBlocks.akyat ? "600px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              <div className="pl-4 md:pl-6 border-l border-dashed border-[var(--card-border)] space-y-3 py-1">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
                  <li>Architected full-stack bouldering logging platform with Supabase Auth, HTTP-only cookie session management, and role-scoped data isolation.</li>
                  <li>Eliminated manual climb tracking via structured session logging with active-session persistence — reducing data loss during multi-hour gym sessions for highly reliable training records.</li>
                  <li>Surfaced actionable training insights through an analytics dashboard with animated grade pyramids — identifying user weaknesses by hold type and wall angle to enable data-informed training decisions.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Flood Control Block */}
          <div className="space-y-3">
            <div
              onClick={() => toggleBlock("flood")}
              className="group flex items-center gap-2 cursor-pointer font-mono text-sm md:text-base select-none hover:opacity-90 transition-opacity"
              style={{ color: "var(--primary)" }}
            >
              {/* <span className="opacity-50">~ / projects</span> */}
              <span>$</span>
              <span className="text-[var(--foreground)] group-hover:underline">cat flood-pipeline.md</span>
              <span className={`ml-auto transition-transform duration-200 text-xs opacity-40 ${expandedBlocks.flood ? "rotate-90" : ""}`}>▶</span>
            </div>

            <div
              style={{
                maxHeight: expandedBlocks.flood ? "600px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              <div className="pl-4 md:pl-6 border-l border-dashed border-[var(--card-border)] space-y-3 py-1">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
                  <li>Engineered high-throughput JavaScript data pipeline parsing, cleaning, and validating raw DPWH flood control datasets containing 10,000+ records across multi-year intervals.</li>
                  <li>Implemented multi-level aggregation algorithms and statistical models computing derived metrics, transforming unstructured CSV inputs into regional infrastructure financial reports.</li>
                  <li>Optimized data processing layers maintaining structural integrity and minimizing memory overhead during heavy validation and filtering workflows.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Footer / Connect Section */}
      < footer
        id="connect"
        className="snap-section px-12 md:px-20 flex flex-col justify-center"
        style={{
          backgroundColor: "var(--background)",
        }
        }
      >
        <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "3rem", opacity: 0.6 }}>~ / connect</p>
        <div className="max-w-3xl">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Connect
            <span
              className="inline-block w-[2px] h-[0.9em] ml-[2px] align-middle"
              style={{
                backgroundColor: "var(--primary)",
                animation: "blink 1s step-end infinite",
              }}
            />
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
      </footer >

      {/* Desktop-Only Sidebar */}
      < div className={`hidden md:block fixed right-0 top-0 h-screen w-[300px] z-30 transition-all duration-[1000ms] delay-300 transform ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}>
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} theme={theme} onToggleTheme={toggleTheme} isLoaded={isLoaded} />
      </div >

      {/* Mobile-Only Dynamic Theme Switcher Row (Top Right) */}
      < div className="fixed top-6 right-6 md:hidden z-40 select-none" >
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded border text-[11px] font-medium tracking-wide shadow-sm cursor-pointer hover:opacity-80 active:scale-95 transition-all duration-150"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--primary)",
            borderColor: "var(--card-border)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
          title="Toggle Theme Style Script"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" className="flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{theme === "minimal-dark" ? "lightmode.sh" : "darkmode.sh"}</span>
        </button>
      </div >
    </div >
  );
}
