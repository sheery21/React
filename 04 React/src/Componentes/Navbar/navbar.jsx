import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
    
      <div className="font-bold text-lg"><h1>Logo</h1></div>

      <div className="md:hidden" onClick={() => setOpen(!open)}>
        <button className="p-2 rounded-md hover:bg-gray-300 focus:outline-none">
          ☰
        </button>
      </div>

      <ul
        className={`flex flex-col md:flex-row gap-4 absolute md:static left-0 w-full md:w-auto bg-gray-200 md:bg-transparent p-4 md:p-0 transition-all duration-300 ${
          open ? "top-14" : "top-[-400px]"
        }`}
      >
        <Link to="/">
        <li className="cursor-pointer hover:text-red-600">Home</li>
        </Link>
        <Link to="/about">
        <li className="cursor-pointer hover:text-red-600">About</li>
        </Link>
        < Link to="/contact">
        <li className="cursor-pointer hover:text-red-600">Contact Us</li>
        </Link>
      </ul>

      {/* Buttons */}
      <div
        className={`flex gap-4 flex-col md:flex-row absolute md:static left-0 w-full md:w-auto bg-gray-200 md:bg-transparent p-4 md:p-0 transition-all duration-300 ${
          open ? "top-40" : "top-[-400px]"
        }`}
      >
        <button className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-100">
          Login
        </button>
        <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none">
          Get Started
        </button>
      </div>
    </div>
  );
}