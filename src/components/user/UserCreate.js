import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
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
import "../styles/Form.scss";

const UserCreate = ({ onEditProfile, loggedInUser }) => {
  const [location, setLocation] = useState("");

  const handleLocation = (_, e) => {
    const { type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setLocation(val);
  };
  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  return (
    <div>
      <div className="form__container">
        <Container text>
          <Grid container>
            <Grid.Column>
              <Form onSubmit={onEditProfile} className="form__upload">
                <Form.Field>
                  <label>Bio</label>
                  <TextArea type="text" name="bio" />
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
                    className="form__button goback"
                    animated
                    type="submit"
                    secondary
                  >
                    <Button.Content hidden>
                      <Icon name="edit outline" />
                    </Button.Content>
                    <Button.Content visible>Proceed</Button.Content>
                  </Button>
                </div>
              </Form>

              <div className="form__testMode__container goback">
                <Link to={`/user/${loggedInUser}`} style={{ width: "100%" }}>
                  <Button
                    className="form__button "
                    animated
                    type="submit"
                    secondary
                  >
                    <Button.Content hidden>
                      <Icon name="forward " />
                    </Button.Content>
                    <Button.Content visible>Skip for now</Button.Content>
                  </Button>
                </Link>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default UserCreate;
