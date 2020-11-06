import React from "react";

const UserProfile = ({ loggedInUser }) => {
  console.log(loggedInUser);
  return (
    <div>
      <p>{loggedInUser.image}</p>
      <p>{loggedInUser.username}</p>
      <p>{loggedInUser.bio}</p>
      <p>{loggedInUser.location}</p>
    </div>
  );
};

export default UserProfile;
