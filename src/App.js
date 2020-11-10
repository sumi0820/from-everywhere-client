import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.scss";
import { API_URL } from "./config";

import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import UserProfile from "./components/UserProfile";
import UserPublic from "./components/UserPublic";
import UserCreate from "./components/UserCreate";
import UserEdit from "./components/UserEdit";
import ItemUpload from "./components/ItemUpload";
import Home from "./components/Home";
import ItemsList from "./components/ItemsList";
import ItemDetail from "./components/ItemDetail";
import Inbox from "./components/Inbox";
import Chat from "./components/Chat";

class App extends Component {
  state = {
    loggedInUser: null,
    // updatedUser: null,
    errorMessage: null,
    items: [],
    cloneItems: [],
    // messages: [],
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/items`, { withCredentials: true })
      .then((response) => {
        console.log("This is items request", response.data);

        this.setState({ items: response.data });
        this.setState({ cloneItems: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            this.props.history.push("/home");
          }
        );
      })
      .catch((err) => {
        this.setState({ errorMessage: err.response.data.error });
      });
  };

  handleTestMode = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/signin-test`, {}, { withCredentials: true })
      .then((response) => {
        this.setState(
          {
            loggedInUser: response.data,
          },
          () => {
            this.props.history.push("/home");
          }
        );
      })
      .catch((err) => {
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
      .then(() => {
        axios
          .get(`${API_URL}/user/${this.state.loggedInUser._id}`, {
            withCredentials: true,
          })
          .then((response) => {
            let items = response.data;
            axios
              .get(`${API_URL}/user/${this.state.loggedInUser._id}`, {
                withCredentials: true,
              })
              .then((response) => {
                let userData = response.data;
                this.setState({ loggedInUser: userData, items: items }, () => {
                  this.props.history.push(
                    `/user/${this.state.loggedInUser._id}`
                  );
                });
              });
          });
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
        let items = response.data;
        axios
          .get(`${API_URL}/user/${this.state.loggedInUser._id}`, {
            withCredentials: true,
          })
          .then((response) => {
            let userData = response.data;
            this.setState({ loggedInUser: userData, items: items }, () => {
              this.props.history.push(`/user/${this.state.loggedInUser._id}`);
            });
          });
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ errorMessage: err.response.data.errorMessage });
      });
  };

  handleDeleteItem = (itemId) => {
    axios
      .delete(`${API_URL}/item-delete/${itemId}`, { withCredentials: true })
      .then((response) => {
        let items = response.data;
        axios
          .get(`${API_URL}/user/${this.state.loggedInUser._id}`, {
            withCredentials: true,
          })
          .then((response) => {
            let userData = response.data;
            this.setState({ loggedInUser: userData, items: items }, () => {
              this.props.history.push(`/user/${this.state.loggedInUser._id}`);
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleQuickSearch = (e) => {
    let searchInput = e.target.value.toLowerCase();
    let filteredItems = this.state.items.filter((item) => {
      return item.name.toLowerCase().startsWith(searchInput);
    });
    this.setState({ cloneItems: filteredItems });
  };

  handleSearch = (e) => {
    e.preventDefault();
    let useInput = e.target.keyWord.value.toLowerCase();
    axios.get(`${API_URL}/item-search/?q=${useInput}`).then((response) => {
      this.setState({ cloneItems: response.data });
    });
  };

  render() {
    const { loggedInUser, errorMessage, items, cloneItems } = this.state;
    return (
      <div className="App">
        <Nav loggedInUser={loggedInUser} onLogOut={this.handleLogOut} />
        {loggedInUser ? <h5>User is: {loggedInUser.username}</h5> : null}

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
                  onTest={this.handleTestMode}
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
            exact
            path="/user/:userId"
            render={(routeProps) => {
              return (
                <UserProfile
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  onGoBack={this.handleGoBack}
                />
              );
            }}
          />
          <Route
            exact
            path="/public/:userId"
            render={(routeProps) => {
              return (
                <UserPublic
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  onGoBack={this.handleGoBack}
                />
              );
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
                  onDeleteItem={this.handleDeleteItem}
                />
              );
            }}
          />
          <Route
            exact
            path="/home"
            render={() => {
              return <Home loggedInUser={loggedInUser} items={items} />;
            }}
          />
          <Route
            exact
            path="/item-list"
            render={() => {
              return (
                <ItemsList
                  loggedInUser={loggedInUser}
                  items={cloneItems}
                  onQuickSearch={this.handleQuickSearch}
                  onSearch={this.handleSearch}
                />
              );
            }}
          />
          <Route
            exact
            path="/item/:itemId"
            render={(routeProps) => {
              return (
                <ItemDetail
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  onGoBack={this.handleGoBack}
                />
              );
            }}
          />
          <Route
            exact
            path="/inbox"
            render={(routeProps) => {
              return (
                <Inbox
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  onGoBack={this.handleGoBack}
                />
              );
            }}
          />
          <Route
            exact
            path="/inbox/:userId"
            render={(routeProps) => {
              return (
                <Chat
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  onGoBack={this.handleGoBack}
                  // onSend={this.handleSend}
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
