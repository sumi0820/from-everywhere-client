import React, { useEffect } from "react";
import ItemsRandom from "../components/ItemsRadom";
import ItemsLatest from "../components/ItemsLatest";
import ItemsLocation from "../components/ItemsLocation";

const Home = ({ loggedInUser, items }) => {
  return (
    <>
      <div>
        <ItemsRandom items={items} />
      </div>
      <div>
        <ItemsLatest items={items} />
      </div>
      <div>
        <ItemsLocation items={items} loggedInUser={loggedInUser}/>
      </div>
    </>
  );
};

export default Home;
