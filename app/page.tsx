import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">ES</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-blue-600 transition">Home</a>
              <a href="#about" className="hover:text-blue-600 transition">About</a>
              <a href="#skills" className="hover:text-blue-600 transition">Skills</a>
              <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
              <a href="#experience" className="hover:text-blue-600 transition">Experience</a>
              <a href="#education" className="hover:text-blue-600 transition">Education</a>
              <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Ethan Sia</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Sophomore at De La Salle University Manila studying Computer Science majoring in Software Technology
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
              View Projects
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              Your detailed background and story will go here. Talk about your passion for technology,
              your journey in computer science, and what drives you as a developer.
            </p>
            <p className="text-lg text-gray-600">
              Include information about your interests, goals, and what makes you unique as a student
              and aspiring software developer.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
              <div className="space-y-2">
                <div className="bg-gray-100 rounded px-4 py-2">JavaScript</div>
                <div className="bg-gray-100 rounded px-4 py-2">Python</div>
                <div className="bg-gray-100 rounded px-4 py-2">TypeScript</div>
                <div className="bg-gray-100 rounded px-4 py-2">Java</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Frameworks & Tools</h3>
              <div className="space-y-2">
                <div className="bg-gray-100 rounded px-4 py-2">React</div>
                <div className="bg-gray-100 rounded px-4 py-2">Next.js</div>
                <div className="bg-gray-100 rounded px-4 py-2">Node.js</div>
                <div className="bg-gray-100 rounded px-4 py-2">Git</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <div className="space-y-2">
                <div className="bg-gray-100 rounded px-4 py-2">Problem Solving</div>
                <div className="bg-gray-100 rounded px-4 py-2">Teamwork</div>
                <div className="bg-gray-100 rounded px-4 py-2">Communication</div>
                <div className="bg-gray-100 rounded px-4 py-2">Time Management</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <div key={project} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Project Title {project}</h3>
                  <p className="text-gray-600 mb-4">
                    Brief description of your project. What problem does it solve and what technologies did you use?
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">React</span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">Node.js</span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">MongoDB</span>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-blue-600 hover:underline">View Demo</button>
                    <button className="text-blue-600 hover:underline">GitHub</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-l-4 border-blue-600 pl-8">
              <h3 className="text-xl font-semibold">Position Title</h3>
              <p className="text-gray-600">Company Name | Month Year - Present</p>
              <p className="mt-2 text-gray-700">
                Description of your responsibilities and achievements in this role.
                Focus on technical skills and impact.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-8">
              <h3 className="text-xl font-semibold">Another Position</h3>
              <p className="text-gray-600">Another Company | Month Year - Month Year</p>
              <p className="mt-2 text-gray-700">
                Description of your responsibilities and achievements. Include specific projects
                and technologies you worked with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold">De La Salle University Manila</h3>
              <p className="text-gray-600 mt-2">Bachelor of Science in Computer Science</p>
              <p className="text-gray-600">Major in Software Technology</p>
              <p className="text-gray-600 mt-2">Expected Graduation: Month Year</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm">Data Structures</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm">Algorithms</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm">Web Development</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm">Database Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              I'm always interested in hearing about new opportunities and collaborations.
              Feel free to reach out!
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-600"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-600"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-600"
              ></textarea>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </div>
            <div className="mt-8 flex justify-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">GitHub</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">LinkedIn</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Email</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
