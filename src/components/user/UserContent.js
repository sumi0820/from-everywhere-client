import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Header, Icon, Rating } from "semantic-ui-react";

import "../styles/Profile.scss";
import ProfileBtn from "./ProfileBtn";

const UserContent = ({ user, loggedInUser, sentHiValidation, aveRating }) => {
  const profileStyle = {
    backgroundImage:
      user && user.imageBg ? `url(${user.imageBg})` : loggedInUser.imageBg,
  };

  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        <div className="profile__bg " style={profileStyle}>
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
              {user._id == loggedInUser._id ? (
                <Grid.Column floated="center" width={2} textAlign="center">
                  <ProfileBtn />
                </Grid.Column>
              ) : null}
            </div>
          </Grid>
        </div>
      </Container>

      <Container text>
        <Grid>
          {user.location ? (
            <Grid.Column floated="left" width={5}>
              <p className="itemDetail__location">
                <Icon name="map marker alternate" />
                {user.location}
              </p>
            </Grid.Column>
          ) : (
            <Grid.Column floated="left" width={5}>
              <p className="itemDetail__location">
                <Icon name="map marker alternate" />
                <span>No location</span>
              </p>
            </Grid.Column>
          )}

          {user._id == loggedInUser._id ? (
            <Grid.Column floated="right" width={2} textAlign="center">
              <Link to="/user/edit">
                <Icon name="edit outline" />
              </Link>
            </Grid.Column>
          ) : (
            <Grid.Column floated="center" width={5}>
              {user.item.accepted ? (
                <p className="form__alert">Unavailable...</p>
              ) : (
                sentHiValidation
              )}
            </Grid.Column>
          )}
        </Grid>

        <div className="profile__content">
          <Rating
            rating={aveRating}
            maxRating={5}
            size="large"
            clearable
            disabled
          />

          <p className="itemDetail__description">{user.bio}</p>
        </div>
      </Container>
    </>
  );
};

export default UserContent;
