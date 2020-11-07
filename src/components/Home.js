import React from "react";
import ItemsRandom from "../components/ItemsRadom";
import ItemsLatest from "../components/ItemsLatest";
import ItemsLocation from "../components/ItemsLocation";

const Home = () => {
  
  return (
    <>
      <div>
        <ItemsRandom />
      </div>
      <div>
        <ItemsLatest />
      </div>
      <div>
        <ItemsLocation/>
      </div>
    </>
  );
};

export default Home;
