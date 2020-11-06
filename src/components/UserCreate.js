import React from "react";

const UserCreate = ({ onEditProfile }) => {
  return (
    <div>
      <form onSubmit={onEditProfile}>
        <textarea type="text" name="bio" />
        <input type="text" name="location" />
        <input type="text" name="image" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default UserCreate;
