import React, { useState } from "react";
import { Link } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import { Button, Grid, Input } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/Nav.scss";

const Nav = ({ loggedInUser, onLogOut, onSearch }) => {
  const [burger, setBurger] = useState(false);

  const handleOnOpen = () => {
    if (!burger) {
      setBurger(true);
      console.log(burger);
    }
  };

  const handleOnClose = () => {
    if (burger) {
      setBurger(false);
      console.log(burger);
    }
  };

  return (
    <>
      {!loggedInUser ? (
        <Menu right isOpen={burger}>
          <Link
            to="/"
            className="menu-item"
            onClick={() => {
              handleOnOpen();
              handleOnClose();
            }}
          >
            <Button className="profile__inbox goback " animated id="nav__btn">
              <Button.Content hidden>
                <FontAwesomeIcon icon={faHome} color="white" />
              </Button.Content>
              <Button.Content visible>
                <p className="nav__btn__text">Home</p>
              </Button.Content>
            </Button>
          </Link>

          <Link
            to="/sign-up"
            className="menu-item"
            onClick={() => {
              handleOnOpen();
              handleOnClose();
            }}
          >
            <Button
              className="profile__inbox goback "
              animated
              id="nav__btn"
              onClick={() => {
                handleOnOpen();
                handleOnClose();
              }}
            >
              <Button.Content hidden>
                <FontAwesomeIcon icon={faUserPlus} color="white" />
              </Button.Content>
              <Button.Content visible>
                <p className="nav__btn__text">Signup</p>
              </Button.Content>
            </Button>
          </Link>

          <Link
            to="/sign-in"
            className="menu-item"
            onClick={() => {
              handleOnOpen();
              handleOnClose();
            }}
          >
            <Button
              className="profile__inbox goback "
              animated
              id="nav__btn"
              onClick={() => {
                handleOnOpen();
                handleOnClose();
              }}
            >
              <Button.Content hidden>
                <FontAwesomeIcon icon={faSignInAlt} color="white" />
              </Button.Content>
              <Button.Content visible>
                <p className="nav__btn__text">Signin</p>
              </Button.Content>
            </Button>
          </Link>
        </Menu>
      ) : (
        <Menu right isOpen={burger}>

          <Link
            to="/home"
            className="menu-item"
            onClick={() => {
              handleOnOpen();
              handleOnClose();
            }}
          >
            <Button className="profile__inbox goback " animated id="nav__btn">
              <Button.Content hidden>
                <FontAwesomeIcon icon={faHome} color="white" />
              </Button.Content>
              <Button.Content visible>
                <p className="nav__btn__text">Home</p>
              </Button.Content>
            </Button>
          </Link>

          <Link
            to={`/user/${loggedInUser._id}`}
            className="menu-item"
            onClick={() => {
              handleOnOpen();
              handleOnClose();
            }}
          >
            <Button className="profile__inbox goback " animated id="nav__btn">
              <Button.Content hidden>
                <FontAwesomeIcon icon={faUser} color="white" />
              </Button.Content>
              <Button.Content visible>
                <p className="nav__btn__text">Account</p>
              </Button.Content>
            </Button>
          </Link>
          <Link
            to={`/inbox`}
            className="menu-item"
            onClick={() => {
              handleOnOpen();
              handleOnClose();
            }}
          >
            <Button className="profile__inbox goback " animated id="nav__btn">
              <Button.Content hidden>
                <FontAwesomeIcon icon={faEnvelope} color="white" />
              </Button.Content>
              <Button.Content visible>
                <p className="nav__btn__text">Inbox</p>
              </Button.Content>
            </Button>
          </Link>
          <Link
            className="menu-item"
            onClick={() => {
              handleOnOpen();
              handleOnClose();
            }}
          >
            <Button
              className="profile__inbox goback "
              animated
              id="nav__btn"
              onClick={() => {
                onLogOut();
                handleOnOpen();
                handleOnClose();
              }}
            >
              <Button.Content hidden>
                <FontAwesomeIcon icon={faSignOutAlt} color="white" />
              </Button.Content>
              <Button.Content visible>
                <p className="nav__btn__text">Logout</p>
              </Button.Content>
            </Button>
          </Link>
                    <Grid container columns={1} centered stackable className="menu-item">
            <Grid.Column>
              <form onSubmit={onSearch} style={{display:'flex', justifyContent:'center'}}>
                <Input
                  name="keyWord"
                  type="text"
                  action={{ icon: "search", type: "submit" }}
                  placeholder="Search"
                />
              </form>
            </Grid.Column>
          </Grid>
        </Menu>
      )}
    </>
  );
};

export default Nav;
