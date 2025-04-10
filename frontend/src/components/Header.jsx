import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">Tobias' Portfolio</Link>
        <nav className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/projects" className="hover:underline">Projects</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
