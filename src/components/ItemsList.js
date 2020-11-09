import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const ItemsList = ({ items, onQuickSearch, onSearch }) => {
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
