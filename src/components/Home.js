import React, { useEffect } from "react";
import ItemsRandom from "../components/ItemsRadom";
import ItemsLatest from "../components/ItemsLatest";
import ItemsLocation from "../components/ItemsLocation";
import { Container } from "semantic-ui-react";

const Home = ({ loggedInUser, items }) => {
  return (
    <>
      <div>
        <ItemsRandom items={items} />
      </div>
      <Container>
        <ItemsLatest items={items} />
      </Container>
      <Container>
        <ItemsLocation items={items} loggedInUser={loggedInUser} />
      </Container>
    </>
  );
};

export default Home;
