import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const ItemDetail = (props) => {
  const { onGoBack } = props;
  const [item, setItem] = useState(null);

  useEffect(() => {
    let itemId = props.match.params.itemId;

    axios
      .get(`${API_URL}/item/${itemId}`)
      .then((response) => {
        setItem(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!item ? (
        <p>Loading</p>
      ) : (
        <>
          <img src={item.image} alt="" />
          <p>{item.name}</p>
          {item.user.location ? (
            <p>{item.user.location}</p>
          ) : (
            <p>No location provided</p>
          )}
          <p>{item.condition}</p>
          <p>{item.description}</p>
          <Link to={`/user/public/${item.user._id}`}>
            <p>{item.user.username}</p>
          </Link>
          <button
            onClick={() => {
              onGoBack();
            }}
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default ItemDetail;
