import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Item, Image } from "semantic-ui-react";

import { API_URL } from "../config";

const ItemsLocation = ({ loggedInUser, items }) => {
  const [locationItems, setLocationItems] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${API_URL}/items/location`, { withCredentials: true })
    //   .then((response) => {
    //     setLocationItems(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let sorted = items.filter((item) => {
      return loggedInUser.location == item.user.location;
    });
    if (items.length > 4) {
      setLocationItems(sorted.slice(0, 4));
    } else {
      setLocationItems(sorted);
    }
  }, []);

  return (
    <div>
      <h1>Near to your place</h1>
      {/* <div>
        {locationItems.map((item) => {
          return (
            <>
              <img src={item.image} alt="" />
              <p key={item._id}>{item.name}</p>
              <p key={item._id}>{item.description}</p>
              <Link to={`item/${item._id}`}>
                <button>Detail</button>
              </Link>
            </>
          );
        })}
      </div> */}

      <Container text>
        <Item.Group divided>
          {locationItems.map((item, i) => {
            return (
              <>
                {i % 2 ? (
                  <Item>
                    <Item.Content>
                      <Item.Header as={Link} to={`item/${item._id}`}>
                        {item.name}
                      </Item.Header>
                      <Item.Meta>
                        <span>{item.user.location}</span>
                      </Item.Meta>
                      <Item.Description>{item.description}</Item.Description>
                      <Item.Extra>
                        <Link to={`/public/${item.user._id}`}>
                          <Image avatar circular src={item.user.image} />
                          {item.user.username}
                        </Link>
                      </Item.Extra>
                    </Item.Content>
                    <Item.Image
                      src={item.image}
                      as={Link}
                      to={`item/${item._id}`}
                    />
                  </Item>
                ) : (
                  <Item>
                    <Item.Image
                      src={item.image}
                      as={Link}
                      to={`item/${item._id}`}
                    />

                    <Item.Content>
                      <Item.Header as={Link} to={`item/${item._id}`}>
                        {item.name}
                      </Item.Header>
                      <Item.Meta>
                        <span>{item.user.location}</span>
                      </Item.Meta>
                      <Item.Description>{item.description}</Item.Description>
                      <Item.Extra>
                        <Link to={`/public/${item.user._id}`}>
                          <Image avatar circular src={item.user.image} />
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
      </Container>
    </div>
  );
};

export default ItemsLocation;
