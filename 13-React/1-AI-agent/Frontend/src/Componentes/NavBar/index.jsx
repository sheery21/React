import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/button";
import Swal from "sweetalert2";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {

    localStorage.removeItem("userUid");
    setIsOpen(false);


    Swal.fire({
      icon: "success",
      title: "Logged Out!",
      text: "You have been logged out successfully 🎉",
    }).then(() => {
      navigate("/"); //
    });
    
  };

  return (
    <nav className="bg-gray-800 p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyBrand</div>

        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/home" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/About" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/Services" className="text-white hover:text-gray-300">
            Services
          </Link>
          <Link to="/Contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
          <Link to="/DashBoard" className="text-white hover:text-gray-300">
            DashBoard
          </Link>

          <div className="flex gap-2 ml-4">
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-center"
              text={"Log Out"}
              onClick={() => logOut()}
            />
            <Link
              to="/SignUp"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-full bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-4 right-6 text-white text-3xl"
          onClick={() =>  setIsOpen(false)}
        >
          ✖
        </button>

        <Link
          to="/home"
          className="text-white hover:text-gray-300 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/About"
          className="text-white hover:text-gray-300 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          to="/Services"
          className="text-white hover:text-gray-300 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          Services
        </Link>
        <Link
          to="/Contact"
          className="text-white hover:text-gray-300 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
        <Link
          to="/DashBoard"
          className="text-white hover:text-gray-300 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          DashBoard
        </Link>

        <div className="flex gap-4 mt-6">
          <Button
            to="/"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 text-lg"
            onClick={() => logOut()}
            text={"Log Out"}
          />
          <Link
            to="/SignUp"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 text-lg"
            onClick={() => setIsOpen(false)}
          >
            BUY NOW
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
