import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import _ from "lodash";
import { Form } from "semantic-ui-react";
import { API_URL } from "../config";

const FormValidation = ({ loggedInUser }) => {
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
  return (
    <>
      <Form.Field required>
        <label>Username</label>
        <input
          type="text"
          name="username"
          defaultValue={loggedInUser ? loggedInUser.username : ''}
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
          defaultValue={loggedInUser ? loggedInUser.email : ''}

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
    </>
  );
};

export default FormValidation;
