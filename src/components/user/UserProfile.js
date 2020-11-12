import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Header,
  Icon,
  Button,
  Item,
  Divider,
} from "semantic-ui-react";

import "../styles/Profile.scss";
import { API_URL } from "../../config";
import Feedback from "./Feedback";
import FeedbackModal from "./FeedbackModal";
import ProfileBtn from "./ProfileBtn";
import Loading from "../Loading";

const UserProfile = ({ loggedInUser, onGoBack, onFeedback }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/${loggedInUser._id}`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const profileStyle = {
    backgroundImage:
      user && user.imageBg ? `url(${user.imageBg})` : loggedInUser.imageBg,
  };

  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  return (
    <div>
      {!user ? (
        <Loading />
      ) : (
        <>
          <Container style={{ marginTop: "30px" }}>
            <div className="profile__bg" style={profileStyle}>
              <Grid container columns={1} stackable textAlign="center">
                <div className="profile__top">
                  <img
                    src={user.imageProfile}
                    alt="profile-image"
                    className="profile__photo"
                  />
                  <Header as="h1" className="profile__top__header">
                    {user.username}
                  </Header>
                </div>
              </Grid>
            </div>
          </Container>

          <Container text>
            {user.location ? (
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <p className="itemDetail__location">
                    <Icon name="map marker alternate" />
                    {user.location}
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={2} textAlign="center">
                  <Link to="/user/edit">
                    <Icon name="edit outline" />
                  </Link>
                </Grid.Column>
              </Grid>
            ) : (
              <Grid.Column floated="right" width={5} textAlign="center">
                <Grid.Column floated="left" width={5}>
                  <p className="itemDetail__location">
                    <Icon name="map marker alternate" />
                    <span>No location provided</span>
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={2} textAlign="center">
                  <Link to="/user/edit">
                    <Icon name="edit outline" />
                  </Link>
                </Grid.Column>
              </Grid.Column>
            )}

            <p className="itemDetail__description">{user.bio}</p>
            <Container>
              <Divider />
            </Container>
            <div className="profile__item">
              {!user.item ? (
                <>
                  <Grid columns={1} ui grid stackable>
                    <Grid.Row>
                      <div style={{ marginBottom: "15px" }}>
                        <p>Please upload your item</p>
                        <Link to="/upload-item">
                          <Button
                            className="profile__inbox goback"
                            animated
                            color="linkedin"
                          >
                            <Button.Content hidden>
                              <Icon name="cloud upload" />
                            </Button.Content>
                            <Button.Content visible>Upload</Button.Content>
                          </Button>
                        </Link>
                      </div>
                    </Grid.Row>
                  </Grid>
                </>
              ) : (
                <div>
                  {user && user.item.accepted ? (
                    <FeedbackModal onFeedback={onFeedback} />
                  ) : (
                    <Grid columns={1} container divided="vertically" stackable>
                      <Grid.Row>
                        <Item.Group divided>
                          <Item>
                            <Item.Image
                              src={user.item.image}
                              as={Link}
                              to={`/item/${user.item._id}`}
                            />
                            <Item.Content>
                              <Item.Header
                                as={Link}
                                to={`/item/${user.item._id}`}
                              >
                                {user.item.name}
                              </Item.Header>
                              <Item.Meta>
                                <Link to="/upload-item">
                                  <Icon name="edit outline" />
                                </Link>
                              </Item.Meta>
                              <Item.Description>
                                {user.item.description}
                              </Item.Description>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Grid.Row>
                    </Grid>
                  )}
                </div>
              )}
            </div>
          </Container>

          <ProfileBtn onGoBack={onGoBack} />

          <Container text>
            <Divider />
          </Container>

          <Container text>
            <Grid>
              <Grid.Column floated="left" width={16}>
                <Feedback loggedInUser={loggedInUser} />
              </Grid.Column>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default UserProfile;
