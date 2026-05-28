"use client";
import { useState, useEffect, useRef } from "react";
import { useScrollSnap } from "./hooks/useScrollSnap";
import Sidebar from "./components/Sidebar";
import { PROJECTS } from "./data/projects";
import { EXPERIENCES } from "./data/experiences";
import IntroAnimation from "./components/IntroAnimation";


export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"minimal-light" | "minimal-dark">("minimal-light");
  const [activeExperienceId, setActiveExperienceId] = useState<string>("stackform");

  // State to track interactive command-line expansion blocks (only for projects)
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PROJECTS.forEach((project, idx) => {
      // Start the first project expanded so the user sees it immediately, collapse others
      initial[project.id] = idx === 0;
    });
    return initial;
  });

  const toggleBlock = (key: string) => {
    setExpandedBlocks((prev) => {
      const isCurrentlyExpanded = !!prev[key];
      const next: Record<string, boolean> = {};
      PROJECTS.forEach((p) => {
        next[p.id] = p.id === key ? !isCurrentlyExpanded : false;
      });
      return next;
    });
  };

  const [activeScreenshot, setActiveScreenshot] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveScreenshot(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeProjectId = PROJECTS.find((p) => expandedBlocks[p.id])?.id;

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
      setTheme("minimal-light");
      document.documentElement.setAttribute("data-theme", "minimal-light");
    }
  }, []);



  const toggleTheme = () => {
    const next = theme === "minimal-dark" ? "minimal-light" : "minimal-dark";

    // Add transitioning class for smooth theme fade
    document.documentElement.classList.add("theme-transition");

    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 400);
  };

  // Navigate to sections smoothly (scroll snap target) and expand project blocks automatically
  const handleNavigate = (id: string) => {
    let targetSectionId = id;
    const projectIds = PROJECTS.map((p) => p.id);
    const experienceIds = EXPERIENCES.map((e) => e.id);
    if (projectIds.includes(id)) {
      setExpandedBlocks(() => {
        const next: Record<string, boolean> = {};
        PROJECTS.forEach((p) => {
          next[p.id] = p.id === id;
        });
        return next;
      });
      targetSectionId = "projects";
    } else if (experienceIds.includes(id)) {
      setActiveExperienceId(id);
      targetSectionId = "experience";
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
    <IntroAnimation onComplete={() => setIsLoaded(true)}>
      {({ sidebarClass, contentClass }) => (
        <div
          className="snap-container md:pl-[300px] pr-0"
          style={{ backgroundColor: "var(--background)" }}
        >
          {/* Dynamic Overlay Grid */}
          <div className="grid-overlay" />

          <div className={contentClass}>
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
                ~ / home
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
                  <span className="terminal-highlight">ethan sia</span>
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
                  Studying CS @ DLSU.
                </p>
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
                  Ethan Sia is a Computer Science student at De La Salle University and a full-stack software engineer. He focuses on building robust web applications, developing mobile client systems, and engineering practical digital solutions for the real-world problems of local businesses.
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
                    TypeScript, Java, Python, C, JavaScript, SQL, Bash (scripting)
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Frameworks & Libraries</h3>
                  <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    React, Node.js, Express, Tailwind CSS, Prisma ORM, Next.js, OpenCV, Mediapipe
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Databases & Cloud Platforms</h3>
                  <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    PostgreSQL, MongoDB, MySQL, Git, VS Code, Supabase, Vercel, Render, GitHub Actions
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Tools & Environment</h3>
                  <p className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    Ubuntu, i3wm, Vim, Neovim (Lua config), Alacritty, tmux, Bash, Antigravity
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

            {/* Experience Section */}
            <section
              id="experience"
              className="snap-section px-12 md:px-20 flex flex-col justify-center py-20"
            >
              <p style={{ color: "var(--primary)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "2rem", opacity: 0.6 }}>~ / experience</p>

              {/* VS Code Tab Bar */}
              <div className="flex border-b border-[var(--card-border)] mb-8 font-mono text-xs overflow-x-auto max-w-3xl select-none">
                {EXPERIENCES.map((exp) => {
                  const isActive = exp.id === activeExperienceId;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExperienceId(exp.id)}
                      className={`flex items-center gap-2 px-4 py-2 border-r border-[var(--card-border)] border-t-2 transition-all duration-150 whitespace-nowrap cursor-pointer ${isActive
                        ? "bg-[var(--tab-active-bg)] text-[var(--foreground)] border-t-[var(--primary)] font-medium"
                        : "text-[var(--text-secondary)] hover:bg-[var(--btn-secondary-bg)] hover:text-[var(--foreground)] border-t-transparent opacity-70 hover:opacity-100"
                        }`}
                    >
                      <span>{exp.filename}</span>
                      <span className="opacity-40 text-[9px] hover:opacity-100 ml-1">✕</span>
                    </button>
                  );
                })}
              </div>

              {/* Split Editor Gutter Window */}
              <div className="flex border border-[var(--card-border)] rounded-lg bg-[var(--background)] max-w-3xl min-h-[340px] overflow-hidden select-none shadow-sm relative">
                {/* Line Gutter */}
                <div className="border-r border-dashed border-[var(--card-border)] px-4 py-8 text-right opacity-30 select-none text-[11px] space-y-1.5 flex flex-col justify-start bg-[var(--btn-secondary-bg)] w-[50px] flex-shrink-0 font-mono">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="block leading-relaxed">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  ))}
                </div>

                {/* Editor Buffer Panel */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
                  {EXPERIENCES.map((exp, idx) => {
                    const isActive = exp.id === activeExperienceId;
                    const activeIdx = EXPERIENCES.findIndex((e) => e.id === activeExperienceId);
                    const isBehind = idx < activeIdx;

                    let translateYStyle = "translateY(50px)";
                    let opacityVal = 0;

                    if (isActive) {
                      translateYStyle = "translateY(0px)";
                      opacityVal = 1;
                    } else if (isBehind) {
                      translateYStyle = "translateY(-50px)";
                      opacityVal = 0;
                    }

                    return (
                      <div
                        key={exp.id}
                        style={{
                          transform: translateYStyle,
                          opacity: opacityVal,
                          transition: "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                        className="absolute inset-x-6 md:inset-x-8 space-y-4"
                      >
                        <div className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
                          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                            {exp.role}
                          </h3>
                          <span className="text-xs tracking-widest uppercase opacity-60" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                            {exp.period}
                          </span>
                        </div>
                        {exp.subtitles.map((sub, sIdx) => (
                          <p key={sIdx} className="text-xs uppercase tracking-wider mb-2 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
                            {sub}
                          </p>
                        ))}
                        <p
                          className="text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)] pt-2"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                        {exp.extraSubtitles && exp.extraSubtitles.map((sub, exIdx) => (
                          <p key={exIdx} className="text-xs uppercase tracking-wider mt-4 opacity-70" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)" }}>
                            {sub}
                          </p>
                        ))}
                      </div>
                    );
                  })}
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

                {PROJECTS.map((project) => (
                  <div key={project.id} className="space-y-3">
                    <div
                      onClick={() => toggleBlock(project.id)}
                      className="group flex items-center gap-2 cursor-pointer font-mono text-sm md:text-base select-none hover:opacity-90 transition-opacity"
                      style={{ color: "var(--primary)" }}
                    >
                      <span>$</span>
                      <span className="text-[var(--foreground)] group-hover:underline">ls {project.filename}</span>
                      <span className={`ml-auto transition-transform duration-200 text-xs opacity-40 ${expandedBlocks[project.id] ? "rotate-90" : ""}`}>▶</span>
                    </div>

                    <div
                      style={{
                        maxHeight: expandedBlocks[project.id] ? "600px" : "0px",
                        overflow: "hidden",
                        transition: "max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <div className="pl-4 md:pl-6 border-l border-dashed border-[var(--card-border)] space-y-3 py-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[var(--foreground)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                            {project.title}
                          </h3>
                          {project.images && project.images.length > 0 && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveScreenshot({
                                  title: project.title,
                                  url: project.images![0],
                                });
                              }}
                              className="text-[11px] font-mono text-[var(--text-secondary)] select-none cursor-pointer border border-[var(--card-border)] rounded px-2 py-0.5 bg-[var(--btn-secondary-bg)] hover:bg-[var(--card-border)] hover:text-[var(--primary)] transition-all"
                            >
                              [&nbsp;
                              <span className="underline">
                                {project.images[0].replace("/", "")}
                              </span>
                              &nbsp;]
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="text-[11px] uppercase border-b border-dotted pb-0.5" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}>
                              {tech}
                            </span>
                          ))}
                        </div>

                        <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base font-light leading-relaxed text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </section>


            {/* Footer / Connect Section */}
            <footer
              id="connect"
              className="snap-section px-12 md:px-20 flex flex-col justify-center"
              style={{
                backgroundColor: "var(--background)",
              }}
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
                  connect
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
                  <a
                    href="mailto:ethan_sia@dlsu.edu.ph"
                    className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
                    style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "var(--primary)", borderColor: "var(--primary)" }}
                  >
                    ethan_sia@dlsu.edu.ph
                  </a>
                </div>
              </div>
            </footer>
          </div>

          {/* Desktop-Only Sidebar */}
          <div className={`hidden md:block fixed left-0 top-0 h-screen w-[300px] z-30 ${sidebarClass}`}>
            <Sidebar
              activeSection={activeSection}
              onNavigate={handleNavigate}
              theme={theme}
              onToggleTheme={toggleTheme}
              isLoaded={isLoaded}
              activeExperienceId={activeExperienceId}
              activeProjectId={activeProjectId}
            />
          </div>

          {/* Mobile-Only Dynamic Theme Switcher Row (Top Right) */}
          <div className="fixed top-6 right-6 md:hidden z-40 select-none" >
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
          </div>

          {/* Retro screenshot overlay modal */}
          {activeScreenshot && (
            <div
              onClick={() => setActiveScreenshot(null)}
              className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-fadeIn"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="border border-[var(--card-border)] rounded bg-[var(--background)] max-w-5xl w-full shadow-2xl overflow-hidden cursor-default"
              >
                <div className="flex items-center justify-between px-4 py-2 bg-[var(--btn-secondary-bg)] border-b border-[var(--card-border)] font-mono text-xs text-[var(--text-secondary)] select-none">
                  <span>{activeScreenshot.title} &mdash; screenshot.png</span>
                  <button
                    onClick={() => setActiveScreenshot(null)}
                    className="hover:text-[var(--primary)] font-mono cursor-pointer transition-colors px-2 py-0.5 border border-[var(--card-border)] rounded text-[10px] bg-[var(--background)]"
                  >
                    [ESC] Close
                  </button>
                </div>
                <div className="p-2 bg-[var(--background)]">
                  <img
                    src={activeScreenshot.url}
                    alt={activeScreenshot.title}
                    className="w-full h-auto object-contain max-h-[75vh] rounded border border-[var(--card-border)]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </IntroAnimation>
  );
}
