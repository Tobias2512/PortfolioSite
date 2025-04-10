import AboutSection from './AboutSection';
import Section from './Section';

function Home() {
  return (
    <div className="bg-gray-50">
      {/* New Custom About Me Section */}
      <AboutSection />

      {/* Projects Section */}
      <Section
        image="https://tobiashagenaars-portfolio.netlify.app/images/projects.jpg"
        title="Projects"
        text="Here are some of the projects I've worked on. From games to productivity tools, I enjoy creating apps that solve real problems."
        animation={{ opacity: 0, x: -100 }}
        reverse
      >
        <a
          href="/projects"
          className="inline-block mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          See My Projects
        </a>
      </Section>

      {/* CV Section */}
      <Section
        image="https://tobiashagenaars-portfolio.netlify.app/images/cv.jpg"
        title="CV"
        text="Check out my CV to see the skills, experience, and education that have helped me build the projects I love."
        animation={{ opacity: 0, x: 100 }}
      >
        <a
          href="/cv"
          className="inline-block mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          View My CV
        </a>
      </Section>

      {/* Contact Section */}
      <Section
        image="https://tobiashagenaars-portfolio.netlify.app/images/contact.jpg"
        title="Contact Me"
        text="Feel free to reach out if you'd like to collaborate or just chat. I'm always open to new opportunities."
        animation={{ opacity: 0, x: -100 }}
        reverse
      >
        <a
          href="mailto:hagenaarstobias@gmail.com"
          className="inline-block mt-4 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Contact Me
        </a>
      </Section>
    </div>
  );
}

export default Home;
