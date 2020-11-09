import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Grid } from "semantic-ui-react";

import SearchForm from "./SearchForm";

const ItemsList = ({ items, onQuickSearch, onSearch }) => {
  return (
    <Container className="itemList__container">
      <Grid columns={2} container divided="vertically" stackable>
        <Grid.Row>
          <Grid.Column floated="left" width={5} textAlign="center">
            <h1>All Items</h1>
          </Grid.Column>
          <Grid.Column floated="right" width={5} textAlign="center">
            <SearchForm onQuickSearch={onQuickSearch} onSearch={onSearch} />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid container columns={3} doubling stackable>
        {items.map((item) => {
          return (
            <Grid.Column
              className="latest__grid"
              as={Link}
              to={`item/${item._id}`}
            >
              <Card key={item._id}>
                <img
                  src={item.image}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
  );
};

export default ItemsList;
