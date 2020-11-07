import React from "react";
import { Link } from "react-router-dom";

const UserProfile = ({ loggedInUser }) => {
  console.log(loggedInUser);
  return (
    <div>
      <div>
        <img src="{loggedInUser.image}" alt="" />
        <p>{loggedInUser.username}</p>
        <p>{loggedInUser.bio}</p>
        <p>{loggedInUser.location}</p>
      </div>
      <div>
        {!loggedInUser.item ? (
          <>
            <p>Please upload your item</p>
            <Link to="/upload-item">Upload</Link>
          </>
        ) : (
          <>
            <img src={loggedInUser.item.image} alt="" />
            <p>{loggedInUser.item.title}</p>
            <Link to="/upload-item">Edit</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
