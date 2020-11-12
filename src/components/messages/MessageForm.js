import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import "../styles/Inbox.scss";

const MessageForm = ({ onSend }) => {
  return (
    <div className="inbox__messageForm">
      <form
        onSubmit={(event) => {
          onSend(event);
        }}
        className="message__form"
      >
          <Input
            type="text"
            name="body"
            className="inbox__messageForm__input"
          />

          <Button
            type="submit"
            className="inbox__messageForm__btn"
          ><Icon name='send'/></Button>
      </form>
    </div>
  );
};

export default MessageForm;
