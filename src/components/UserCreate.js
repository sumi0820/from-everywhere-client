import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Message,
  Form,
  Icon,
  TextArea,
  Input,
} from "semantic-ui-react";
import "./styles/Form.scss";

const UserCreate = ({ onEditProfile, loggedInUser }) => {
  return (
    <div>

      <div className="form__container">
        <Container text>
          <Grid container>
            <Grid.Column>
              <Form onSubmit={onEditProfile} className="form__form">
                <Form.Field>
                  <label>Bio</label>
                  <TextArea type="text" name="bio" />
                </Form.Field>

                <Form.Field>
                  <label>Location</label>
                  <input type="text" name="location" />
                </Form.Field>

                <Grid container columns={2} stackable>
                  <Grid.Column>
                    <Form.Field>
                      <label>Profile Image</label>
                      <Input type="file" name="imageProfile" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Background Image</label>
                      <Input type="file" name="imageBg" />
                    </Form.Field>
                  </Grid.Column>
                </Grid>

                <Button
                  className="form__button goback"
                  animated
                  type="submit"
                  secondary
                >
                  <Button.Content hidden>
                    <Icon name="sign-in" />
                  </Button.Content>
                  <Button.Content visible>Sign in</Button.Content>
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      <Link to={`/user/${loggedInUser}`}>Skip for now</Link>
    </div>
  );
};

export default UserCreate;
