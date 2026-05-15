"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Add project info here
const projects = [
  {
    id: 1,
    title: "Hair Salon Internal Inventory System",
    description: "Full-stack inventory management platform developed for a local salon business to streamline daily operations and inventory workflows. The system features real-time stock tracking, transaction processing, an analytics dashboards, and role-based authentication. Designed to support high-volume operations while improving inventory visibility, reducing manual tracking, and providing actionable business insights through a scalable REST API architecture.",
    image: "/salon-inventory.png", // You can add images to public folder
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Tailwind CSS", "JWT", "Vite", "Render", "Vercel"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Collaborative Text Editor (Google Docs Clone)",
    description: "WIP: Built a collaborative document editor to learn the fundamentals of real-time systems. Implementing live cursor sync, multiplayer editing, and conflict-free state management using React, Node.js, WebSockets, and Yjs CRDTs.",
    image: "", // You can add images to public folder
    technologies: ["React", "TypeScript", "Node.js", "WebSockets", "Yjs", "Supabase", "TipTap", "Zustand", "Express", "Vite"],
    demoUrl: "",
    githubUrl: "https://github.com/jdsia/MD-Editor-WSocket"
  },
  {
    id: 3,
    title: "Zendo",
    description: "Zendo is a full-stack to-do application built with MERN stack. focusing on clarity and ease of use, allowing you to create, organize, and manage tasks without distraction.",
    image: "/zendo.png", // You can add images to public folder
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vite"],
    demoUrl: "https://zendo-app-nine.vercel.app/",
    githubUrl: "https://github.com/jdsia/Zendo"
  },
  {
    id: 4,
    title: "Flood Control Data Analysis Pipeline",
    description: "Built a command line utility using vanilla JS to process real world DPWH flood control datasets from csv files, performing preprocessing, aggregation, and final report generation.",
    image: "/pipeline.png", // You can add images to public folder
    technologies: ["Node.js", "csv-parse", "fast-csv"],
    demoUrl: "#",
    githubUrl: "https://github.com/jdsia/CSADPRG-MCO2"
  }
];

