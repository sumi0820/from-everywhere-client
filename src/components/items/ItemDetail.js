import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Button,
  Grid,
  Header,
  Icon,
  Image,
} from "semantic-ui-react";

import Loading from '../Loading'


import "../styles/Items.scss";
import { API_URL } from "../../config";

const ItemDetail = (props) => {
  const { onGoBack } = props;
  const [item, setItem] = useState(null);

  useEffect(() => {
    let itemId = props.match.params.itemId;

    axios
      .get(`${API_URL}/item/${itemId}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => {
      });
  }, []);
  if (!props.loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  return (
    <div>
      {!item ? (
        <Loading />
      ) : (
        <>
          <Container
            style={{
              marginTop: "30px",
              maxHeight: "500px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          >
            <div className="itemDetail__img__container">
              <img
                src={item.image}
                alt="itemDetail__img"
                className="itemDetail__img"
              />
            </div>
          </Container>

          <Container text>
            {item.user.location ? (
              <Grid>
                <Grid.Column floated="right" width={5} textAlign="center">
                  <p className="itemDetail__location">
                    <Icon name="map marker alternate" />
                    {item.user.location}
                  </p>
                </Grid.Column>
              </Grid>
            ) : (
              <Grid.Column floated="right" width={5} textAlign="center">
                <p className="itemDetail__location">
                  <Icon name="map marker alternate" />
                  <span>No location provided</span>
                </p>
              </Grid.Column>
            )}
            <Header as="h2">{item.name}</Header>

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Link to={`/public/${item.user._id}`}>
                  <Image avatar circular src={item.user.imageProfile} />
                  <span>{item.user.username}</span>
                </Link>{" "}
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <p>{item.condition}</p>
              </Grid.Column>
            </Grid>

            <p className="itemDetail__description">{item.description}</p>
            <Container>
              <Grid columns={1} ui centered grid stackable>
                <Grid.Row>
                  <div className="itemDetail__btn">
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
          </Container>
        </>
      )}
    </div>
  );
};

export default ItemDetail;
