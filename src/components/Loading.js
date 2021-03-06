import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading = () => {
  return (
    <div className="loading__body">
      <Dimmer active inverted>
        <Loader size="huge"></Loader>
      </Dimmer>
    </div>
  );
};

export default Loading;
