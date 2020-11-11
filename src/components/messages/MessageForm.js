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
        {/* <Form.Field> */}
          <Input
            type="text"
            name="body"
            className="inbox__messageForm__input"
          />
        {/* </Form.Field>
        <Form.Field> */}
          <Button
            type="submit"
            className="inbox__messageForm__btn"
          ><Icon name='send'/></Button>
        {/* </Form.Field> */}
      </form>
    </div>
  );
};

export default MessageForm;
