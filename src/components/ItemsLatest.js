import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../config";

const ItemsLatest = () => {
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/items/latest`)
      .then((response) => {
        setLatestItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Latest Items</h1>
      <button>
        <Link to="/item-list">...</Link>
      </button>
      <div>
        {latestItems.map((item) => {
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
      </div>
    </div>
  );
};

export default ItemsLatest;
