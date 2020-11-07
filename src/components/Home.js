import React from "react";
import ItemsRandom from "../components/ItemsRadom";
// import ItemsLatest from "../components/ItemsLatest";
// import ItemsLocation from "../components/ItemsLocation";

const Home = () => {
  return (
    <>
      <div>
        <ItemsRandom />
      </div>
      <div>
        <h1>Latest</h1>
      </div>
      <div>
        <h1>Neat to your place</h1>
      </div>
    </>
  );
};

export default Home;
