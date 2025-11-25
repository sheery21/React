import { NavLink } from "react-router-dom";
import { FaHome, FaCode, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-24 bg-[#111111] flex flex-col items-center py-8 space-y-8 rounded-l-3xl">
      {/* MacBook top bar circle buttons */}
      <div className="flex space-x-2 mb-10">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>

      <nav className="flex flex-col space-y-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-400 flex flex-col items-center" : "flex flex-col items-center text-gray-400 hover:text-white"
          }
        >
          <FaHome size={24} />
          <span className="text-xs mt-1">About</span>
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) =>
            isActive ? "text-blue-400 flex flex-col items-center" : "flex flex-col items-center text-gray-400 hover:text-white"
          }
        >
          <FaCode size={24} />
          <span className="text-xs mt-1">Skills</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "text-blue-400 flex flex-col items-center" : "flex flex-col items-center text-gray-400 hover:text-white"
          }
        >
          <FaProjectDiagram size={24} />
          <span className="text-xs mt-1">Projects</span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-400 flex flex-col items-center" : "flex flex-col items-center text-gray-400 hover:text-white"
          }
        >
          <FaEnvelope size={24} />
          <span className="text-xs mt-1">Contact</span>
        </NavLink>
      </nav>
    </aside>
  );
}
