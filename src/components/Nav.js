import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ loggedInUser, onLogOut }) => {
  return (
    <nav>
      <ul>
        <li>Search</li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!loggedInUser ? (
          <li>
            <li>
              <Link to="/sign-up">Signup</Link>
            </li>
            <li>
              <Link to="/sign-in">Signin</Link>
            </li>
          </li>
        ) : (
          <>
            <li>
              <Link to={`user/${loggedInUser._id}`}>Account</Link>
            </li>
            <li>
              <button onClick={onLogOut}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
