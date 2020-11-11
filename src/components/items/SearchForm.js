import React from "react";
import {  Input, Grid } from "semantic-ui-react";

const Search = ({ onQuickSearch }) => {
  return (
    <Grid container columns={1}  relaxed stackable>
      <Grid.Column>
        <form>
          <Input
            name="keyWord"
            type="text"
            placeholder="Search"
            onChange={onQuickSearch}
            icon={{ name: 'search', circular: true, link: true, type: 'submit',}}
          />
        </form>
      </Grid.Column>
    </Grid>
  );
};

export default Search;
