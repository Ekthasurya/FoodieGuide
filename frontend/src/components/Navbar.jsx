import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/"><h1 className="logo">FoodGuide</h1></a>
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/instruction">Instruction</Link>
      </div>
    </nav>
  );
};

export default Navbar;
