import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = () => {
  return (
    <div className="loading__body">
      <Dimmer active>
        <Loader size="huge">Loading</Loader>
      </Dimmer>
    </div>
  );
};

export default Loading;
