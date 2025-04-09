// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import QREncoder from './components/QREncoder';

function App() {
  return (
    <Router>
      <nav className="bg-gray-100 p-4 flex justify-between">
        <Link to="/" className="text-xl font-semibold">Tobias' Portfolio</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/projects" className="hover:underline">Projects</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/qr-encoder" element={<QREncoder />} />
      </Routes>
    </Router>
  );
}

export default App;
