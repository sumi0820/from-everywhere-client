import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import _ from "lodash";
import {
  Container,
  Grid,
  Button,
  Form,
  Icon,
  TextArea,
  Input,
} from "semantic-ui-react";
import { CountryDropdown } from "react-country-region-selector";

import FormValidation from "../FormValidation";
import "../styles/Form.scss";

const UserEdit = ({ onEditProfile, loggedInUser, onUnmount, onGoBack }) => {
  const [location, setLocation] = useState("");

  const handleLocation = (_, e) => {
    const { type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setLocation(val);
  };

  useEffect(() => {
    return onUnmount;
  }, []);

  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }

  return (
    <div>
      <div className="form__container">
        <Container text>
          <Grid container>
            <Grid.Column>
              <Form onSubmit={onEditProfile} className="form__editUser">
                <FormValidation loggedInUser={loggedInUser} />
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
                  <CountryDropdown
                    name="location"
                    valueType="short"
                    value={location}
                    onChange={handleLocation}
                    priorityOptions={["US", "CA", "DE", "FR", "CN", "JP"]}
                    defaultOptionLabel={loggedInUser.location}
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
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default UserEdit;
