import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Icon, Button, Divider } from "semantic-ui-react";

import "../styles/Profile.scss";
import { API_URL } from "../../config";
import Feedback from "./Feedback";
import FeedbackModal from "./FeedbackModal";
import UserContent from "./UserContent";
import UserItem from "./UserItem";
import Loading from "../Loading";

const UserProfile = ({ loggedInUser, onFeedback, match }) => {
  const [user, setUser] = useState(null);
  const [aveRating, setAveRating] = useState(0);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [sentHi, setSentHi] = useState(false);

  let userId;

  useEffect(() => {
    userId =
      match.params.userId == loggedInUser._id
        ? loggedInUser._id
        : match.params.userId;
    axios
      .get(`${API_URL}/user/${userId}`, { withCredentials: true })
      .then((response1) => {
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
              return match.params.userId == loggedInUser._id
                ? elem.to._id == loggedInUser._id
                : elem.to._id == match.params.userId;
            });

            if (filtered.length) {
              let rateTotal = filtered.reduce((a, c) => {
                return a + Number(c.rate);
              }, 0);
              setFilteredFeedback(filtered);
              setAveRating(rateTotal / filtered.length);
            } else {
              setFilteredFeedback(filtered);
              setAveRating(0);
            }
          });
      });
  }, [match.params.userId]);

  const handleSendHi = (userId) => {
    axios
      .post(`${API_URL}/send-hi/${userId}`, {}, { withCredentials: true })
      .then((response) => {
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
    <p className="form__available" style={{ textAlign: "center" }}>
      Sent
    </p>
  );

  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  return (
    <div>
      {!user ? (
        <Loading />
      ) : (
        <>
          <UserContent
            user={user}
            loggedInUser={loggedInUser}
            aveRating={aveRating}
            sentHiValidation={sentHiValidation}
          />

          <Container text>
            <Divider />
          </Container>

          <Container text>
            <div className="profile__item">
              {!loggedInUser.item ? (
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
                  {user._id == loggedInUser._id && user.item.accepted ? (
                    <FeedbackModal onFeedback={onFeedback} />
                  ) : (
                    <UserItem user={user} loggedInUser={loggedInUser} />
                  )}
                </div>
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
