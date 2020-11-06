import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-up">Signup</Link>
        </li>
        <li>
          <Link to="/sign-in">Signin</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>

      </ul>
    </nav>
  );
};

export default Nav;
