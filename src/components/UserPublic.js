import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const UserProfile = (props) => {
  const { loggedInUser, match, onGoBack } = props;
  const [user, setUser] = useState(null);
  let userId = match.params.userId;
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, []);
  console.log(loggedInUser, user);
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

          <Link to={`/inbox/${userId}`}>Send Request</Link>

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
