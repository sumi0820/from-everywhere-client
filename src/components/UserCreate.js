import React from "react";
import { Link } from "react-router-dom";

const UserCreate = ({ onEditProfile, loggedInUser }) => {
  return (
    <div>
      <form onSubmit={onEditProfile}>
        <textarea type="text" name="bio" />
        <input type="text" name="location" />
        <input type="text" name="image" />
        <button type="submit">submit</button>
      </form>
      <Link to={`/user/${loggedInUser}`}>Skip for now</Link>
    </div>
  );
};

export default UserCreate;
