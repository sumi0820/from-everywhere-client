import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import _ from "lodash";
import {
  Container,
  Grid,
  Button,
  Message,
  Form,
  Icon,
} from "semantic-ui-react";

import "./styles/Form.scss";
import { API_URL } from "../config";

const SignUp = ({ onSignUp, onUnmount, errorMessage }) => {
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const updateUsernameQuery = (username) => {
    // A search query api call.
    axios
      .post(
        `${API_URL}/input-check/user`,
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
        `${API_URL}/input-check/email`,
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

  console.log(username, email);

  return (
    // <form onSubmit={onSignUp}>
    //   <input
    //     type="text"
    //     name="username"
    //     onChange={(e) => setUsername(e.target.value.toLowerCase())}
    //   />
    //   {username == "" || username == undefined ? (
    //     ""
    //   ) : username == "isUser" ? (
    //     <p>Username is unavailable, please choose another!</p>
    //   ) : (
    //     <p>Username available!</p>
    //   )}

    //   <input
    //     type="text"
    //     name="email"
    //     onChange={(e) => setEmail(e.target.value.toLowerCase())}
    //   />
    // {email == "" || email == undefined ? (
    //   ""
    // ) : email == "isEmail" ? (
    //   <p>Email is unavailable, please choose another!</p>
    // ) : (
    //   <p>Email available!</p>
    // )}
    //   <input type="password" name="password" />

    //   <button type="submit">Sign up?</button>
    //   {errorMessage ? (
    //     <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
    //   ) : null}
    // </form>
    <div className="form__container">
      <Container text>
        <Grid container>
          <Grid.Column>
            <Form onSubmit={onSignUp} className="form__form">
              <Form.Field required>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
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
              <Form.Field required>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
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

              <Form.Field required>
                <label>Password</label>
                <input type="password" name="password" />
              </Form.Field>

              <Button className="form__button goback" animated type="submit" secondary>
                <Button.Content hidden>
                  <Icon name="sign-in" />
                </Button.Content>
                <Button.Content visible>Sign up</Button.Content>
              </Button>

              {errorMessage ? (
                <Message negative>
                  <Message.Header>{errorMessage}</Message.Header>
                  <p>Please try again.</p>
                </Message>
              ) : null}
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;
