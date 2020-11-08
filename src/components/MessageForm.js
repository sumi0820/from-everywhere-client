import React from "react";

const MessageForm = ({ onSend, userId }) => {
  return (
    <div>
      <form
        onSubmit={(event) => {
          onSend(userId, event);
        }}
      >
        <input type="text" name="body" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
