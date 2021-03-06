import React from "react";
import { List, Image, Rating} from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../styles/Profile.scss";

const Feedback = ({  filteredFeedback }) => {
  return (
    <div>
      {!filteredFeedback.length ? (
        <>
          <p style={{ textAlign: "center" }}>No feedback</p>
        </>
      ) : (
        <List size="small">
          {filteredFeedback.map((feedback) => {
            return (
              <List.Item>
                <Image avatar src={feedback.from.imageProfile} />
                <List.Content>
                  <List.Header as={Link} to={`/public/${feedback.from._id}`}>
                    {feedback.from.username}
                  </List.Header>
                  <List.Description>
                    <Rating
                      maxRating={5}
                      defaultRating={feedback.rate}
                      disabled
                      size="large"
                      clearable
                    />
                  </List.Description>
                  <List.Description
                    as={Link}
                    to={`/public/${feedback.from._id}`}
                  >
                    <p>{feedback.feedback}</p>
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default Feedback;
