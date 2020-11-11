import React, { useState } from "react";
import { Link } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { Icon, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import "./styles/Nav.scss";

const Nav = ({ loggedInUser, onLogOut }) => {
  const [burger, setBurger] = useState(false);

  const handleOnOpen = () =>{
    if(!burger) {
      setBurger(true)
      console.log(burger);
    }
    
  }

  const handleOnClose = () => {
    if(burger) {
      setBurger(false)
      console.log(burger);
    }
  };


  return (

    <>
      {!loggedInUser ? (
        <Menu right isOpen={burger}>
          <Link to="/" className="menu-item" onClick={handleOnClose}>
            Home
          </Link>
          {/* <Button className="profile__inbox goback " animated id="nav__btn">
            <Button.Content hidden>
              <FontAwesomeIcon icon={faHome} color="white"/>
            </Button.Content>
            <Button.Content visible>
              <p className="nav__btn__text">Home</p>
            </Button.Content>
          </Button> */}

          <Link to="/sign-up" className="menu-item" onClick={() =>{
            handleOnOpen()
            handleOnClose()
          }}>
            Signup
          </Link>
          <Link to="/sign-in" className="menu-item" onClick={() =>{
            handleOnOpen()
            handleOnClose()
          }}>
            Signin
          </Link>
        </Menu>
      ) : (
        <Menu right>
          <p className="menu-item">Search</p>
          <Link to="/home" className="menu-item" onClick={() =>{
            handleOnOpen()
            handleOnClose()
          }}>
            Home
          </Link>
          <Link to={`/user/${loggedInUser._id}`} className="menu-item" onClick={() =>{
            handleOnOpen()
            handleOnClose()
          }}>
            Account
          </Link>
          <Link to={`/inbox/${loggedInUser._id}`} className="menu-item" onClick={() =>{
            handleOnOpen()
            handleOnClose()
          }}>
            Inbox
          </Link>
          <button onClick={onLogOut} className="menu-item" onClick={() =>{
            handleOnOpen()
            handleOnClose()
          }}>
            Logout
          </button>
        </Menu>
      )}
    </>
  );
};

export default Nav;
