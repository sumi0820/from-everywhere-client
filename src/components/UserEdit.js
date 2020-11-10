import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
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
import { API_URL } from "../config";

const UserEdit = ({ onEditProfile, loggedInUser, onUnmount, onGoBack }) => {
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const updateUsernameQuery = (username) => {
    // A search query api call.
    axios
      .post(
        `${API_URL}/input-check/edit-user`,
        { username },
        { withCredentials: true }
      )
      .then((response) => {
        switch (response.data) {
          case "isUser":
            setUsername("isUser");
            break;
          default:
            console.log("Available");
        }
      });
  };

  const updateEmailQuery = (email) => {
    // A search query api call.
    console.log(email);

    axios
      .post(
        `${API_URL}/input-check/edit-email`,
        { email },
        { withCredentials: true }
      )
      .then((response) => {
        switch (response.data) {
          case "isEmail":
            setEmail("isEmail");
            break;
          default:
            console.log("Available");
        }
      });
  };

  const debounceSearchUsername = useRef(
    _.debounce((username) => {
      updateUsernameQuery(username);
    }, 1000)
  );

  const debounceSearchEmail = useRef(
    _.debounce((email) => {
      updateEmailQuery(email);
    }, 1000)
  );

  useEffect(() => {
    if (username) {
      setUsername(username);
      debounceSearchUsername.current(username);
    }
  }, [username]);
  useEffect(() => {
    if (email) {
      setEmail(email);
      debounceSearchEmail.current(email);
    }
  }, [email]);

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <div>
      <div className="form__container">
        <Container text>
          <Grid container>
            <Grid.Column>
              <Form onSubmit={onEditProfile} className="form__form">
                <Form.Field required>
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={loggedInUser.username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  />
                </Form.Field>
                {username == "" || username == undefined ? (
                  ""
                ) : username == "isUser" ? (
                  <p className="form__alert">
                    Username is unavailable, please choose another!
                  </p>
                ) : (
                  <p className="form__available">Username available!</p>
                )}
                <Form.Field>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={loggedInUser.email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                </Form.Field>
                {email == "" || email == undefined ? (
                  ""
                ) : email == "isEmail" ? (
                  <p className="form__alert">
                    Email is unavailable, please choose another!
                  </p>
                ) : (
                  <p className="form__available">Email available!</p>
                )}

                <Form.Field>
                  <label>Bio</label>
                  <TextArea
                    type="text"
                    name="bio"
                    defaultValue={loggedInUser.bio}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={loggedInUser.location}
                  />
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

                <Grid columns={1} ui centered grid stackable>
                  <Grid.Row>
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
                  </Grid.Row>
                </Grid>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
        <Container text className='form__edit__container'>
          <Grid columns={1} ui centered grid stackable>
            <Grid.Row>
              <div className="itemDetail__btn profile__btn__container">
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
              </div>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default UserEdit;
