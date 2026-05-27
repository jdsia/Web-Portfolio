"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HandParticleBackground from "./components/handParticleBackground";
import LoadingBar from "./components/LoadingBar";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

// Add project info here
const projects = [
  {
    id: 1,
    title: "Akyat",
    description:
      "Full-stack bouldering training and logging platform featuring JWT authentication, Supabase Auth, HTTP-only cookie session management, and role-scoped data isolation. Eliminates manual climb tracking via structured session logging with active-session persistence, and surfaces actionable training insights through an analytics dashboard with animated grade pyramids, performance trends, and a 'Climbing DNA' breakdown of hold types and wall angles.",
    image: "/akyat.png", // You can add images to public folder
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
    image: "/pipeline.png", // You can add images to public folder
    technologies: ["JavaScript", "Node.js", "CSV Parsing", "Data Analytics"],
    demoUrl: "#",
    githubUrl: "https://github.com/jdsia/CSADPRG-MCO2",
  },
];

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  // Wire up scroll-triggered fade animations (fadeOut=true so text fades back out)
  useScrollAnimation(true);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {showLoader && (
        <LoadingBar onComplete={() => setShowLoader(false)} />
      )}
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-8 md:px-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="uppercase tracking-widest mb-6"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            Hi i'm ETHAN SIA
          </h1>
          <p
            className="max-w-4xl mx-auto leading-relaxed mb-16"
            style={{
              color: "var(--on-surface)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "1.5rem",
              fontWeight: 400,
            }}
          >
            Studying CS @ DLSU
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#projects"
              className="tracking-widest uppercase border-b-2 pb-2 hover:opacity-70 transition-all duration-300 px-8 py-3"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              View Projects
            </a>
            <a
              href="https://drive.google.com/drive/u/0/folders/135D34vp7vVqp8yJuy76m2zc0nDOTtOgZ"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-widest uppercase border-b-2 pb-2 hover:opacity-70 transition-all duration-300 px-8 py-3"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              View Resume
            </a>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <a
              href="#projects"
              className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 group"
            >
              <span
                className="text-xs tracking-widest uppercase transition-colors duration-300 group-hover:text-[var(--primary)]"
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  color: "var(--on-surface-variant)",
                }}
              ></span>
              <svg
                className="w-6 h-6 transition-all duration-300 group-hover:text-[var(--primary)] animate-bounce"
                style={{ color: "var(--on-surface-variant)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-8 md:px-16 py-24"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="animate-section uppercase tracking-widest mb-4"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "2.5rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            ABOUT
          </h2>
          <p
            className="animate-section max-w-3xl mx-auto leading-relaxed"
            style={{
              color: "var(--on-surface)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "1.125rem",
              fontWeight: 400,
              transitionDelay: "0.15s",
            }}
          >
            Computer Science student at De La Salle University focused on
            software development and web technologies. I enjoy building
            full-stack applications, learning new technologies, and creating
            practical solutions to real-world problems. Outside of coding, I
            spend my time playing football, running, and bouldering.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="px-8 md:px-16 py-24 border-t"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="animate-section uppercase tracking-widest mb-12"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "2.5rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            EDUCATION
          </h2>
          <div
            className="animate-section border rounded-lg p-8 text-left hover-scale transition-all duration-300 max-w-2xl mx-auto"
            style={{
              borderColor: "var(--card-border)",
              backgroundColor: "var(--card-bg)",
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3
                  className="font-bold text-lg md:text-xl"
                  style={{
                    color: "var(--primary)",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                >
                  De La Salle University Manila
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--on-surface-variant)",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                >
                  Manila, Philippines
                </p>
              </div>
              <span
                className="text-sm mt-2 md:mt-0 px-3 py-1 border rounded"
                style={{
                  borderColor: "var(--card-border)",
                  color: "var(--primary)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                2024 – Present
              </span>
            </div>
            <p
              className="text-base md:text-lg"
              style={{
                color: "var(--on-surface)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              BS Computer Science, Major in Software Technology
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="px-8 md:px-16 py-24"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2
            className="animate-section uppercase tracking-widest mb-4"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "2.5rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            EXPERIENCE
          </h2>
          <p
            className="max-w-3xl mx-auto"
            style={{
              color: "var(--on-surface)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "1.25rem",
              fontWeight: 400,
            }}
          >
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="timeline-item relative pl-8">
              <div
                className="absolute left-0 top-2 w-[1px] h-full"
                style={{ backgroundColor: "var(--card-border)" }}
              ></div>
              <div
                className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full"
                style={{ backgroundColor: "var(--primary)" }}
              ></div>
              <p
                className="mb-2"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                }}
              >
                April 2025 – Present
              </p>
              <h3
                className="font-bold mb-1"
                style={{
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                }}
              >
                Co-Founder & Lead Engineer
              </h3>
              <p
                className="mb-4"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                Stackform (Remote)
              </p>
              <ul
                className="space-y-2 list-disc list-inside text-left"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                <li>
                  Architected and shipped full-stack inventory management system for local salon business using Node.js, Express,
                  Prisma ORM, PostgreSQL (Supabase), React (Vite) + Tailwind CSS — JWT authentication, RBAC (Admin/Staff),
                  audit logging, automated low-stock alerting
                </li>
                <li>
                  Replaced manual Excel/paper inventory with centralized software managing 500,000+ PHP in monthly
                  transactions — eliminated stock discrepancies, provided employee-level transaction visibility to reduce inventory loss,
                  providing single source of truth across transactions, deliveries, and supplier orders
                </li>
                <li>
                  Delivered embedded analytics surfacing consumption trends and underperforming stock, enabling data-informed
                  purchasing — reducing overstock costs and preventing operational stockouts
                </li>
              </ul>
            </div>
            <div className="timeline-item relative pl-8" style={{ transitionDelay: "0.15s" }}>
              <div
                className="absolute left-0 top-2 w-[1px] h-full"
                style={{ backgroundColor: "var(--card-border)" }}
              ></div>
              <div
                className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full"
                style={{ backgroundColor: "var(--on-surface-variant)" }}
              ></div>
              <p
                className="mb-2"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                }}
              >
                Oct. 2025 – Present
              </p>
              <h3
                className="font-bold mb-1"
                style={{
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                }}
              >
                Relations Executive - Industry Partnerships
              </h3>
              <p
                className="mb-4"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                Google Developer Groups on Campus, DLSU (Manila, Philippines)
              </p>
              <ul
                className="space-y-2 list-disc list-inside text-left"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                <li>
                  Managed external partnerships with student organizations and technical communities, coordinating event
                  collaborations and sponsorship engagements
                </li>
                <li>
                  Lead outreach communications to university and non-university organizations for event invitations and partnership
                  opportunities
                </li>
              </ul>
            </div>
            <div className="timeline-item relative pl-8" style={{ transitionDelay: "0.3s" }}>
              <div
                className="absolute left-0 top-2 w-[1px] h-full"
                style={{ backgroundColor: "var(--card-border)" }}
              ></div>
              <div
                className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full"
                style={{ backgroundColor: "var(--on-surface-variant)" }}
              ></div>
              <p
                className="mb-2"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                }}
              >
                Oct. 2025 – Present
              </p>
              <h3
                className="font-bold mb-1"
                style={{
                  color: "var(--on-surface)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                }}
              >
                Internals Committee Officer
              </h3>
              <p
                className="mb-4"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                DLSU Futsal Club (Manila, Philippines)
              </p>
              <ul
                className="space-y-2 list-disc list-inside text-left"
                style={{
                  color: "var(--on-surface-variant)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                <li>
                  Coordinate logistics for training sessions, team-building events, and social activities serving 200+ members — handling
                  scheduling and attendance tracking
                </li>
                <li>
                  Maintain internal records and communication workflows to support organizational planning and improve information
                  flow across the committee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section
        id="projects"
        className="px-8 md:px-16 py-24"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2
            className="animate-section uppercase tracking-widest mb-4"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "2.5rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            PROJECTS
          </h2>
          <p
            className="max-w-3xl mx-auto"
            style={{
              color: "var(--on-surface)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "1.25rem",
              fontWeight: 400,
            }}
          >
            Work and personal projects
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card border rounded-lg overflow-hidden hover-scale transition-all duration-300"
                style={{ borderColor: "var(--card-border)", transitionDelay: `${index * 0.15}s` }}
              >
                <div
                  className="h-48"
                  style={{ backgroundColor: "var(--background)" }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-sm"
                      style={{ color: "var(--on-surface-variant)" }}
                    >
                      No image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3
                    className="font-bold mb-3"
                    style={{
                      color: "var(--on-surface)",
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="leading-relaxed mb-6"
                    style={{
                      color: "var(--on-surface-variant)",
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="border rounded px-3 py-1"
                        style={{
                          borderColor: "var(--card-border)",
                          color: "var(--on-surface-variant)",
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                          fontSize: "0.875rem",
                          fontWeight: 400,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-6">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-widest uppercase border-b-2 pb-1 hover:opacity-70 transition-opacity"
                      style={{
                        borderColor: "var(--primary)",
                        color: "var(--primary)",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      View Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-widest uppercase border-b-2 pb-1 hover:opacity-70 transition-opacity"
                      style={{
                        borderColor: "var(--primary)",
                        color: "var(--primary)",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section
        id="skills"
        className="px-8 md:px-16 py-24"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2
            className="animate-section uppercase tracking-widest mb-4"
            style={{
              color: "var(--on-surface-variant)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "2.5rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            SKILLS
          </h2>
          <p
            className="max-w-3xl mx-auto"
            style={{
              color: "var(--on-surface)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "1.25rem",
              fontWeight: 400,
            }}
          >
            Technologies I work with
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Languages */}
          <div className="mb-12">
            <h3
              className="font-bold mb-6"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Java
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Python
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  C
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  JavaScript
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  TypeScript
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  SQL
                </div>
              </div>
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div className="mb-12">
            <h3
              className="font-bold mb-6"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Frameworks & Libraries
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  React
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Node.js
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Express
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Tailwind CSS
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Prisma ORM
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Next.js
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  OpenCV
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Mediapipe
                </div>
              </div>
            </div>
          </div>

          {/* Databases */}
          <div className="mb-12">
            <h3
              className="font-bold mb-6"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Databases
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  PostgreSQL
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  MongoDB
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  MySQL
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="mb-12">
            <h3
              className="font-bold mb-6"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Tools & Platforms
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Git
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Linux
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Vim
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  VS Code
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Supabase
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Render
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Vercel
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  GitHub Actions
                </div>
              </div>
            </div>
          </div>

          {/* Coursework */}
          <div className="mb-12">
            <h3
              className="font-bold mb-6"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Coursework
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Data Structures & Algorithms
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Object-Oriented Programming
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Discrete Mathematics
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Database Systems
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Software Engineering
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-12">
            <h3
              className="font-bold mb-6"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Interests
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Full-Stack Development
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  Backend Architecture
                </div>
              </div>
              <div
                className="skill-item border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div
                  className="transition-colors duration-300 group-hover:text-[var(--on-primary)]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                  }}
                >
                  IoT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-8 md:px-16 py-16 border-t"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h3
              className="animate-section uppercase tracking-widest mb-4"
              style={{
                color: "var(--on-surface-variant)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              CONNECT
            </h3>
            <p
              className="max-w-2xl mx-auto"
              style={{
                color: "var(--on-surface)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1.125rem",
                fontWeight: 400,
              }}
            >
              Feel free to reach out for collaborations
            </p>
          </div>
          <div className="flex justify-center space-x-8 mb-8">
            <a
              href="https://github.com/jdsia"
              className="hover:opacity-70 transition-opacity"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1rem",
                fontWeight: 400,
              }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ethan-sia-807500358"
              className="hover:opacity-70 transition-opacity"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1rem",
                fontWeight: 400,
              }}
            >
              LinkedIn
            </a>
            <a
              href=""
              className="hover:opacity-70 transition-opacity"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "1rem",
                fontWeight: 400,
              }}
            >
              siaethan83@gmail.com
            </a>
          </div>
          <div className="text-center">
            <p
              style={{
                color: "var(--on-surface-variant)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.875rem",
                fontWeight: 400,
              }}
            >
              © 2026 Ethan Sia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
