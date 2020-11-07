import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../config";

const ItemsRadom = () => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/items/random`)
      .then((response) => {
        setRandomItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
