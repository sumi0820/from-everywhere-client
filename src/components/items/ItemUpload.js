import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Form,
  Icon,
  TextArea,
  Input,
  Modal,
  Header,
} from "semantic-ui-react";
import "../styles/Items.scss";

const ItemUpload = ({
  loggedInUser,
  onCreateItem,
  onEditItem,
  onDeleteItem,
  onGoBack,
}) => {
  const [open, setOpen] = useState(false);

  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  return (
    <div>
      <div className="form__container">
        <Container text>
          <Grid container>
            <Grid.Column>
              <Form
                onSubmit={!loggedInUser.item ? onCreateItem : onEditItem}
                className="form__upload"
              >
                <Form.Field required>
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={
                      loggedInUser.item ? loggedInUser.item.name : null
                    }
                    required
                  />
                </Form.Field>

                <Form.Field>
                  <label>Description</label>
                  <TextArea
                    type="text"
                    name="description"
                    defaultValue={
                      loggedInUser.item ? loggedInUser.item.description : null
                    }
                    required
                  />
                </Form.Field>

                <label>Condition</label>

                <Form.Field
                  placeholder="Select item's condition"
                  control="select"
                  name="condition"
                >
                  <option value="Very good">Very good</option>
                  <option value="Normal">Normal</option>
                  <option value="So so">So so</option>
                  <option value="Damaged">Damaged</option>
                </Form.Field>

                <Form.Field>
                  <label>Item Image</label>
                  <Input type="file" name="image" />
                </Form.Field>

                <div className="itemDetail__btn profile__btn__container">
                  <Button
                    className="form__button goback "
                    animated
                    type="submit"
                    secondary
                  >
                    <Button.Content hidden>
                      <Icon name="edit outline" />
                    </Button.Content>
                    <Button.Content visible>Update</Button.Content>
                  </Button>
                </div>
              </Form>
              <div className="form__testMode__container goback">
                <Button
                  className="profile__inbox goback"
                  animated
                  secondary
                  onClick={() => {
                    onGoBack();
                  }}
                >
                  <Button.Content hidden>
                    <Icon name="hand point left outline large" />
                  </Button.Content>
                  <Button.Content visible>Go Back</Button.Content>
                </Button>
                {loggedInUser.item ? (
                  <>
                    <Modal
                      basic
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      size="small"
                      trigger={
                        <Button
                          className="profile__inbox goback"
                          animated
                          color="google plus"
                        >
                          <Button.Content hidden>
                            <Icon name="trash alternate" />
                          </Button.Content>
                          <Button.Content visible>Delete</Button.Content>
                        </Button>
                      }
                    >
                      <Header icon>
                        <Icon name="trash alternate" />
                        <p>Are you sure you want to delete?</p>
                      </Header>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Modal.Actions>
                          <Button
                            color="green"
                            inverted
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <Icon name="remove" /> Cancel
                          </Button>
                          <Button
                            color="google plus"
                            inverted
                            onClick={() => {
                              onDeleteItem(loggedInUser.item._id);
                              setOpen(false);
                            }}
                          >
                            <Icon name="checkmark" /> Delete
                          </Button>
                        </Modal.Actions>
                      </div>
                    </Modal>
                  </>
                ) : null}
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default ItemUpload;
