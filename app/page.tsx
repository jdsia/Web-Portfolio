"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
  },
  {
    id: 2,
    title: "Hair Salon Inventory System",
    description: "Full-stack inventory platform for salon business handling hundreds of monthly customers with real-time stock computation and role-based authentication.",
    image: "/salon-inventory.png", // You can add images to public folder
    technologies: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "React", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#"
  }
];

export default function Home() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const typingDuration = 1500; // 1.5 seconds for typing animation
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, typingDuration);

    return () => clearTimeout(timer);
  }, []);

  
  // Scroll animation hook
  const useScrollAnimation = () => {
    const elementRef = useRef(null);
    
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(element);
      
      return () => observer.disconnect();
    }, []);
    
    return elementRef;
  };

  // Enhanced scroll animation for multiple elements
  const useScrollAnimationMultiple = () => {
    const containerRef = useRef(null);
    
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Animate container
              entry.target.classList.add('animate-in');
              
              // Animate child elements with stagger
              const skillItems = entry.target.querySelectorAll('.skill-item');
              const projectCards = entry.target.querySelectorAll('.project-card');
              const timelineItems = entry.target.querySelectorAll('.timeline-item');
              
              skillItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('animate-in');
                }, index * 50);
              });
              
              projectCards.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('animate-in');
                }, index * 100);
              });
              
              timelineItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('animate-in');
                }, index * 200);
              });
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(container);
      
      return () => observer.disconnect();
    }, []);
    
    return containerRef;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center animate-section">
          <div className="typing-container">
  <span className={`font-headline-lg text-headline-lg uppercase tracking-widest block mb-ma-unit ${isTypingComplete ? 'typing-complete' : 'typing-text'}`} style={{ color: 'var(--on-surface-variant)' }}>Ethan Sia</span>
  {isTypingComplete && <span className="typing-cursor"></span>}
</div>
          <p className="font-headline-xl text-headline-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-in-delay-3" style={{ color: 'var(--on-surface)' }}>
            Sophomore studying BS Computer Science Major in Software Technology at De La Salle University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in-delay-4">
            <a href="#projects" className="font-body-lg text-body-lg tracking-widest uppercase border-b-[1px] pb-1 hover:opacity-60 transition-all duration-300" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              View Projects
            </a>
            <a 
              href="https://drive.google.com/drive/u/0/folders/135D34vp7vVqp8yJuy76m2zc0nDOTtOgZ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-body-lg text-body-lg tracking-widest uppercase border-b-[1px] pb-1 hover:opacity-60 transition-all duration-300"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              View Resume
            </a>
          </div>
        </div>
      </section>

      

      {/* Projects Section */}
      <section id="projects" className="px-8 md:px-16" style={{ backgroundColor: 'var(--card-bg)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-6xl mx-auto animate-section" ref={useScrollAnimationMultiple()}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-12 flex justify-between items-end mb-element-gap">
              <div>
                <span className="font-body-md text-body-md uppercase tracking-widest block mb-ma-unit" style={{ color: 'var(--on-surface-variant)' }}>PROJECTS</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <div key={project.id} className="border rounded-lg overflow-hidden hover-scale transition-all duration-300 project-card" style={{ borderColor: 'var(--card-border)', animationDelay: `${index * 0.1}s` }}>
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
        <div className="max-w-6xl mx-auto animate-section" ref={useScrollAnimationMultiple()}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-12 md:col-span-12 flex justify-between items-end mb-element-gap">
              <div>
                <span className="font-body-md text-body-md uppercase tracking-widest block mb-ma-unit" style={{ color: 'var(--on-surface-variant)' }}>EXPERIENCE</span>
                <h2 className="font-headline-lg text-headline-lg" style={{ color: 'var(--primary)' }}>Professional Experience</h2>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <div className="space-y-12">
                <div className="relative pl-8 timeline-item">
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
                <div className="relative pl-8 timeline-item">
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

            
    </div>
  );
}
