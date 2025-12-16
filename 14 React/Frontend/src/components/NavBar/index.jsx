import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">MyApp</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-700 text-sm font-medium">
          <a href="#" className="hover:text-indigo-600 transition">Home</a>
          <a href="#" className="hover:text-indigo-600 transition">Features</a>
          <a href="#" className="hover:text-indigo-600 transition">Pricing</a>
          <a href="#" className="hover:text-indigo-600 transition">About</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#"
            className="px-4 py-2 rounded-lg text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          >
            Login
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg border border-slate-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-sm border-t animate-slideDown">
          <div className="px-4 py-4 flex flex-col gap-4 text-slate-700 text-sm">
            <a href="#" className="hover:text-indigo-600">Home</a>
            <a href="#" className="hover:text-indigo-600">Features</a>
            <a href="#" className="hover:text-indigo-600">Pricing</a>
            <a href="#" className="hover:text-indigo-600">About</a>

            <hr />

            <a
              href="#"
              className="w-full text-center px-4 py-2 rounded-lg text-indigo-600 border border-indigo-600"
            >
              Login
            </a>
            <a
              href="#"
              className="w-full text-center px-4 py-2 rounded-lg text-white bg-indigo-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 250ms ease-out;
        }
      `}</style>
    </nav>
  );
}
