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
  Rating,
} from "semantic-ui-react";
import "../styles/Profile.scss";
import { API_URL } from "../../config";
import Loading from "../Loading";
import Feedback from "./Feedback";

const UserProfile = (props) => {
  const { loggedInUser, match, onGoBack } = props;
  const [user, setUser] = useState(null);
  const [sentHi, setSentHi] = useState(false);
  const [aveRating, setAveRating] = useState(0);
  const [filteredFeedback, setFilteredFeedback] = useState([]);

  let userId = match.params.userId;
  useEffect(() => {
    axios.get(`${API_URL}/user/${userId}`).then((response1) => {
      setUser(response1.data);
      if (response1.data.item.hi) {
        if (response1.data.item.hi.includes(loggedInUser._id)) {
          setSentHi(true);
        }
      }
      axios
        .get(`${API_URL}/feedback`, { withCredentials: true })
        .then((response2) => {
          let filtered = response2.data.filter((elem) => {
            return elem.to._id == userId;
          });

          if (filtered.length) {
            let rateTotal = filtered.reduce((a, c) => {
              return a + Number(c.rate);
            }, 0);
            console.log("rate check", rateTotal, filtered);
            setFilteredFeedback(filtered);
            setAveRating(rateTotal / filtered.length);
          } else {
            setFilteredFeedback(filtered);
            setAveRating(0);
          }


        });
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
    <p className="form__available">Sent</p>
  );

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
      ) : user._id == loggedInUser._id ? (
        <Redirect to={`/user/${user._id}`} />
      ) : (
        <>
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
                <Grid.Column floated="center" width={5}>
                  {user.item.accepted ? (
                    <p className="form__alert">
                      Sorry the item no longer available...
                    </p>
                  ) : (
                    sentHiValidation
                  )}
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
          <Container text>
            <Divider />
          </Container>

          <Container text style={{ marginBottom: "30px" }}>
            <Grid>
              <Grid.Column floated="left" width={16}>
                <Feedback
                  loggedInUser={loggedInUser}
                  filteredFeedback={filteredFeedback}
                />
              </Grid.Column>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default UserProfile;
