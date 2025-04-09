// src/components/ProjectDetail.jsx
import { useParams } from 'react-router-dom';

const projects = [
  {
    id: 'doodle-jump',
    name: 'Doodle Jump Clone',
    details: 'Built with Java Swing. Includes platform generation, collision detection, and scoring system.',
    github: 'https://www.google.com',
    demoLink: 'https://www.google.com',
  },
  {
    id: 'money-tracker',
    name: 'Money Tracker',
    details: 'Tracks expenses and income. Built with JavaFX and file-based storage.',
    github: 'https://www.google.com',
    demoLink: 'https://www.google.com',
  },
  {
    id: 'qr-encoder',
    name: 'QR Encoder',
    details: 'Uses qrcode and Streamlit to create a user-friendly interface. Hosted demo available.',
    github: 'https://www.google.com',
    demoLink: 'https://tobiashagenaars-portfolio/projects/qr-encoder',
  },
];

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <div className="p-8">Project not found.</div>;

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-3xl font-bold">{project.name}</h2>
      <p>{project.details}</p>
      <div className="space-x-4">
        {project.github && (
          <a href={project.github} target="_blank" className="text-blue-600 underline" rel="noreferrer">
            GitHub
          </a>
        )}
        {project.demoLink && (
          <a href={project.demoLink} target="_blank" className="text-green-600 underline" rel="noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
