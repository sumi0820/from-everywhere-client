import React, { useEffect } from "react";

import { Container, Divider } from "semantic-ui-react";
import ItemsRandom from "../components/ItemsRadom";
import ItemsLatest from "../components/ItemsLatest";
import ItemsLocation from "../components/ItemsLocation";

const Home = ({ loggedInUser, items }) => {
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
