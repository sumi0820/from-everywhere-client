import React from "react";
import { Grid, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import "../styles/Profile.scss";

const ProfileBtn = () => {
  return (
    // <Grid columns={1} ui centered grid stackable>
    //   <Grid.Row style={{marginBottom:'10px'}}>
        // <div className="itemDetail__btn profile__btn__container">
        <div>
          <Link to="/inbox">
            <Button
              className="profile__inbox goback"
              animated
              inverted 
              color='black'
              style={{ marginBottom: "10px" }}
            >
              <Button.Content hidden>
                <Icon name="mail outline large" />
              </Button.Content>
              <Button.Content visible>Inbox</Button.Content>
            </Button>
          </Link>

          {/* <Button
            className="profile__inbox goback"
            animated
            secondary
            onClick={() => {
              onGoBack();
            }}
          >
            <Button.Content hidden>
              <FontAwesomeIcon icon={faBackspace} color="white" />
            </Button.Content>
            <Button.Content visible>Go Back</Button.Content>
          </Button> */}
         </div>
    //   </Grid.Row>
    // </Grid>
  );
};

export default ProfileBtn;
