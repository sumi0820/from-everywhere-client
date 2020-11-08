import React from "react";

const Inbox = ({ messages }) => {
  return (
    <div>
      <h1>Inbox</h1>
      {messages.map((chat) => {
        return <></>;
      })}
    </div>
  );
};

export default Inbox;
