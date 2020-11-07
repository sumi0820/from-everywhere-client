import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const UserProfile = ({ loggedInUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/user/${loggedInUser._id}`).then((response) => {
      setUser(response.data);
    });
  }, []);

  console.log(user);
  return (
    <div>
      <div>
        <img src="{user.image}" alt="profile-image" />
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
          <>
            <img src={user.item.image} alt="item-image" />
            <p>{user.item.name}</p>
            <Link to="/upload-item">Edit</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
