"use client";
import { useState, useEffect } from "react";
import { useScrollSnap } from "./hooks/useScrollSnap";
import Sidebar from "./components/Sidebar";
import { PROJECTS } from "./data/projects";
import { EXPERIENCES } from "./data/experiences";
import IntroAnimation from "./components/IntroAnimation";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"minimal-light" | "minimal-dark">(
    "minimal-light",
  );
  const [activeExperienceId, setActiveExperienceId] =
    useState<string>("stackform");

  // State to track interactive command-line expansion blocks (only for projects)
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      PROJECTS.forEach((project, idx) => {
        // Start the first project expanded so the user sees it immediately, collapse others
        initial[project.id] = idx === 0;
      });
      return initial;
    },
  );

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

  const [activeScreenshot, setActiveScreenshot] = useState<{
    title: string;
    url: string;
  } | null>(null);

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
    duration: 700, // ms — increase for slower, decrease for faster
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
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop) {
        const container =
          document.querySelector<HTMLElement>(".snap-container");
        if (container) {
          const sections = Array.from(
            container.querySelectorAll<HTMLElement>(".snap-section"),
          );
          const targetIndex = sections.findIndex(
            (s) => s.id === targetSectionId,
          );
          if (targetIndex !== -1) {
            const H = window.innerHeight;
            const targetScrollTop = targetIndex * H;

            // Animate vertically using custom ease-in-out curve
            const from = container.scrollTop;
            const delta = targetScrollTop - from;
            if (Math.abs(delta) >= 1) {
              const duration = 700;
              const start = performance.now();
              const easeInOut = (t: number) =>
                t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

              function step(now: number) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                container!.scrollTop = from + delta * easeInOut(progress);
                if (progress < 1) {
                  requestAnimationFrame(step);
                } else {
                  container!.scrollTop = targetScrollTop;
                }
              }
              requestAnimationFrame(step);
            }
          }
        }
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Scrollspy: update sidebar activeState based on viewport scroll snap position
  useEffect(() => {
    if (!isLoaded) return;

    const container = document.querySelector(".snap-container");
    const observerOptions = {
      root: container, // Use the custom scroll container as the root for perfect intersection calculations
      rootMargin: "-45% 0px -45% 0px", // Triggers when section dominates the vertical center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = [
      "home",
      "about",
      "experience",
      "projects",
      "skills",
      "education",
      "connect",
    ];

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
          <div className={`${contentClass} flex flex-col w-full`}>
            {/* Hero Section */}
            <section
              id="home"
              className="snap-section px-12 md:px-20 flex flex-col justify-center"
            >
              <p
                className={`transition-all duration-700 transform ease-out ${isLoaded
                    ? "opacity-50 translate-y-0"
                    : "opacity-0 -translate-y-4"
                  }`}
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginBottom: "4rem",
                }}
              >
                Home
              </p>
              <div
                className={`max-w-3xl transition-all duration-[1200ms] transform ease-out ${isLoaded
                    ? "opacity-100 translate-y-0 filter blur-0"
                    : "opacity-0 translate-y-8 filter blur-[6px]"
                  }`}
              >
                <h1
                  className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-inter), sans-serif",
                    minHeight: "1.2em",
                  }}
                >
                  <span>ethan sia</span>
                </h1>
                <p
                  className={`text-lg md:text-xl font-light leading-relaxed mb-12 transition-all duration-[1000ms] delay-150 transform ease-out ${isLoaded
                      ? "opacity-100 translate-y-0 filter blur-0"
                      : "opacity-0 translate-y-6 filter blur-[4px]"
                    }`}
                  style={{
                    color: "var(--on-surface-variant)",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  CS @ DLSU.
                </p>
              </div>
            </section>

            {/* About Section */}
            <section
              id="about"
              className="snap-section px-12 md:px-20 flex flex-col justify-center"
            >
              <p
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginBottom: "4rem",
                  opacity: 0.5,
                }}
              >
                About
              </p>
              <div className="max-w-3xl">
                <h2
                  className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  shipping software that works.
                </h2>
                <p
                  className="text-lg md:text-xl font-light leading-relaxed mb-12"
                  style={{
                    color: "var(--on-surface-variant)",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  Computer Science student at DLSU. Full-stack engineer who
                  ships real software for real Filipino businesses.
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    color: "var(--on-surface-variant)",
                    letterSpacing: "0.15em",
                  }}
                >
                  OUTSIDE OF CODING, I SPEND MY TIME PLAYING FOOTBALL, RUNNING,
                  AND BOULDERING (and working to fund these activities)
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="snap-section px-12 md:px-20 flex flex-col justify-center py-20"
            >
              <p
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginBottom: "2rem",
                  opacity: 0.5,
                }}
              >
                Experience
              </p>

              {/* Plain text tab toggles */}
              <div className="flex gap-6 mb-10 max-w-3xl select-none" style={{ borderBottom: "1px solid var(--card-border)", paddingBottom: "16px" }}>
                {EXPERIENCES.map((exp) => {
                  const isActive = exp.id === activeExperienceId;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExperienceId(exp.id)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "0",
                        cursor: "pointer",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                        color: "var(--foreground)",
                        opacity: isActive ? 1 : 0.38,
                        fontWeight: isActive ? 500 : 400,
                        transition: "opacity 0.15s",
                        textDecorationLine: isActive ? "underline" : "none",
                        textDecorationColor: "var(--card-border)",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      {exp.filename}
                    </button>
                  );
                })}
              </div>

              {/* Experience content — no border box */}
              <div className="max-w-3xl relative" style={{ minHeight: "280px" }}>
                {EXPERIENCES.map((exp, idx) => {
                  const isActive = exp.id === activeExperienceId;
                  const activeIdx = EXPERIENCES.findIndex((e) => e.id === activeExperienceId);
                  const isBehind = idx < activeIdx;

                  return (
                    <div
                      key={exp.id}
                      style={{
                        transform: isActive ? "translateY(0px)" : isBehind ? "translateY(-32px)" : "translateY(32px)",
                        opacity: isActive ? 1 : 0,
                        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                        pointerEvents: isActive ? "auto" : "none",
                        position: isActive ? "relative" : "absolute",
                        top: 0, left: 0, right: 0,
                      }}
                    >
                      <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                        <h3
                          className="text-2xl md:text-3xl font-light tracking-tight"
                          style={{ color: "var(--foreground)", fontFamily: "var(--font-inter), sans-serif" }}
                        >
                          {exp.role}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                            opacity: 0.7,
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      {exp.subtitles.map((sub, sIdx) => (
                        <p
                          key={sIdx}
                          style={{
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                            opacity: 0.7,
                            marginBottom: "12px",
                          }}
                        >
                          {sub}
                        </p>
                      ))}
                      <p
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "15px",
                          lineHeight: "1.9",
                          color: "var(--on-surface-variant)",
                        }}
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                      {exp.extraSubtitles && exp.extraSubtitles.map((sub, exIdx) => (
                        <p
                          key={exIdx}
                          style={{
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                            opacity: 0.7,
                            marginTop: "20px",
                          }}
                        >
                          {sub}
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              className="snap-section px-12 md:px-20 flex flex-col justify-center py-20"
            >
              <p
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginBottom: "3rem",
                  opacity: 0.7,
                }}
              >
                Projects
              </p>
              <div className="max-w-3xl" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {PROJECTS.map((project) => (
                  <div key={project.id} style={{ borderTop: "1px solid var(--card-border)" }}>
                    {/* Project toggle row */}
                    <div
                      onClick={() => toggleBlock(project.id)}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        padding: "18px 0",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "18px",
                          fontWeight: 600,
                          letterSpacing: "0.01em",
                          color: "var(--foreground)",
                          opacity: expandedBlocks[project.id] ? 1 : 0.75,
                          transition: "opacity 0.15s",
                        }}
                      >
                        {project.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                          fontSize: "10px",
                          letterSpacing: "0.2em",
                          color: "var(--text-secondary)",
                          opacity: 0.5,
                          marginLeft: "16px",
                          flexShrink: 0,
                        }}
                      >
                        {expandedBlocks[project.id] ? "−" : "+"}
                      </span>
                    </div>

                    {/* Expanded content */}
                    <div
                      style={{
                        maxHeight: expandedBlocks[project.id] ? "600px" : "0px",
                        overflow: "hidden",
                        transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <div style={{ paddingBottom: "24px" }}>
                        {/* Tech stack — plain comma-separated */}
                        <p
                          style={{
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                            opacity: 0.6,
                            marginBottom: "16px",
                          }}
                        >
                          {project.technologies.join(" · ")}
                        </p>

                        {/* Bullets as plain paragraphs */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {project.bullets.map((bullet, idx) => (
                            <p
                              key={idx}
                              style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "14px",
                                lineHeight: "1.85",
                                color: "var(--on-surface-variant)",
                              }}
                            >
                              {bullet}
                            </p>
                          ))}
                        </div>

                        {/* Links — plain underlined text */}
                        <div style={{ display: "flex", gap: "20px", marginTop: "16px" }}>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontFamily: "var(--font-jetbrains-mono), monospace",
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                color: "var(--foreground)",
                                opacity: 0.55,
                                textDecoration: "underline",
                                textDecorationColor: "var(--card-border)",
                                textUnderlineOffset: "3px",
                                transition: "opacity 0.15s",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
                            >
                              link ↗
                            </a>
                          )}
                          {project.images && project.images.length > 0 && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveScreenshot({ title: project.title, url: project.images![0] });
                              }}
                              style={{
                                fontFamily: "var(--font-jetbrains-mono), monospace",
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                color: "var(--foreground)",
                                opacity: 0.55,
                                textDecoration: "underline",
                                textDecorationColor: "var(--card-border)",
                                textUnderlineOffset: "3px",
                                cursor: "pointer",
                                transition: "opacity 0.15s",
                              }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
                            >
                              preview ↗
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Bottom border */}
                <div style={{ borderTop: "1px solid var(--card-border)" }} />
              </div>
            </section>

            {/* Skills Section */}
            <section
              id="skills"
              className="snap-section px-12 md:px-20 flex flex-col justify-center"
            >
              <p
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginBottom: "3rem",
                  opacity: 0.5,
                }}
              >
                Skills
              </p>
              <div className="max-w-3xl space-y-8">
                <div>
                  <h3
                    className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Languages
                  </h3>
                  <p
                    className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    TypeScript, Java, Python, C, JavaScript, SQL, Bash
                    (scripting)
                  </p>
                </div>
                <div>
                  <h3
                    className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Frameworks & Libraries
                  </h3>
                  <p
                    className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    React, Svelte, Node.js, Express, Tailwind CSS, Prisma ORM,
                    Next.js, OpenCV, Mediapipe
                  </p>
                </div>
                <div>
                  <h3
                    className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Databases & Cloud Platforms
                  </h3>
                  <p
                    className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    PostgreSQL, MongoDB, MySQL, Git, VS Code, Supabase, Vercel,
                    Render, GitHub Actions
                  </p>
                </div>
                <div>
                  <h3
                    className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Tools & Environment
                  </h3>
                  <p
                    className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Ubuntu, i3wm, Vim, Neovim (Lua config), Alacritty, tmux,
                    Bash, Antigravity
                  </p>
                </div>
                <div>
                  <h3
                    className="text-xl font-light tracking-tight text-[var(--foreground)] mb-2"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Coursework
                  </h3>
                  <p
                    className="text-base font-light leading-relaxed text-[var(--on-surface-variant)]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Data Structures & Algorithms, Object-Oriented Programming,
                    Discrete Mathematics, Database Systems, Software Engineering
                  </p>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section
              id="education"
              className="snap-section px-12 md:px-20 flex flex-col justify-center"
            >
              <p
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginBottom: "3rem",
                  opacity: 0.5,
                }}
              >
                Education
              </p>
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
                  BS Computer Science, Major in Software Technology (2024 –
                  Present). Manila, Philippines.
                </p>
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
              <p
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  marginBottom: "3rem",
                  opacity: 0.5,
                }}
              >
                Connect
              </p>
              <div className="max-w-3xl">
                <h2
                  className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  connect
                </h2>
                <p
                  className="text-lg md:text-xl font-light leading-relaxed mb-12"
                  style={{
                    color: "var(--on-surface-variant)",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  Feel free to reach out for collaborations, opportunities, or
                  just to say hi.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 mb-16">
                  <a
                    href="https://github.com/jdsia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      color: "var(--primary)",
                      borderColor: "var(--primary)",
                    }}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/ethan-sia-807500358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      color: "var(--primary)",
                      borderColor: "var(--primary)",
                    }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="mailto:siaethan83@gmail.com"
                    className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      color: "var(--primary)",
                      borderColor: "var(--primary)",
                    }}
                  >
                    siaethan83@gmail.com
                  </a>
                  <a
                    href="mailto:ethan_sia@dlsu.edu.ph"
                    className="text-xs uppercase tracking-widest border-b pb-1 hover:opacity-70 transition-opacity w-max"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      color: "var(--primary)",
                      borderColor: "var(--primary)",
                    }}
                  >
                    ethan_sia@dlsu.edu.ph
                  </a>
                </div>
              </div>
            </footer>
          </div>

          {/* Desktop-Only Sidebar */}
          <div
            className={`hidden md:block fixed left-0 top-0 h-screen w-[240px] z-30 ${sidebarClass}`}
          >
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
          <div className="fixed top-6 right-6 md:hidden z-40 select-none">
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1.8"
                className="flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {theme === "minimal-dark" ? "lightmode.sh" : "darkmode.sh"}
              </span>
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
