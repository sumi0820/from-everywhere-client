import React from "react";
import { Redirect } from "react-router-dom";

import { Container, Divider } from "semantic-ui-react";
import ItemsRandom from "./ItemsRadom";
import ItemsLatest from "./ItemsLatest";
import ItemsLocation from "./ItemsLocation";

const Home = ({ loggedInUser, items }) => {
  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  return (
    <>
      <Container>
        <ItemsRandom items={items} />
      </Container>
      <div>
        <ItemsLatest items={items} />
      </div>
      <Container >
        <Divider />
      </Container>
      <Container>
        <ItemsLocation items={items} loggedInUser={loggedInUser} />
      </Container>
    </>
  );
};

export default Home;
