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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import "../styles/Profile.scss";
import { API_URL } from "../../config";

const UserProfile = ({ loggedInUser, onGoBack, onUpdate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/${loggedInUser._id}`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const handleUpdate = () => {
    axios
      .post(
        `${API_URL}/user/${loggedInUser._id}/update-status`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

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
        <p>Loading</p>
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
                  <p>Please upload your item</p>
                  <Link to="/upload-item">Upload</Link>
                </>
              ) : (
                <div>
                  {user && user.item.accepted ? (
                    <Container text>
                      <div className="profile__itemStatus">
                        <p>Have you received the item?</p>
                        <Link to="/upload-item">
                          <Button
                            className="profile__inbox goback"
                            animated
                            secondary
                            style={{ marginBottom: "10px" }}
                            onClick={handleUpdate}
                          >
                            <Button.Content hidden>
                              <Icon name="check circle outline" />
                            </Button.Content>
                            <Button.Content visible>Yes</Button.Content>
                          </Button>
                        </Link>
                      </div>
                    </Container>
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

          <Grid columns={1} ui centered grid stackable>
            <Grid.Row>
              <div className="itemDetail__btn profile__btn__container">
                <Link to="/inbox">
                  <Button
                    className="profile__inbox goback"
                    animated
                    secondary
                    style={{ marginBottom: "10px" }}
                  >
                    <Button.Content hidden>
                      <Icon name="mail outline large" />
                    </Button.Content>
                    <Button.Content visible>Inbox</Button.Content>
                  </Button>
                </Link>

                <Button
                  className="profile__inbox goback"
                  animated
                  secondary
                  onClick={() => {
                    onGoBack();
                  }}
                >
                  <Button.Content hidden>
                    <FontAwesomeIcon icon={faBackspace} color="white" />
                  </Button.Content>
                  <Button.Content visible>Go Back</Button.Content>
                </Button>
              </div>
            </Grid.Row>
          </Grid>
        </>
      )}
    </div>
  );
};

export default UserProfile;
