import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../config";


const ItemsLocation = () => {
  const [locationItems, setLocationItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/items/location`, { withCredentials: true })
      .then((response) => {
        setLocationItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Near to your place</h1>
      <div>
        {locationItems.map((item) => {
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

export default ItemsLocation;
