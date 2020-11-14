import React, { useState } from "react";
import "../styles/Profile.scss";

import {
  Container,
  Icon,
  Button,
  Modal,
  Rating,
  Form,
  TextArea,
} from "semantic-ui-react";

const FeedbackModal = ({ onFeedback }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const handleChangeOnRate = (e, { rating }) => {
    e.preventDefault();
    setRating(rating);
  };
  return (
    <Container text>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        as={Form}
        onSubmit={(e) => {
          onFeedback(e, rating);
        }}
        trigger={
          <div className="profile__itemStatus ">
            <p>Have you received the item?</p>
            <Button
              className="profile__inbox goback"
              animated
              secondary
              style={{ marginBottom: "10px", width: "70px" }}
            >
              <Button.Content hidden>
                <Icon name="check circle outline" />
              </Button.Content>
              <Button.Content visible>Yes</Button.Content>
            </Button>
          </div>
        }
      >
        <Modal.Header>Add Recommendation</Modal.Header>

        <Modal.Content image>
          <Modal.Description>
            <Form.Field>
              <label>How many stars would you give?</label>

              <Rating
                name="rate"
                clearable
                defaultRating={0}
                maxRating={5}
                size="huge"
                value={rating}
                onRate={handleChangeOnRate}
              />
            </Form.Field>

            <Form.Field>
              <label>Feel free to add your feedback for the owner.</label>
              <TextArea type="text" name="feedback" required />
            </Form.Field>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="google plus" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            positive
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default FeedbackModal;
