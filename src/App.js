import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { API_URL } from "./config";

import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import UserProfile from "./components/UserProfile";
import UserCreate from "./components/UserCreate";
import UserEdit from "./components/UserEdit";
import ItemUpload from "./components/ItemUpload";

class App extends Component {
  state = {
    loggedInUser: null,
    errorMessage: null,
  };

  handleSignUp = (e) => {
    e.preventDefault();
    const { username, email, password } = e.target;

    axios
      .post(
        `${API_URL}/signup`,
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push("user/create");
          }
        );
      })
      .catch((err) => {
        console.log(err.response.data.errorMessage);
        this.setState({ errorMessage: err.response.data.errorMessage });
      });
  };

  handleSignIn = (e) => {
    e.preventDefault();

    const { email, password } = e.target;
    axios
      .post(
        `${API_URL}/signin`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log(err.response.data.error);
        this.setState({ errorMessage: err.response.data.error });
      });
  };

  handleLogOut = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/logout`, {}, { withCredentials: true }).then(() => {
      this.setState(
        {
          loggedInUser: null,
        },
        () => {
          this.props.history.push("/");
        }
      );
    });
  };

  handleUnmount = () => {
    this.setState({
      errorMessage: null,
    });
  };

  handleCleanError = (e) => {
    this.setState({
      errorMessage: null,
    });
  };

  handleEditProfile = (e) => {
    e.preventDefault();
    const { bio, location, image } = e.target;
    axios
      .patch(
        `${API_URL}/user-edit`,
        {
          // username: username.value,
          bio: bio.value,
          location: location.value,
          image: image.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        this.props.history.push(`/user/${this.state.loggedInUser._id}`);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        this.setState({ errorMessage: err.response.data.error });
      });
  };

  handleCreateItem = (e) => {
    e.preventDefault();
    const { name, description, condition, image } = e.target;

    axios
      .post(
        `${API_URL}/item-create`,
        {
          name: name.value,
          description: description.value,
          condition: condition.value,
          image: image.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push(`/user/${this.state.loggedInUser._id}`);
          }
        );
      })
      .catch((err) => {
        console.log(err.response.data.errorMessage);
        this.setState({ errorMessage: err.response.data.errorMessage });
      });
  };

  handleEditItem = (e) => {
    e.preventDefault();
    const { name, description, condition, image } = e.target;

    axios
      .patch(
        `${API_URL}/item-edit`,
        {
          name: name.value,
          description: description.value,
          condition: condition.value,
          image: image.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push(`/user/${this.state.loggedInUser._id}`);
          }
        );
      })
      .catch((err) => {
        console.log(err.response.data.errorMessage);
        this.setState({ errorMessage: err.response.data.errorMessage });
      });
  };

  render() {
    const { loggedInUser, errorMessage } = this.state;
    console.log(loggedInUser);

    return (
      <div className="App">
        <Nav loggedInUser={loggedInUser} onLogOut={this.handleLogOut} />
        {loggedInUser ? <h5>User is: {loggedInUser.username}</h5> : null}

        <h1>test</h1>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Landing />;
            }}
          />
          <Route
            path="/sign-up"
            render={(routeProps) => {
              return (
                <SignUp
                  onSignUp={this.handleSignUp}
                  {...routeProps}
                  errorMessage={errorMessage}
                  onUnmount={this.handleUnmount}
                  onChange={this.handleCleanError}
                />
              );
            }}
          />
          <Route
            path="/sign-in"
            render={(routeProps) => {
              return (
                <SignIn
                  onSignIn={this.handleSignIn}
                  {...routeProps}
                  errorMessage={errorMessage}
                  onUnmount={this.handleUnmount}
                  onChange={this.handleCleanError}
                />
              );
            }}
          />
          <Route
            exact
            path="/user/create"
            render={() => {
              return (
                <UserCreate
                  loggedInUser={loggedInUser}
                  onEditProfile={this.handleEditProfile}
                />
              );
            }}
          />
          <Route
            exact
            path="/user/edit"
            render={() => {
              return (
                <UserEdit
                  loggedInUser={loggedInUser}
                  onUnmount={this.handleUnmount}
                  onEditProfile={this.handleEditProfile}
                />
              );
            }}
          />
          <Route
            path="/user/:userId"
            render={() => {
              return <UserProfile loggedInUser={loggedInUser} />;
            }}
          />
          <Route
            exact
            path="/upload-item"
            render={() => {
              return (
                <ItemUpload
                  loggedInUser={loggedInUser}
                  onCreateItem={this.handleCreateItem}
                  onEditItem={this.handleEditItem}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
