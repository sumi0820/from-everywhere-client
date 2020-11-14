import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.scss";
import { API_URL } from "./config";

import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import UserProfile from "./components/user/UserProfile";
import UserCreate from "./components/user/UserCreate";
import UserEdit from "./components/user/UserEdit";
import ItemUpload from "./components/items/ItemUpload";
import Home from "./components/items/Home";
import ItemsList from "./components/items/ItemsList";
import ItemDetail from "./components/items/ItemDetail";
import Inbox from "./components/messages/Inbox";
import Chat from "./components/messages/Chat";
import ChatMobile from "./components/messages/ChatMobile";
import NotFoundComponent from "./components/NotFoundComponent";

class App extends Component {
  state = {
    loggedInUser: null,
    errorMessage: null,
    items: [],
    cloneItems: [],
    chat: [],
    selectedUser: null,
    accepted: null,
    text: "",
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/items`, { withCredentials: true })
      .then((response) => {

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
      });
    // .catch((err) => {
    //   this.setState({ errorMessage: err.response.data.error });
    // });
  };

  handleLogOut = () => {

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
    const { bio, location, imageProfile, imageBg, username, email } = e.target;
    let imageProfFile = imageProfile.files[0];
    let uploadProfForm = new FormData();
    uploadProfForm.append("imageUrl", imageProfFile);

    let imageBgFile = imageBg.files[0];
    let uploadBgForm = new FormData();
    uploadBgForm.append("imageUrl", imageBgFile);

    axios.post(`${API_URL}/upload`, uploadProfForm).then((responseProf) => {
      axios.post(`${API_URL}/upload`, uploadBgForm).then((responseBg) => {
        let newProfile = {
          username: username
            ? username.value
            : this.state.loggedInUser.username,
          email: email ? email.value : this.state.loggedInUser.email,
          bio: bio.value,
          location: location.value,
          imageProfile: responseProf.data.image,
          imageBg: responseBg.data.image,
        };
        axios
          .patch(`${API_URL}/user-edit`, newProfile, { withCredentials: true })
          .then((response) => {
            this.props.history.push(`/user/${this.state.loggedInUser._id}`);
          })
          .catch((err) => {
            this.setState({ errorMessage: err.response.data.error });
          });
      });
    });
  };

  handleCreateItem = (e) => {
    e.preventDefault();
    const { name, description, condition, image } = e.target;

    let imageFile = image.files[0];
    let uploadForm = new FormData();
    uploadForm.append("imageUrl", imageFile);
    axios.post(`${API_URL}/upload`, uploadForm).then((response) => {
      let newItem = {
        name: name.value,
        description: description.value,
        condition: condition.value,
        image: response.data.image,
      };
      axios
        .post(`${API_URL}/item-create`, newItem, { withCredentials: true })
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
                  axios
                    .get(`${API_URL}/items`, { withCredentials: true })
                    .then((response3) => {
                      this.setState(
                        {
                          loggedInUser: userData,
                          items: response3.data,
                          cloneItems: response3.data,
                        },
                        () => {
                          this.props.history.push(
                            `/user/${this.state.loggedInUser._id}`
                          );
                        }
                      );
                    });

                });
            });
        })
        .catch((err) => {
          this.setState({ errorMessage: err.response.data.errorMessage });
        });
    });
  };

  handleEditItem = (e) => {
    e.preventDefault();
    const { name, description, condition, image } = e.target;

    let imageFile = image.files[0];
    let uploadForm = new FormData();
    uploadForm.append("imageUrl", imageFile);
    axios.post(`${API_URL}/upload`, uploadForm).then((response) => {
      let newItem = {
        name: name.value,
        description: description.value,
        condition: condition.value,
        image: response.data.image,
      };
      axios
        .patch(`${API_URL}/item-edit`, newItem, { withCredentials: true })
        .then((response) => {
          let items = response.data;
          axios
            .get(`${API_URL}/user/${this.state.loggedInUser._id}`, {
              withCredentials: true,
            })
            .then((response) => {
              let userData = response.data;
              this.setState(
                { loggedInUser: userData, items: items, ...this.state.items },
                () => {
                  this.props.history.push(
                    `/user/${this.state.loggedInUser._id}`
                  );
                }
              );
            });
        })
        .catch((err) => {
          console.log(err);
          // this.setState({ errorMessage: err.response.data.errorMessage });
        });
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
      this.setState({ cloneItems: response.data, text: "" }, () => {
        this.props.history.push("/item-list");
      });
    });
  };

  handleSelectUserMobile = (userId) => {
    axios
      .get(`${API_URL}/chat/${userId}`, { withCredentials: true })
      .then((response) => {
        this.setState({
          chat: response.data,
          selectedUser:
            response.data[0].from._id == this.state.loggedInUser._id
              ? response.data[1].from
              : response.data[0].from,
        });
        axios
          .get(`${API_URL}/item/${this.state.loggedInUser.item._id}`, {
            withCredentials: true,
          })
          .then((response) => {
            this.setState(
              {
                accepted: response.data.accepted,
              },
              () => {
                this.props.history.push(`/mb/inbox/${userId}`);
              }
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFeedback = (e, rating) => {
    e.preventDefault();
    const { feedback } = e.target;
    axios
      .post(
        `${API_URL}/user/${this.state.loggedInUser._id}/create-feedback`,
        {
          feedback: feedback.value,
          rate: rating,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        axios
          .post(
            `${API_URL}/user/${this.state.loggedInUser._id}/update-status`,
            {},
            { withCredentials: true }
          )
          .then((response) => {
            this.props.history.push("/upload-item");
          });
      });
  };

  handleChange = (e) => this.setState({ text: e.target.value });

  render() {
    const {
      loggedInUser,
      errorMessage,
      items,
      cloneItems,
      selectedUser,
      accepted,
      chat,
      text,
    } = this.state;
    return (
      <div className="App">
        <Nav
          loggedInUser={loggedInUser}
          onLogOut={this.handleLogOut}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          text={text}
        />

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
                  onGoBack={this.handleGoBack}
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
                  onFeedback={this.handleFeedback}
                />
              );
            }}
          />
          <Route
            exact
            path="/public/:userId"
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
            path="/upload-item"
            render={() => {
              return (
                <ItemUpload
                  loggedInUser={loggedInUser}
                  onCreateItem={this.handleCreateItem}
                  onEditItem={this.handleEditItem}
                  onDeleteItem={this.handleDeleteItem}
                  onGoBack={this.handleGoBack}
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
                  // onSearch={this.handleSearch}
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
                  onSelectedUserMobile={this.handleSelectUserMobile}
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
          <Route
            exact
            path="/mb/inbox/:userId"
            render={(routeProps) => {
              return (
                <ChatMobile
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  onGoBack={this.handleGoBack}
                  initialChat={chat}
                  selectedUser={selectedUser}
                  initialAccepted={accepted}
                />
              );
            }}
          />
          <Route path="*" component={NotFoundComponent} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
