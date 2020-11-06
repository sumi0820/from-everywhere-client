import React from "react";

const UserProfile = ({ loggedInUser }) => {
  return (
    <div>
      <p>{loggedInUser.username}</p>
    </div>
  );
};

export default UserProfile;
