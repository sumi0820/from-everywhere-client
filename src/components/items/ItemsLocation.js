import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Item, Image, Grid } from "semantic-ui-react";
import "../styles/Items.scss";

const ItemsLocation = ({ loggedInUser, items }) => {
  const [locationItems, setLocationItems] = useState([]);

  useEffect(() => {
    if (!items.length) {
      setLocationItems(null);
    } else {
      let sorted = items.filter((item) => {
        return (
          loggedInUser.location == item.user.location &&
          item.user._id != loggedInUser._id
        );
      });
      if (items.length > 4) {
        setLocationItems(sorted.slice(0, 4));
      } else {
        setLocationItems(sorted);
      }
    }
  }, []);

  return (
    <>
      {!locationItems.length ? (
        <p>No one near to your place...</p>
      ) : (
        <div>
          <Container className="location__header__container">
            <h1 className="location__header">Near to your place</h1>
          </Container>

          <Container text>
            <Grid columns={1} container divided="vertically" stackable>
              <Grid.Row>
                <Item.Group divided>
                  {locationItems.map((item, i) => {
                    return (
                      <>
                        {i % 2 ? (
                          <Item>
                            <Item.Content>
                              <Item.Header as={Link} to={`/item/${item._id}`}>
                                {item.name}
                              </Item.Header>
                              <Item.Meta>
                                <span>{item.user.location}</span>
                              </Item.Meta>
                              <Item.Description>
                                {item.description}
                              </Item.Description>
                              <Item.Extra>
                                <Link to={`/public/${item.user._id}`}>
                                  <Image
                                    avatar
                                    circular
                                    src={item.user.imageProfile}
                                  />
                                  {item.user.username}
                                </Link>
                              </Item.Extra>
                            </Item.Content>
                            <Item.Image
                              src={item.image}
                              as={Link}
                              to={`/item/${item._id}`}
                            />
                          </Item>
                        ) : (
                          <Item>
                            <Item.Image
                              src={item.image}
                              as={Link}
                              to={`/item/${item._id}`}
                            />

                            <Item.Content>
                              <Item.Header as={Link} to={`/item/${item._id}`}>
                                {item.name}
                              </Item.Header>
                              <Item.Meta>
                                <span>{item.user.location}</span>
                              </Item.Meta>
                              <Item.Description>
                                {item.description}
                              </Item.Description>
                              <Item.Extra>
                                <Link to={`/public/${item.user._id}`}>
                                  <Image
                                    avatar
                                    circular
                                    src={item.user.imageProfile}
                                  />
                                  {item.user.username}
                                </Link>
                              </Item.Extra>
                            </Item.Content>
                          </Item>
                        )}
                      </>
                    );
                  })}
                </Item.Group>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

export default ItemsLocation;
