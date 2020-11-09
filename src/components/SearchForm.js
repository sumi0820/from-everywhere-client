import React from "react";

const Search = ({ onQuickSearch, onSearch }) => {
  return (
    <div>
      <input
        name="keyWord"
        type="text"
        onChange={onQuickSearch}
        placeholder="Quick Filter"
      />
      <form onSubmit={onSearch}>
        <input name="keyWord" type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
