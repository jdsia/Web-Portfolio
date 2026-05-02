import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-50/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-sm font-medium tracking-wide">ETHAN SIA</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-sm font-light hover:font-medium transition-all duration-200">HOME</a>
              <a href="#about" className="text-sm font-light hover:font-medium transition-all duration-200">ABOUT</a>
              <a href="#skills" className="text-sm font-light hover:font-medium transition-all duration-200">SKILLS</a>
              <a href="#projects" className="text-sm font-light hover:font-medium transition-all duration-200">PROJECTS</a>
              <a href="#experience" className="text-sm font-light hover:font-medium transition-all duration-200">EXPERIENCE</a>
              <a href="#education" className="text-sm font-light hover:font-medium transition-all duration-200">EDUCATION</a>
              <a href="#contact" className="text-sm font-light hover:font-medium transition-all duration-200">CONTACT</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-8">Ethan Sia</h1>
          <p className="text-lg md:text-xl font-light text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Sophomore at De La Salle University Manila studying Computer Science majoring in Software Technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
              VIEW PROJECTS
            </button>
            <button className="border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
              DOWNLOAD RESUME
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">About</h2>
          <div className="space-y-6 text-center">
            <p className="text-lg font-light text-gray-600 leading-relaxed">
              Your detailed background and story will go here. Talk about your passion for technology,
              your journey in computer science, and what drives you as a developer.
            </p>
            <p className="text-lg font-light text-gray-600 leading-relaxed">
              Include information about your interests, goals, and what makes you unique as a student
              and aspiring software developer.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">Skills</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 tracking-wide">Programming Languages</h3>
              <div className="space-y-3">
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">JavaScript</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Python</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">TypeScript</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Java</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 tracking-wide">Frameworks & Tools</h3>
              <div className="space-y-3">
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">React</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Next.js</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Node.js</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Git</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 tracking-wide">Soft Skills</h3>
              <div className="space-y-3">
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Problem Solving</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Teamwork</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Communication</div>
                <div className="border border-gray-300 rounded px-4 py-2 text-sm font-light">Time Management</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <div key={project} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors duration-300">
                <div className="h-48 bg-gray-100"></div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-3">Project Title {project}</h3>
                  <p className="text-sm font-light text-gray-600 mb-6 leading-relaxed">
                    Brief description of your project. What problem does it solve and what technologies did you use?
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="border border-gray-300 text-xs px-3 py-1 rounded font-light">React</span>
                    <span className="border border-gray-300 text-xs px-3 py-1 rounded font-light">Node.js</span>
                    <span className="border border-gray-300 text-xs px-3 py-1 rounded font-light">MongoDB</span>
                  </div>
                  <div className="flex space-x-6">
                    <button className="text-sm font-light underline hover:no-underline">VIEW DEMO</button>
                    <button className="text-sm font-light underline hover:no-underline">GITHUB</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">Experience</h2>
          <div className="space-y-12">
            <div className="border-l border-gray-300 pl-8">
              <h3 className="text-lg font-medium mb-2">Position Title</h3>
              <p className="text-sm font-light text-gray-600 mb-4">Company Name | Month Year - Present</p>
              <p className="text-sm font-light text-gray-700 leading-relaxed">
                Description of your responsibilities and achievements in this role.
                Focus on technical skills and impact.
              </p>
            </div>
            <div className="border-l border-gray-300 pl-8">
              <h3 className="text-lg font-medium mb-2">Another Position</h3>
              <p className="text-sm font-light text-gray-600 mb-4">Another Company | Month Year - Month Year</p>
              <p className="text-sm font-light text-gray-700 leading-relaxed">
                Description of your responsibilities and achievements. Include specific projects
                and technologies you worked with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">Education</h2>
          <div className="border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-medium mb-3">De La Salle University Manila</h3>
            <p className="text-sm font-light text-gray-600 mb-2">Bachelor of Science in Computer Science</p>
            <p className="text-sm font-light text-gray-600 mb-4">Major in Software Technology</p>
            <p className="text-sm font-light text-gray-600 mb-6">Expected Graduation: Month Year</p>
            <div>
              <h4 className="text-sm font-medium mb-3 tracking-wide">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="border border-gray-300 text-xs px-3 py-1 rounded font-light">Data Structures</span>
                <span className="border border-gray-300 text-xs px-3 py-1 rounded font-light">Algorithms</span>
                <span className="border border-gray-300 text-xs px-3 py-1 rounded font-light">Web Development</span>
                <span className="border border-gray-300 text-xs px-3 py-1 rounded font-light">Database Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">Contact</h2>
          <div className="text-center">
            <p className="text-lg font-light text-gray-600 mb-12 leading-relaxed">
              I'm always interested in hearing about new opportunities and collaborations.
              Feel free to reach out!
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-light focus:outline-none focus:border-gray-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-light focus:outline-none focus:border-gray-500 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm font-light focus:outline-none focus:border-gray-500 transition-colors resize-none"
              ></textarea>
              <button className="w-full border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
                SEND MESSAGE
              </button>
            </div>
            <div className="mt-12 flex justify-center space-x-8">
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200">GITHUB</a>
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200">LINKEDIN</a>
              <a href="#" className="text-sm font-light hover:font-medium transition-all duration-200">EMAIL</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
