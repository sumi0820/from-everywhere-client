import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

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
console.log(username, email);
  return (
    <div>
      <form onSubmit={onEditProfile}>
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
            <button type="submit" disabled>submit</button>
            <p>Username and Email need to be unique!</p>
          </>
        ) : (
          <>
          <button type="submit">submit</button>

          </>
        )}
      </form>
      <Link to={`/user/${loggedInUser}`}>X</Link>
    </div>
  );
};

export default UserEdit;
