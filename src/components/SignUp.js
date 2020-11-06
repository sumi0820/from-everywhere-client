import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import { API_URL } from "../config";

const sendQuery = (query) => console.log(`Querying for ${query}`);

const SignUp = ({ onSignUp, onUnmount, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const updateQuery = () => {
    // A search query api call.
    axios
      .post(
        `${API_URL}/input-check`,
        { username, email },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data == "isUser") {
          setUsername("isUser");
        } else if (response.data == "isEmail") {
          setEmail("isEmail");
        }
      });
  };

  const delayedQuery = useCallback(debounce(updateQuery, 300), [
    { username, email },
  ]);

  const onChange = (e) => {
    let userInput = {
      [e.target.name]: e.target.value.toLowerCase(),
      [e.target.name]: e.target.value.toLowerCase(),
    };
    setUsername(userInput.username);
    setEmail(userInput.email);
  };

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [{ username, email }, delayedQuery]);

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <form onSubmit={onSignUp}>
      <input type="text" name="username" onChange={onChange} />
      {username == "" ? (
        ""
      ) : username == "isUser" ? (
        <p>Username is unavailable, please choose another!</p>
      ) : (
        <p>Username available!</p>
      )}

      <input type="email" name="email" onChange={onChange} />
      {email == "" ? (
        ""
      ) : email == "isEmail" ? (
        <p>Email is unavailable, please choose another!</p>
      ) : (
        <p>Email available!</p>
      )}
      <input type="password" name="password" />

      <button type="submit">Sign up?</button>
      {errorMessage ? (
        <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
      ) : null}
    </form>
  );
};

export default SignUp;

// {
//   props.usernameStatus == "undefined" ? (
//     ""
//   ) : props.usernameStatus === true ? (
//     <span className="icon is-small is-right check-icon">
//       <Icon path={mdiAlertCircle} size={1} color="#e20f0f" />
//     </span>
//   ) : (
//     <span className="icon is-small is-right check-icon">
//       <Icon path={mdiCheck} size={1} color="#2ed400" />
//     </span>
//   );
// }
