import React from "react";
import { Link } from "react-router-dom";

const ItemUpload = ({ loggedInUser, onCreateItem, onEditItem }) => {
  console.log(loggedInUser);

  return (
    <div>
      <form onSubmit={!loggedInUser.item ? onCreateItem : onEditItem}>
        <input type="text" name="name" />
        <textarea type="text" name="description" />
        <input type="text" name="condition" />
        <input type="text" name="image" />
        <button type="submit">
          {!loggedInUser.item ? <p>Upload</p> : <p>Edit</p>}
        </button>
      </form>
      <Link to={`/user/${loggedInUser}`}>X</Link>
    </div>
  );
};

export default ItemUpload;
