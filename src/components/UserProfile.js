import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const UserProfile = ({ loggedInUser, onGoBack, onUpdate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/${loggedInUser._id}`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const handleUpdate = () => {
    axios
      .post(
        `${API_URL}/user/${loggedInUser._id}/update-status`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      {!user ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            <img src={user.image} alt="profile-image" />
            <p>{user.username}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>

            <Link to="/user/edit">Edit</Link>
          </div>
          <div>
            {!user.item ? (
              <>
                <p>Please upload your item</p>
                <Link to="/upload-item">Upload</Link>
              </>
            ) : (
              <div>
                {user && user.item.accepted ? (
                  <>
                    <p>Have you received the item?</p>
                    <Link to="/upload-item">
                      <button onClick={handleUpdate}>Yes!</button>
                    </Link>
                  </>
                ) : (
                  <>
                    <img src={user.item.image} alt="item-image" />
                    <p>{user.item.name}</p>
                    <Link to="/upload-item">Edit</Link>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              onGoBack();
            }}
          >
            X
          </button>
          <Link to="/inbox">Inbox</Link>
        </>
      )}
    </div>
  );
};

export default UserProfile;
