import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Icon, Card } from "semantic-ui-react";
import "../styles/Items.scss";


const ItemsLatest = ({ items, loggedInUser }) => {
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {

    let sorted = items.sort((a, b) => {
      return a.updatedAt - b.updatedAt;
    }).filter(item =>{
      return item.user._id != loggedInUser._id
    });
    if (items.length > 7) {
      setLatestItems(sorted.slice(0, 6));
    } else {
      setLatestItems(sorted);
    }
  }, []);

  return (
    <>
      {!items.length ? (
        <p>There's no item uploaded yet</p>
      ) : (
        <div className="items__container">
          <Container>
            <Grid columns={2} container divided="vertically" stackable>
              <Grid.Row>
                <Grid.Column floated="left" width={5} textAlign="left">
                  <h1>Latest Items</h1>
                </Grid.Column>
                <Grid.Column floated="right" width={5} textAlign="center">
                  <Link to="/item-list">
                    <Icon name="ellipsis horizontal large" />
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid container columns={3} doubling stackable>
              {latestItems.map((item) => {
                return (
                  <Grid.Column
                    className="latest__grid"
                    as={Link}
                    to={`item/${item._id}`}
                  >
                    <Card key={item._id}>
                      <img
                        src={item.image}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Content>
                        <Card.Header>
                          {item.name.length >= 20
                            ? item.name.slice(0, 20) + "..."
                            : item.name}
                        </Card.Header>
                        <Card.Meta>{item.user.username}</Card.Meta>
                        <Card.Description>
                          {item.description.length >= 70
                            ? item.description.slice(0, 70) + "..."
                            : item.description}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Link to={`item/${item._id}`}>Read more</Link>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

export default ItemsLatest;
