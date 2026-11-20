"use client";

import { useState } from "react";
import { PROJECTS } from "./data/projects";
import { EXPERIENCES } from "./data/experiences";
import MinimalLoader from "./components/MinimalLoader";

const RESUME_URL =
  "https://drive.google.com/file/d/1QTJu-_ydM3wqzK-hJHZhFnM-S0vOAZL0/view?usp=sharing";

export default function Home() {
  const [hoveredExpId, setHoveredExpId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [pinnedKey, setPinnedKey] = useState<string | null>(
    EXPERIENCES[0] ? `exp:${EXPERIENCES[0].id}` : null,
  );

  const isExpOpen = (id: string) => pinnedKey === `exp:${id}`;
  const isProjectOpen = (id: string) => pinnedKey === `proj:${id}`;

  return (
    <div
      className="min-h-screen w-full bg-[#fafafa] text-[#111111] flex flex-col justify-between px-6 py-8 md:px-10 md:py-10 selection:bg-[#111111] selection:text-[#fafafa]"
      style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      <MinimalLoader />
      {/* Main Asymmetric Swiss Grid */}
      <main className="w-full my-auto py-8 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-8 items-start">
        {/* Left Sticky Column: Bio */}
        <aside className="md:col-span-4 md:sticky md:top-16 space-y-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#111111]">
            ETHAN SIA
          </p>
          <div
            className="space-y-3 max-w-[320px]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            <p className="text-[16px] font-medium leading-[1.5] text-[#111111]">
              Shipping software that works.
            </p>
            <p className="text-[14px] leading-[1.7] text-[#444444]">
              CS @ DLSU.
              <br />
              Full-stack software engineer specializing in React, TypeScript,
              Node.js, and AI-driven development.
            </p>
          </div>
          <div className="pt-1 flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.06em] uppercase text-[#666666]">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] transition-colors duration-200 ease-in-out"
            >
              Resume ↗
            </a>
          </div>
          <div className="pt-2 max-w-[320px]">
            <img
              src="/bio-texture.png"
              alt="Monochrome abstract texture"
              className="w-full h-auto object-cover border border-black/10 opacity-85 contrast-90 brightness-105"
            />
          </div>
        </aside>

        {/* Right Column: Experience, Projects, Contact */}
        <div className="md:col-span-7 md:col-start-6 space-y-20">
          {/* Experience Section */}
          <section id="experience">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#999999] mb-4">
              EXPERIENCE
            </p>

            <ul>
              {EXPERIENCES.map((exp, idx) => {
                const num = String(EXPERIENCES.length - idx).padStart(2, "0");
                const open = isExpOpen(exp.id);
                const dimmed = hoveredExpId !== null && hoveredExpId !== exp.id;

                return (
                  <li
                    key={exp.id}
                    onMouseEnter={() => setHoveredExpId(exp.id)}
                    onMouseLeave={() => setHoveredExpId(null)}
                    onClick={() =>
                      setPinnedKey((prev) =>
                        prev === `exp:${exp.id}` ? null : `exp:${exp.id}`,
                      )
                    }
                    className={`cursor-pointer transition-opacity duration-200 ease-in-out ${
                      dimmed ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    {/* Summary Row */}
                    <div className="flex items-baseline justify-between gap-4 py-3.5 text-[12px] tracking-[0.02em]">
                      <div className="flex items-baseline gap-8 sm:gap-14 md:gap-20 min-w-0">
                        <span className="text-[#888888] tabular-nums shrink-0">
                          {num}/
                        </span>
                        <span
                          className={`relative inline-block transition-transform duration-200 ease-in-out ${
                            open
                              ? "translate-x-1 text-[#000000]"
                              : "text-[#222222]"
                          }`}
                        >
                          {exp.role}
                          <span
                            className={`absolute left-0 -bottom-0.5 h-[1px] w-full bg-[#111111] origin-left transition-transform duration-300 ease-in-out ${
                              hoveredExpId === exp.id
                                ? "scale-x-100"
                                : "scale-x-0"
                            }`}
                          />
                        </span>
                      </div>

                      <span className="text-[#444444] text-[11px] tabular-nums shrink-0 text-right">
                        {exp.period}
                      </span>
                    </div>

                    {/* Expandable Details Below Row */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-12 sm:pl-[5rem] md:pl-[6.5rem] pb-6 pt-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.08em] text-[#777777]">
                            {exp.subtitles.map((sub, sIdx) => (
                              <span key={sIdx}>{sub}</span>
                            ))}
                          </div>

                          {exp.tags && exp.tags.length > 0 && (
                            <p className="text-[10px] uppercase tracking-[0.08em] text-[#999999]">
                              {exp.tags.join(" · ")}
                            </p>
                          )}

                          <ul
                            className="space-y-2 text-[13px] leading-[1.65] text-[#333333] max-w-2xl"
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            {(exp.bullets && exp.bullets.length > 0
                              ? exp.bullets
                              : [exp.description]
                            ).map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-2.5">
                                <span className="text-[#999999] select-none">
                                  —
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          {exp.extraSubtitles &&
                            exp.extraSubtitles.map((extra, exIdx) => (
                              <p
                                key={exIdx}
                                className="text-[10px] uppercase tracking-[0.08em] text-[#666666] pt-1"
                              >
                                {extra}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Projects Section */}
          <section id="projects">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#999999] mb-4">
              PROJECTS
            </p>

            <ul>
              {PROJECTS.map((project, idx) => {
                const num = String(PROJECTS.length - idx).padStart(2, "0");
                const open = isProjectOpen(project.id);
                const dimmed =
                  hoveredProjectId !== null && hoveredProjectId !== project.id;

                return (
                  <li
                    key={project.id}
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() =>
                      setPinnedKey((prev) =>
                        prev === `proj:${project.id}`
                          ? null
                          : `proj:${project.id}`,
                      )
                    }
                    className={`cursor-pointer transition-opacity duration-200 ease-in-out ${
                      dimmed ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    {/* Summary Row */}
                    <div className="flex items-baseline justify-between gap-4 py-3.5 text-[12px] tracking-[0.02em]">
                      <div className="flex items-baseline gap-8 sm:gap-14 md:gap-20 min-w-0">
                        <span className="text-[#888888] tabular-nums shrink-0">
                          {num}/
                        </span>
                        <span
                          className={`relative inline-block transition-transform duration-200 ease-in-out ${
                            open
                              ? "translate-x-1 text-[#000000]"
                              : "text-[#222222]"
                          }`}
                        >
                          {project.title}
                          <span
                            className={`absolute left-0 -bottom-0.5 h-[1px] w-full bg-[#111111] origin-left transition-transform duration-300 ease-in-out ${
                              hoveredProjectId === project.id
                                ? "scale-x-100"
                                : "scale-x-0"
                            }`}
                          />
                        </span>
                      </div>
                    </div>

                    {/* Expandable Details Below Row */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-12 sm:pl-[5rem] md:pl-[6.5rem] pb-6 pt-1 space-y-4">
                          <p className="text-[10px] uppercase tracking-[0.08em] text-[#999999]">
                            {project.technologies.join(" · ")}
                          </p>

                          <ul
                            className="space-y-2 text-[13px] leading-[1.65] text-[#333333] max-w-2xl"
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            {project.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-2.5">
                                <span className="text-[#999999] select-none">
                                  —
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          {project.github && (
                            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.06em] text-[#555555]">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="underline underline-offset-4 decoration-black/20 hover:text-[#111111] hover:decoration-black transition-colors duration-200 ease-in-out"
                              >
                                GitHub ↗
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Contact Section */}
          <section id="contact" className="pt-2">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#999999] mb-4">
              CONTACT
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[12px]">
              <a
                href="mailto:siaethan83@gmail.com"
                className="hover:opacity-55 transition-opacity duration-200 ease-in-out"
              >
                siaethan83@gmail.com
              </a>
              <a
                href="https://github.com/jdsia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity duration-200 ease-in-out"
              >
                github.com/jdsia
              </a>
              <a
                href="https://linkedin.com/in/ethan-sia-807500358"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity duration-200 ease-in-out"
              >
                LinkedIn ↗
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-12 flex items-center justify-between text-[11px] text-[#777777]">
        <span>2026</span>
        <span className="uppercase tracking-[0.08em]">MANILA, PH</span>
      </footer>
    </div>
  );
}
