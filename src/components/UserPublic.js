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
import "./styles/Profile.scss";
import { API_URL } from "../config";

const UserProfile = (props) => {
  const { loggedInUser, match, onGoBack } = props;
  const [user, setUser] = useState(null);
  const [sentHi, setSentHi] = useState(false);
  let userId = match.params.userId;
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`).then((response) => {
      setUser(response.data);
      console.log(response.data.item);
      if (response.data.item.hi) {
        if (response.data.item.hi.includes(loggedInUser._id)) {
          setSentHi(true);
        }
      }
    });
  }, []);

  const handleSendHi = (userId) => {
    console.log(userId);
    axios
      .post(`${API_URL}/send-hi/${userId}`, {}, { withCredentials: true })
      .then((response) => {
        console.log("This is send hi", response.data);
        setSentHi(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let sentHiValidation = !sentHi ? (
    // <Button
    //   onClick={() => {
    //     handleSendHi(userId);
    //   }}
    // >
    //   Send Hi
    // </Button>
    <div className="userPublic__btn__container">
      <Button
        className="profile__inbox goback "
        animated
        secondary
        onClick={() => {
          handleSendHi(userId);
        }}
      >
        <Button.Content hidden>
          <Icon name="send large" />
        </Button.Content>
        <Button.Content visible>Send Hi</Button.Content>
      </Button>
    </div>
  ) : (
    <p className="form__available">Successfully sent</p>
  );

  const profileStyle = {
    backgroundImage:
      user && user.imageBg ? `url(${user.imageBg})` : loggedInUser.imageBg,
  };

  return (
    <div>
      {!user ? (
        <p>Loading</p>
      ) : user._id == loggedInUser._id ? (
        <Redirect to={`/user/${user._id}`} />
      ) : (
        <>
          {/* <div>
            <img src={user.image} alt="profile-image" />
            <p>{user.username}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
          </div>
          {user.item.accepted ? (
            <p>Sorry the item no longer available...</p>
          ) : (
            sentHiValidation
          )}

          {}

          <button
            onClick={() => {
              onGoBack();
            }}
          >
            X
          </button> */}
          <Container style={{ marginTop: "30px" }}>
            <div className="profile__bg " style={profileStyle}>
              <div className="profile__bg ">
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
              </Grid>
            ) : (
              <Grid.Column floated="right" width={5} textAlign="center">
                <Grid.Column floated="left" width={5}>
                  <p className="itemDetail__location">
                    <Icon name="map marker alternate" />
                    <span>No location provided</span>
                  </p>
                </Grid.Column>
              </Grid.Column>
            )}

            <p className="itemDetail__description">{user.bio}</p>

            <Container>
              <Divider />
            </Container>

            <div>
              {!user.item ? (
                <>
                  <p>There's no item uploaded yet...</p>
                </>
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
                          <Item.Header as={Link} to={`/item/${user.item._id}`}>
                            {user.item.name}
                          </Item.Header>

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
          </Container>
          <Container>
            <Grid columns={1} ui centered grid stackable>
              <Grid.Row>
                <div className="itemDetail__btn profile__btn__container">
                  {user.item.accepted ? (
                    <p className="form__alert">
                      Sorry the item no longer available...
                    </p>
                  ) : (
                    sentHiValidation
                  )}
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
        </>
      )}
    </div>
  );
};

export default UserProfile;
