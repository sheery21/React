import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Sticky Notes</h2>

      <input type="text" className="search-bar" placeholder="Search notes..." />

      <Button className="logout-btn" onClick={handleLogout} text={"Log Out"} />
    </nav>
  );
};

export default Navbar;
