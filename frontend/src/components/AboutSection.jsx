import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-20 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-6xl font-extrabold text-blue-600 mb-12 text-center">About Me</h1>

      {/* Blue Box */}
      <div className="border-2 border-blue-500 rounded-xl p-8 flex flex-col md:flex-row items-center max-w-6xl w-full gap-10 bg-white shadow-md">
        {/* Description */}
        <div className="md:w-1/2 space-y-8 text-center md:text-left text-xl text-gray-700 leading-relaxed">
          <p>
            Hi, I'm Tobias, a passionate student/developer who loves building useful and innovative applications.
            I specialize in Java, Python, and more. I'm always looking for exciting new projects to work on.
          </p>
          {/* Icons */}
          <div className="flex justify-center md:justify-start gap-8 text-4xl text-blue-600">
            <a href="https://www.instagram.com/tobias_hagenaars" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/tobias-hagenaars" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="mailto:hagenaarstobias@gmail.com"><FaEnvelope /></a>
          </div>
        </div>

        {/* Photo */}
        <div className="md:w-1/2">
          <img
            src="https://tobiashagenaars-portfolio.netlify.app/images/profile.jpg"
            alt="Tobias"
            className="rounded-xl shadow-xl object-cover w-full h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
