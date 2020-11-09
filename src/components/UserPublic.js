import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const UserProfile = (props) => {
  const { loggedInUser, match, onGoBack } = props;
  const [user, setUser] = useState(null);
  const [sentHi, setSentHi] = useState(false);
  let userId = match.params.userId;
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`).then((response) => {
      setUser(response.data);
      console.log(response.data.item);
      if (response.data.item.hi) {
        if (response.data.item.hi.includes(loggedInUser._id)) {
          setSentHi(true);
        }
      }
    });
  }, []);

  const handleSendHi = (userId) => {
    console.log(userId);
    axios
      .post(`${API_URL}/send-hi/${userId}`, {}, { withCredentials: true })
      .then((response) => {
        console.log("This is send hi", response.data);
        setSentHi(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let sentHiValidation = !sentHi ? (
    <button
      onClick={() => {
        handleSendHi(userId);
      }}
    >
      Send Hi
    </button>
  ) : (
    <p>Successfully sent</p>
  );

  return (
    <div>
      {!user ? (
        <p>Loading</p>
      ) : user._id == loggedInUser._id ? (
        <Redirect to={`/user/${user._id}`} />
      ) : (
        <>
          <div>
            <img src={user.image} alt="profile-image" />
            <p>{user.username}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
          </div>
          {user.item.accepted ? (
            <p>Sorry the item no longer available...</p>
          ) : (
            sentHiValidation
          )}

          {}

          <button
            onClick={() => {
              onGoBack();
            }}
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
