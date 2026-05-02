"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

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
      <nav className="fixed top-0 w-full backdrop-blur-sm z-50 border-b" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--card-border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="https://github.com/jdsia" className="text-base font-medium tracking-wide" style={{ color: 'var(--foreground)' }}>JDSIA</a>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-base font-light hover:font-medium transition-all duration-200 hover-lift" style={{ color: 'var(--foreground)' }}>HOME</a>
              <a href="#about" className="text-base font-light hover:font-medium transition-all duration-200 hover-lift" style={{ color: 'var(--foreground)' }}>ABOUT</a>
              <a href="#skills" className="text-base font-light hover:font-medium transition-all duration-200 hover-lift" style={{ color: 'var(--foreground)' }}>SKILLS</a>
              <a href="#projects" className="text-base font-light hover:font-medium transition-all duration-200 hover-lift" style={{ color: 'var(--foreground)' }}>PROJECTS</a>
              <a href="#experience" className="text-base font-light hover:font-medium transition-all duration-200 hover-lift" style={{ color: 'var(--foreground)' }}>EXPERIENCE</a>
              <a href="#education" className="text-base font-light hover:font-medium transition-all duration-200 hover-lift" style={{ color: 'var(--foreground)' }}>EDUCATION</a>
              <a href="#contact" className="text-base font-light hover:font-medium transition-all duration-200 hover-lift" style={{ color: 'var(--foreground)' }}>CONTACT</a>
              <button
                onClick={toggleTheme}
                className="ml-8 p-2 border rounded transition-colors duration-200 hover-lift"
                style={{ 
                  borderColor: 'var(--card-border)', 
                  color: 'var(--foreground)' 
                }}
                aria-label="Toggle dark mode"
              >
                {isDark ? 'LIGHT' : 'DARK'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-8" style={{ color: 'var(--foreground)' }}>Ethan Sia</h1>
          <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Sophomore studying BS Computer Science Major in Software Technology student at De La Salle University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="border px-8 py-3 text-sm font-medium hover:bg-opacity-90 transition-all duration-300 hover-lift" style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)' }}>
              VIEW PROJECTS
            </button>
            <a 
              href="/EthanSia.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border px-8 py-3 text-sm font-medium hover:bg-opacity-90 transition-all duration-300 inline-block hover-lift"
              style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)' }}
            >
              VIEW RESUME
            </a>
          </div>
        </div>
      </section>

      {/* Soft Separator */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: 'var(--card-border)' }}></div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center" style={{ color: 'var(--foreground)' }}>About</h2>
          <div className="space-y-6 text-center">
            <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Second-year Computer Science student focused on software development, systems, and Linux. I enjoy building practical projects and understanding how systems work under the hood.

With a background in competitive football and a growing interest in climbing, I bring discipline, consistency, and a problem-solving mindset to how I learn and build.
            </p>
          </div>
        </div>
      </section>

      {/* Soft Separator */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: 'var(--card-border)' }}></div>
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center" style={{ color: 'var(--foreground)' }}>Skills</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 tracking-wide">Programming Languages</h3>
              <div className="space-y-3">
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>JavaScript</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>C</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>TypeScript</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>Java</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>SQL</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 tracking-wide">Frameworks</h3>
              <div className="space-y-3">
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>React</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>Next.js</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>Node.js</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>MongoDB</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 tracking-wide">Tools</h3>
              <div className="space-y-3">
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>Git</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>Tailwind CSS</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>PostgreSQL</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>Linux (Ubuntu)</div>
                <div className="border rounded px-4 py-2 text-sm font-light" style={{ borderColor: 'var(--card-border)', color: 'var(--foreground)' }}>Vim</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Separator */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: 'var(--card-border)' }}></div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center" style={{ color: 'var(--foreground)' }}>Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg overflow-hidden hover:border-opacity-70 transition-all duration-300 hover-scale" style={{ borderColor: 'var(--card-border)' }}>
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
                  <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="border rounded font-light hover-scale" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-6">
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-light underline hover:no-underline hover-scale"
                      style={{ color: 'var(--foreground)' }}
                    >
                      VIEW DEMO
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-light underline hover:no-underline hover-scale"
                      style={{ color: 'var(--foreground)' }}
                    >
                      GITHUB
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Separator */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: 'var(--card-border)' }}></div>
      </div>

      {/* Experience Section */}
      <section id="experience" className="py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center" style={{ color: 'var(--foreground)' }}>Experience</h2>
          <div className="space-y-12">
            <div className="border-l pl-8" style={{ borderColor: 'var(--card-border)' }}>
              <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>Position Title</h3>
              <p className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>Company Name | Month Year - Present</p>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Description of your responsibilities and achievements in this role.
                Focus on technical skills and impact.
              </p>
            </div>
            <div className="border-l pl-8" style={{ borderColor: 'var(--card-border)' }}>
              <h3 className="text-lg font-medium mb-2">Another Position</h3>
              <p className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>Another Company | Month Year - Month Year</p>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Description of your responsibilities and achievements. Include specific projects
                and technologies you worked with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Separator */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: 'var(--card-border)' }}></div>
      </div>

      {/* Education Section */}
      <section id="education" className="py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center" style={{ color: 'var(--foreground)' }}>Education</h2>
          <div className="border rounded-lg p-8 hover-scale transition-all duration-300" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--foreground)' }}>De La Salle University Manila (2024 - Present)</h3>
            <p className="text-sm font-light mb-2" style={{ color: 'var(--text-secondary)' }}>Bachelor of Science in Computer Science</p>
            <p className="text-sm font-light mb-4" style={{ color: 'var(--text-secondary)' }}>Major in Software Technology</p>
            <p className="text-sm font-light mb-6" style={{ color: 'var(--text-secondary)' }}>Expected Graduation: Month Year</p>
            <div>
              <h4 className="text-sm font-medium mb-3 tracking-wide">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="border rounded font-light hover-scale" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>Data Structures</span>
                <span className="border rounded font-light hover-scale" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>Algorithms</span>
                <span className="border rounded font-light hover-scale" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>Web Development</span>
                <span className="border rounded font-light hover-scale" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}>Database Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Separator */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: 'var(--card-border)' }}></div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-24" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center" style={{ color: 'var(--foreground)' }}>Contact</h2>
          <div className="text-center">
            <p className="text-lg font-light mb-12 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I'm always interested in hearing about new opportunities and collaborations.
              Feel free to reach out!
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded font-light focus:outline-none transition-colors"
                style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded font-light focus:outline-none transition-colors"
                style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 border rounded font-light focus:outline-none transition-colors resize-none"
                style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' }}
              ></textarea>
              <button className="w-full border px-8 py-3 text-sm font-medium hover:bg-opacity-90 transition-all duration-300" style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)' }}>
                SEND MESSAGE
              </button>
            </div>
            <div className="mt-12 flex justify-center space-x-8">
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200" style={{ color: 'var(--foreground)' }}>GITHUB</a>
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200" style={{ color: 'var(--foreground)' }}>LINKEDIN</a>
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200" style={{ color: 'var(--foreground)' }}>EMAIL</a>
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200" style={{ color: 'var(--foreground)' }}>GITHUB</a>
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200" style={{ color: 'var(--foreground)' }}>LINKEDIN</a>
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200" style={{ color: 'var(--foreground)' }}>EMAIL</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
