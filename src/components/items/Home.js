import React from "react";
import { Redirect } from "react-router-dom";

import { Container, Divider } from "semantic-ui-react";
import ItemsRandom from "./ItemsRadom";
import ItemsLatest from "./ItemsLatest";
import ItemsLocation from "./ItemsLocation";
import Loading from "../Loading";

const Home = ({ loggedInUser, items }) => {
  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  // console.log(items);
  return (
    <>
      {!items ? (
        <Loading />
      ) : (
        <>
          <Container>
            <ItemsRandom items={items} loggedInUser={loggedInUser} />
          </Container>
          <div>
            <ItemsLatest items={items} loggedInUser={loggedInUser} />
          </div>
          <Container>
            <Divider />
          </Container>
          <Container>
            <ItemsLocation items={items} loggedInUser={loggedInUser} />
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
