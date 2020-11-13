import React from "react";
import { Button, Modal } from "semantic-ui-react";

const ChatModal = ({ selectedUser, handleAccept }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open } = state;
  function exampleReducer(state, action) {
    switch (action.type) {
      case "close":
        return { open: false };
      case "open":
        return { open: true };
      default:
        throw new Error("Unsupported action...");
    }
  }

  return (
    <div>
      <Button
        onClick={() => dispatch({ type: "open" })}
        style={{ marginLeft: "10px" }}
        secondary
      >
        Accept
      </Button>
      <Modal size="mini" open={open}>
        <Modal.Header>Please confirm</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to accept?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button
            positive
            onClick={() => {
              handleAccept(selectedUser._id);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ChatModal;
