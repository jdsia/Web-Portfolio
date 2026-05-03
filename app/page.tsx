"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

// Add project info here
const projects = [
  {
    id: 1,
    title: "Zendo",
    description: "Zendo is a full-stack to-do application built with MERN stack. It focuses on clarity and ease of use, allowing you to create, organize, and manage tasks without distraction.",
    image: "/zendo.png", // You can add images to public folder
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vite"],
    demoUrl: "https://zendo-app-nine.vercel.app/",
    githubUrl: "https://github.com/jdsia/Zendo"
  }
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b-[0.5px] border-zinc-900/10 flex justify-between items-center h-16 px-8 md:px-16" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <a href="https://github.com/jdsia" className="font-headline-lg text-primary tracking-tighter uppercase" style={{ color: 'var(--foreground)' }}>JDSIA</a>
        <div className="hidden md:flex gap-12 items-center">
          <a href="#home" className="font-headline-md text-sm tracking-widest uppercase hover:opacity-60 transition-opacity" style={{ color: 'var(--foreground)' }}>Home</a>
          <a href="#about" className="font-headline-md text-sm tracking-widest uppercase hover:opacity-60 transition-opacity" style={{ color: 'var(--on-surface-variant)' }}>About</a>
          <a href="#skills" className="font-headline-md text-sm tracking-widest uppercase hover:opacity-60 transition-opacity" style={{ color: 'var(--on-surface-variant)' }}>Skills</a>
          <a href="#projects" className="font-headline-md text-sm tracking-widest uppercase hover:opacity-60 transition-opacity" style={{ color: 'var(--on-surface-variant)' }}>Projects</a>
          <a href="#experience" className="font-headline-md text-sm tracking-widest uppercase hover:opacity-60 transition-opacity" style={{ color: 'var(--on-surface-variant)' }}>Experience</a>
          <a href="#education" className="font-headline-md text-sm tracking-widest uppercase hover:opacity-60 transition-opacity" style={{ color: 'var(--on-surface-variant)' }}>Education</a>
          <button
            onClick={toggleTheme}
            className="font-label-sm text-sm tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{ color: 'var(--on-surface-variant)' }}
            aria-label="Toggle dark mode"
          >
            {isDark ? 'LIGHT' : 'DARK'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-32 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-label-sm text-label-sm uppercase tracking-widest block mb-ma-unit" style={{ color: 'var(--on-surface-variant)' }}>01 — Ethan Sia</span>
          <h1 className="font-headline-xl text-headline-xl mb-element-gap" style={{ color: 'var(--primary)' }}>Constructing digital systems with intention.</h1>
          <p className="font-body-lg text-body-lg max-w-2xl mx-auto leading-relaxed mb-12" style={{ color: 'var(--on-surface)' }}>
            Sophomore studying BS Computer Science Major in Software Technology at De La Salle University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="font-label-sm text-sm tracking-widest uppercase border-b-[1px] pb-1 hover:opacity-60 transition-all duration-300" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              View Projects
            </a>
            <a 
              href="/EthanSia.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-label-sm text-sm tracking-widest uppercase border-b-[1px] pb-1 hover:opacity-60 transition-all duration-300"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 md:px-16" style={{ backgroundColor: 'var(--card-bg)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-4 sticky top-32 h-fit">
              <p className="font-label-sm text-label-sm uppercase tracking-widest" style={{ color: 'var(--on-surface-variant)' }}>About Me</p>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-element-gap">
              <div className="prose max-w-none">
                <p className="font-body-lg text-body-lg mb-8" style={{ color: 'var(--on-surface)' }}>
                  Second-year Computer Science student focused on software development, systems, and Linux. I enjoy building practical projects and understanding how systems work under the hood.
                </p>
                <p className="font-body-md text-body-md leading-loose" style={{ color: 'var(--on-surface-variant)' }}>
                  With a background in competitive football and a growing interest in climbing, I bring discipline, consistency, and a problem-solving mindset to how I learn and build.
                </p>
              </div>
              <div className="h-[0.5px] w-full" style={{ backgroundColor: 'var(--card-border)' }}></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-8 md:px-16" style={{ backgroundColor: 'var(--card-bg)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-12 flex justify-between items-end mb-element-gap">
              <div>
                <span className="font-body-md text-body-md uppercase tracking-widest block mb-ma-unit" style={{ color: 'var(--on-surface-variant)' }}>02 — SKILLS</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 space-y-16">
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-widest mb-8" style={{ color: 'var(--on-surface-variant)' }}>Programming Languages</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>JavaScript</span>
                  </div>
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>TypeScript</span>
                  </div>
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Java</span>
                  </div>
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Python</span>
                  </div>
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>C</span>
                  </div>
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>SQL</span>
                  </div>
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>HTML</span>
                  </div>
                  <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                    <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>CSS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <h3 className="font-label-sm text-label-sm uppercase tracking-widest mb-8" style={{ color: 'var(--on-surface-variant)' }}>Frameworks & Libraries</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>React</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Node.js</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Express</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Tailwind CSS</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Prisma ORM</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <h3 className="font-label-sm text-label-sm uppercase tracking-widest mb-8" style={{ color: 'var(--on-surface-variant)' }}>Tools & Platforms</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>PostgreSQL</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>MongoDB</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>MySQL</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Git</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Linux</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Vim</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>VS Code</span>
                </div>
                <div className="flex justify-between items-center py-5 border-b-[0.5px] group" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="font-body-md font-medium" style={{ color: 'var(--on-surface)' }}>Vite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-8 md:px-16" style={{ backgroundColor: 'var(--card-bg)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-12 flex justify-between items-end mb-element-gap">
              <div>
                <span className="font-body-md text-body-md uppercase tracking-widest block mb-ma-unit" style={{ color: 'var(--on-surface-variant)' }}>03 — PROJECTS</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
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
                      <h3 className="font-body-lg font-medium mb-3" style={{ color: 'var(--on-surface)' }}>{project.title}</h3>
                      <p className="font-body-md leading-relaxed mb-6" style={{ color: 'var(--on-surface-variant)' }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="font-label-sm border rounded px-3 py-1" style={{ borderColor: 'var(--card-border)', color: 'var(--on-surface-variant)' }}>{tech}</span>
                        ))}
                      </div>
                      <div className="flex space-x-6">
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-label-sm text-sm tracking-widest uppercase border-b-[1px] pb-1 hover:opacity-60 transition-opacity"
                          style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                        >
                          View Demo
                        </a>
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-label-sm text-sm tracking-widest uppercase border-b-[1px] pb-1 hover:opacity-60 transition-opacity"
                          style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-8 md:px-16" style={{ backgroundColor: 'var(--card-bg)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-12 flex justify-between items-end mb-element-gap">
              <div>
                <span className="font-body-md text-body-md uppercase tracking-widest block mb-ma-unit" style={{ color: 'var(--on-surface-variant)' }}>04 — EXPERIENCE</span>
                <h2 className="font-headline-lg text-headline-lg" style={{ color: 'var(--primary)' }}>Professional Experience</h2>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="space-y-12">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-[1px] h-full" style={{ backgroundColor: 'var(--card-border)' }}></div>
                  <div className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                  <p className="font-label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>Oct. 2025 — Present</p>
                  <h4 className="font-body-lg font-bold" style={{ color: 'var(--on-surface)' }}>Officer, Internals Committee</h4>
                  <p className="font-body-md" style={{ color: 'var(--on-surface-variant)' }}>DLSU Futsal Club, De La Salle University</p>
                  <ul className="mt-4 font-body-md space-y-2 list-disc list-inside" style={{ color: 'var(--on-surface-variant)' }}>
                    <li>Coordinated logistics and planning for internal club events including team-building events, social gatherings, and training sessions</li>
                    <li>Maintained and tracked attendance records for 200+ club members to support event planning and internal coordination</li>
                    <li>Oversee internal operations to ensure smooth communication and administrative efficiency within the club</li>
                  </ul>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-[1px] h-full" style={{ backgroundColor: 'var(--card-border)' }}></div>
                  <div className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--on-surface-variant)' }}></div>
                  <p className="font-label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>Oct. 2025 — Present</p>
                  <h4 className="font-body-lg font-bold" style={{ color: 'var(--on-surface)' }}>Relations Executive</h4>
                  <p className="font-body-md" style={{ color: 'var(--on-surface-variant)' }}>Google Developer Groups on Campus, De La Salle University</p>
                  <ul className="mt-4 font-body-md space-y-2 list-disc list-inside" style={{ color: 'var(--on-surface-variant)' }}>
                    <li>Handled partnerships and relations with both External and Internal Organizations of the Google Developer Groups on Campus - De La Salle University</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="px-8 md:px-16" style={{ backgroundColor: 'var(--card-bg)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-12 flex justify-between items-end mb-element-gap">
              <div>
                <span className="font-body-md text-body-md uppercase tracking-widest block mb-ma-unit" style={{ color: 'var(--on-surface-variant)' }}>05 — EDUCATION</span>
                <h2 className="font-headline-lg text-headline-lg" style={{ color: 'var(--primary)' }}>Academic Background</h2>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="relative pl-8">
                <div className="absolute left-0 top-2 w-[1px] h-full" style={{ backgroundColor: 'var(--card-border)' }}></div>
                <div className="absolute left-[-2px] top-2 w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                <p className="font-label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>2024 — Present</p>
                <h4 className="font-body-lg font-bold" style={{ color: 'var(--on-surface)' }}>BS Computer Science</h4>
                <p className="font-body-md" style={{ color: 'var(--on-surface-variant)' }}>De La Salle University — Software Technology Specialization</p>
                <p className="mt-4 font-body-md" style={{ color: 'var(--on-surface-variant)' }}>Focus on Data Structures, Algorithms, and Software Engineering Methodologies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
