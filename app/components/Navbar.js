import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <div className="rightNav">
        <Link className="rightNav__link" to="/robots">
          Robots
        </Link>
        <Link className="rightNav__link" to="/projects">
          Projects
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
