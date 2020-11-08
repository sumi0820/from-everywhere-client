import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../config";

const ItemsRadom = ({ items }) => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${API_URL}/items/random`)
    //   .then((response) => {
    //     setRandomItems(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const randomNum = (max, min) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    let newRandomItems = [];
    for (let i = 0; i < 3; i++) {
      newRandomItems.push(items[randomNum(items.length - 1, 0)]);
    }
    setRandomItems(newRandomItems);
  }, []);

  return (
    <div>
      <h1>Random Items</h1>
      <div>
        {randomItems.map((item) => {
          return (
            <>
              <img src={item.image} alt="" />
              <p key={item._id}>{item.name}</p>
              <Link to={`item/${item._id}`}>
                <button>Detail</button>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsRadom;
