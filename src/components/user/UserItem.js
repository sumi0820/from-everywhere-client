import React from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Item } from "semantic-ui-react";

const UserItem = ({ user, loggedInUser }) => {


  return (
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
              {loggedInUser && loggedInUser._id == user._id ? (
                <Item.Meta>
                  <Link to="/upload-item">
                    <Icon name="edit outline" />
                  </Link>
                </Item.Meta>
              ) : null}
              <Item.Description>{user.item.description}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Row>
    </Grid>
  );
};

export default UserItem;
