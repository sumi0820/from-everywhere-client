import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

import { API_URL } from "../config";

const ItemsList = ({ items, onQuickSearch, onSearch }) => {
  //   const [items, setItems] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get(`${API_URL}/items`)
  //       .then((response) => {
  //         setItems(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);
  return (
    <div>
      <h1>All Items</h1>
      <SearchForm onQuickSearch={onQuickSearch} onSearch={onSearch} />
      <div>
        {items.map((item) => {
          return (
            <>
              <img src={item.image} alt="" />
              <p key={item._id}>{item.name}</p>
              <p>{item.description}</p>
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

export default ItemsList;
