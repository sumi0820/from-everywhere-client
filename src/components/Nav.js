import React, { useState } from "react";
import { Link } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import "./styles/Nav.scss";

const Nav = ({ loggedInUser, onLogOut }) => {
  const [burger, setBurger] = useState(true);

  const handleOnClose = () => {
    setBurger(false);
  };

  console.log(burger);

  return (
    // <nav>
    //   <ul>
    //     {!loggedInUser ? (
    //       <>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <li>
    //             <Link to="/sign-up">Signup</Link>
    //           </li>
    //           <li>
    //             <Link to="/sign-in">Signin</Link>
    //           </li>
    //         </li>
    //       </>
    //     ) : (
    //       <>
    //         <li>Search</li>
    //         <li>
    //           <Link to="/home">Home</Link>
    //         </li>
    //         <li>
    //           <Link to={`user/${loggedInUser._id}`}>Account</Link>
    //         </li>
    //         <li>
    //           <button onClick={onLogOut}>Logout</button>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    <>
      {!loggedInUser ? (
        <Menu right isOpen={burger}>
          <Link to="/" className="menu-item" onClick={handleOnClose}>
            Home
          </Link>
          <Link to="/sign-up" className="menu-item" onClick={handleOnClose}>
            Signup
          </Link>
          <Link to="/sign-in" className="menu-item" onClick={handleOnClose}>
            Signin
          </Link>
        </Menu>
      ) : (
        <Menu right>
          <p className="menu-item">Search</p>
          <Link to="/home" className="menu-item">
            Home
          </Link>
          <Link to={`/user/${loggedInUser._id}`} className="menu-item">
            Account
          </Link>
          <button onClick={onLogOut} className="menu-item">
            Logout
          </button>
        </Menu>
      )}
    </>
  );
};

export default Nav;
