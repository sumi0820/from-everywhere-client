import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import {
  Container,
  Grid,
  Button,
  Message,
  Form,
  Icon,
  TextArea,
  Input,
} from "semantic-ui-react";
import "./styles/Form.scss";
import { API_URL } from "../config";

const UserEdit = ({ onEditProfile, loggedInUser, onUnmount }) => {
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const updateUsernameQuery = (username) => {
    // A search query api call.
    axios
      .post(
        `${API_URL}/input-check/edit-user`,
        { username },
        { withCredentials: true }
      )
      .then((response) => {
        switch (response.data) {
          case "isUser":
            setUsername("isUser");
            break;
          default:
            console.log("Available");
        }
      });
  };

  const updateEmailQuery = (email) => {
    // A search query api call.
    console.log(email);

    axios
      .post(
        `${API_URL}/input-check/edit-email`,
        { email },
        { withCredentials: true }
      )
      .then((response) => {
        switch (response.data) {
          case "isEmail":
            setEmail("isEmail");
            break;
          default:
            console.log("Available");
        }
      });
  };

  const debounceSearchUsername = useRef(
    _.debounce((username) => {
      updateUsernameQuery(username);
    }, 1000)
  );

  const debounceSearchEmail = useRef(
    _.debounce((email) => {
      updateEmailQuery(email);
    }, 1000)
  );

  useEffect(() => {
    if (username) {
      setUsername(username);
      debounceSearchUsername.current(username);
    }
  }, [username]);
  useEffect(() => {
    if (email) {
      setEmail(email);
      debounceSearchEmail.current(email);
    }
  }, [email]);

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <div>
      {/* <form onSubmit={onEditProfile}>
        <input
          type="text"
          name="location"
          defaultValue={loggedInUser.username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        {username == "" || username == undefined ? (
          ""
        ) : username == "isUser" ? (
          <p>Username is unavailable, please choose another!</p>
        ) : (
          <p>Username available!</p>
        )}

        <input
          type="text"
          name="location"
          defaultValue={loggedInUser.email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        {email == "" || email == undefined ? (
          ""
        ) : email == "isEmail" ? (
          <p>Email is unavailable, please choose another!</p>
        ) : (
          <p>Email available!</p>
        )}

        <textarea type="text" name="bio" defaultValue={loggedInUser.bio} />
        <input
          type="text"
          name="location"
          defaultValue={loggedInUser.location}
        />
        <input type="text" name="image" defaultValue={loggedInUser.image} />



        {username == "isUser" || email == "isEmail" ? (
          <>
            <button type="submit" disabled>
              submit
            </button>
            <p>Username and Email need to be unique!</p>
          </>
        ) : (
          <>
            <button type="submit">submit</button>
          </>
        )}
      </form>
      <Link to={`/user/${loggedInUser}`}>X</Link> */}

      <div className="form__container">
        <Container text>
          <Grid container>
            <Grid.Column>
              <Form onSubmit={onEditProfile} className="form__form">
                <Form.Field required>
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={loggedInUser.username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  />
                </Form.Field>
                {username == "" || username == undefined ? (
                  ""
                ) : username == "isUser" ? (
                  <p className="form__alert">
                    Username is unavailable, please choose another!
                  </p>
                ) : (
                  <p className="form__available">Username available!</p>
                )}
                <Form.Field>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={loggedInUser.email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                </Form.Field>
                {email == "" || email == undefined ? (
                  ""
                ) : email == "isEmail" ? (
                  <p className="form__alert">
                    Email is unavailable, please choose another!
                  </p>
                ) : (
                  <p className="form__available">Email available!</p>
                )}

                <Form.Field>
                  <label>Bio</label>
                  <TextArea
                    type="text"
                    name="bio"
                    defaultValue={loggedInUser.bio}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={loggedInUser.location}
                  />
                </Form.Field>

                <Grid container columns={2} stackable>
                  <Grid.Column>
                    <Form.Field>
                      <label>Profile Image</label>
                      <Input type="file" name="image-profile" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Background Image</label>
                      <Input type="file" name="image-bg" />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
                
                <Button
                  className="form__button goback"
                  animated
                  type="submit"
                  secondary
                >
                  <Button.Content hidden>
                    <Icon name="sign-in" />
                  </Button.Content>
                  <Button.Content visible>Sign in</Button.Content>
                </Button>
                {/* 
                {errorMessage ? (
                  <Message negative>
                    <Message.Header>{errorMessage}</Message.Header>
                    <p>Please try again.</p>
                  </Message>
                ) : null} */}
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default UserEdit;