export default function Home() {

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-8 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="uppercase tracking-widest mb-6" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            Hi i'm ETHAN SIA
          </h1>
          <p className="max-w-4xl mx-auto leading-relaxed mb-16" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.5rem', fontWeight: 400 }}>
           Studying CS @ DLSU  
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#projects" className="tracking-widest uppercase border-b-2 pb-2 hover:opacity-70 transition-all duration-300 px-8 py-3" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
              View Projects
            </a>
            <a 
              href="https://drive.google.com/drive/u/0/folders/135D34vp7vVqp8yJuy76m2zc0nDOTtOgZ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tracking-widest uppercase border-b-2 pb-2 hover:opacity-70 transition-all duration-300 px-8 py-3"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              View Resume
            </a>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <a href="#projects" className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 group">
              <span className="text-xs tracking-widest uppercase transition-colors duration-300 group-hover:text-[var(--primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: 'var(--on-surface-variant)' }}></span>
              <svg className="w-6 h-6 transition-all duration-300 group-hover:text-[var(--primary)] animate-bounce" style={{ color: 'var(--on-surface-variant)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      

      {/* About Section */}
      <section id="about" className="px-8 md:px-16 py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="uppercase tracking-widest mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '2.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>ABOUT</h2>
          <p className="max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.125rem', fontWeight: 400 }}>
            Computer Science student at De La Salle University focused on software development and web technologies. I enjoy building full-stack applications, learning new technologies, and creating practical solutions to real-world problems. Outside of coding, I spend my time playing football, running, and bouldering.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-8 md:px-16 py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="uppercase tracking-widest mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '2.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>PROJECTS</h2>
          <p className="max-w-3xl mx-auto" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.25rem', fontWeight: 400 }}>
            Work and personal projects
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="border rounded-lg overflow-hidden hover-scale transition-all duration-300" style={{ borderColor: 'var(--card-border)' }}>
                <div className="h-48" style={{ backgroundColor: 'var(--background)' }}>
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-3" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.25rem', fontWeight: 600 }}>{project.title}</h3>
                  <p className="leading-relaxed mb-6" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="border rounded px-3 py-1" style={{ borderColor: 'var(--card-border)', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.875rem', fontWeight: 400 }}>{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-6">
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm tracking-widest uppercase border-b-2 pb-1 hover:opacity-70 transition-opacity"
                      style={{ borderColor: 'var(--primary)', color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                    >
                      View Demo
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm tracking-widest uppercase border-b-2 pb-1 hover:opacity-70 transition-opacity"
                      style={{ borderColor: 'var(--primary)', color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
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

      {/* Experience Section */}
      <section id="experience" className="px-8 md:px-16 py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="uppercase tracking-widest mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '2.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>EXPERIENCE</h2>
          <p className="max-w-3xl mx-auto" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.25rem', fontWeight: 400 }}>
            #employed 
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-[1px] h-full" style={{ backgroundColor: 'var(--card-border)' }}></div>
              <div className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
              <p className="mb-2" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.875rem', fontWeight: 400 }}>April — May 2026</p>
              <h3 className="font-bold mb-1" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.25rem', fontWeight: 600 }}>Full-Stack Developer (Freelance)</h3>
              <p className="mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>Local Hair Salon Business (Remote)</p>
              <ul className="space-y-2 list-disc list-inside" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>
                <li>Built a full-stack salon inventory system featuring multi-type transaction tracking, delivery/order management, and real-time stock validation using Node.js, Express, Prisma ORM, and PostgreSQL on Supabase</li>
                <li>Implemented JWT authentication with role-based access control (Admin/Staff), audit logging, and low-stock alerting to support daily salon operations</li>
                <li>Deployed a responsive React (Vite) + Tailwind CSS frontend on Vercel, and hosted the backend on Render with connection pooling and a Git-based release workflow</li>
              </ul>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-[1px] h-full" style={{ backgroundColor: 'var(--card-border)' }}></div>
              <div className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--on-surface-variant)' }}></div>
              <p className="mb-2" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.875rem', fontWeight: 400 }}>Oct. 2025 — Present</p>
              <h3 className="font-bold mb-1" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.25rem', fontWeight: 600 }}>Officer, Internals Committee</h3>
              <p className="mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>DLSU Futsal Club, De La Salle University</p>
              <ul className="space-y-2 list-disc list-inside" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>
                <li>Coordinated logistics and planning for internal club events including team-building events, social gatherings, and training sessions</li>
                <li>Maintained and tracked attendance records for 200+ club members to support event planning and internal coordination</li>
                <li>Oversee internal operations to ensure smooth communication and administrative efficiency within the club</li>
              </ul>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-[1px] h-full" style={{ backgroundColor: 'var(--card-border)' }}></div>
              <div className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--on-surface-variant)' }}></div>
              <p className="mb-2" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.875rem', fontWeight: 400 }}>Oct. 2025 — Present</p>
              <h3 className="font-bold mb-1" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.25rem', fontWeight: 600 }}>Relations Executive</h3>
              <p className="mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>Google Developer Groups on Campus, De La Salle University</p>
              <ul className="space-y-2 list-disc list-inside" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>
                <li>Handled partnerships and relations with both External and Internal Organizations of the Google Developer Groups on Campus - De La Salle University</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-8 md:px-16 py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="uppercase tracking-widest mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '2.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>SKILLS</h2>
          <p className="max-w-3xl mx-auto" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.25rem', fontWeight: 400 }}>
            Technologies I work with
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Languages */}
          <div className="mb-12">
            <h3 className="font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.5rem', fontWeight: 600 }}>Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Java</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Python</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>C</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>JavaScript</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>TypeScript</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>SQL</div>
              </div>
            </div>
          </div>
          
          {/* Frameworks & Libraries */}
          <div className="mb-12">
            <h3 className="font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.5rem', fontWeight: 600 }}>Frameworks & Libraries</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>React</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Node.js</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Express</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Tailwind CSS</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Prisma ORM</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Next.js</div>
              </div>
            </div>
          </div>
          
          {/* Databases */}
          <div className="mb-12">
            <h3 className="font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.5rem', fontWeight: 600 }}>Databases</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>PostgreSQL</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>MongoDB</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>MySQL</div>
              </div>
            </div>
          </div>
          
          {/* Tools & Platforms */}
          <div className="mb-12">
            <h3 className="font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.5rem', fontWeight: 600 }}>Tools & Platforms</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Git</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Linux</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Vim</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>VS Code</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Supabase</div>
              </div>
              <div className="border rounded-lg p-2 text-center transition-all duration-300 hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] group" style={{ borderColor: 'var(--card-border)' }}>
                <div className="transition-colors duration-300 group-hover:text-[var(--on-primary)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--on-surface)' }}>Render</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-16 border-t" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--card-border)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="uppercase tracking-widest mb-4" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '2rem', fontWeight: 600, letterSpacing: '0.05em' }}>CONNECT</h3>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--on-surface)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1.125rem', fontWeight: 400 }}>
              Feel free to reach out for collaborations
            </p>
          </div>
          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://github.com/jdsia" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>GitHub</a>
            <a href="https://linkedin.com/in/ethan-sia-807500358" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>LinkedIn</a>
            <a href="" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--primary)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '1rem', fontWeight: 400 }}>siaethan83@gmail.com</a>
          </div>
          <div className="text-center">
            <p style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.875rem', fontWeight: 400 }}>
              © 2026 Ethan Sia. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
