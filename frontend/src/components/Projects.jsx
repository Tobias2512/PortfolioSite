import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'doodle-jump',
    name: 'Doodle Jump Clone',
    shortDesc: 'A simple Java-based version of the classic Doodle Jump game.'
  },
  {
    id: 'money-tracker',
    name: 'Money Tracker',
    shortDesc: 'A personal finance tracker desktop app in Java.'
  },
  {
    id: 'qr-encoder',
    name: 'QR Encoder',
    shortDesc: 'Generate QR codes from any input using Python.'
  },
];

function Projects() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <div className="hover:shadow-lg p-4 border rounded-lg transition duration-200">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.shortDesc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Projects;