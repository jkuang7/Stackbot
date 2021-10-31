import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav nav--navbar">
      <Link to="/">Home</Link>
      <div>
        <Link className="nav__item" to="/robots">
          Robots
        </Link>
        <Link className="nav__item" to="/projects">
          Projects
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
