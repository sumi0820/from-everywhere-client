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
  // const [userItem, setUserItem] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/item/${loggedInUser.item}`, { withCredentials: true })
  //     .then((response) => {
  //       setUserItem(response.data);
  //     });
  // }, []);

  console.log(loggedInUser);
  return (
    <div>
      <form onSubmit={!loggedInUser.item ? onCreateItem : onEditItem}>
        <input
          type="text"
          name="name"
          defaultValue={loggedInUser.item ? loggedInUser.item.name : null}
        />
        <textarea
          type="text"
          name="description"
          defaultValue={loggedInUser.item ? loggedInUser.item.description : null}
        />
        <input
          type="text"
          name="condition"
          defaultValue={loggedInUser.item ? loggedInUser.item.condition : null}
        />
        <input
          type="text"
          name="image"
          defaultValue={loggedInUser.item ? loggedInUser.item.image : null}
        />
        <button type="submit">
          {!loggedInUser.item ? <p>Upload</p> : <p>Edit</p>}
        </button>
      </form>
      {loggedInUser.item ? (
        <>
          <button
            onClick={() => {
              onDeleteItem(loggedInUser.item._id);
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
