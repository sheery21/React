import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex gap-6 p-6 text-xl font-semibold">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/projects">Projects</Link>
      </nav>
      <div className="p-6">{children}</div>
    </div>
  );
}