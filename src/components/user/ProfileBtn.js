import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../styles/Profile.scss";

const ProfileBtn = () => {
  return (
    <div>
      <Link to="/inbox">
        <Button
          className="profile__inbox goback"
          animated
          inverted
          color="black"
          style={{ marginBottom: "10px" }}
        >
          <Button.Content hidden>
            <Icon name="mail outline large" />
          </Button.Content>
          <Button.Content visible>Inbox</Button.Content>
        </Button>
      </Link>
    </div>
  );
};

export default ProfileBtn;
