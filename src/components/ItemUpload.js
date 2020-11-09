import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const ItemUpload = ({
  loggedInUser,
  onCreateItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [userItem, setUserItem] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/item/${loggedInUser.item}`, { withCredentials: true })
      .then((response) => {
        setUserItem(response.data);
      });
  }, []);
  console.log(loggedInUser, userItem);
  return (
    <div>
      <form onSubmit={!loggedInUser.item ? onCreateItem : onEditItem}>
        <input type="text" name="name" defaultValue={userItem.name} />
        <textarea
          type="text"
          name="description"
          defaultValue={userItem.description}
        />
        <input type="text" name="condition" defaultValue={userItem.condition} />
        <input type="text" name="image" defaultValue={userItem.image} />
        <button type="submit">
          {!loggedInUser.item ? <p>Upload</p> : <p>Edit</p>}
        </button>
      </form>
      {loggedInUser.item ? (
        <>
          <button
            onClick={() => {
              onDeleteItem(loggedInUser.item);
            }}
          >
            <p>Delete</p>
          </button>
        </>
      ) : null}

      <Link to={`/user/${loggedInUser}`}>X</Link>
    </div>
  );
};

export default ItemUpload;
