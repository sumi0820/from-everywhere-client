import React, { useState, useEffect } from "react";
import { List, Image, Rating, Grid } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/Profile.scss";
import { API_URL } from "../../config";

const Feedback = ({ loggedInUser }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/feedback/${loggedInUser._id}`, { withCredentials: true })
      .then((response) => {
        setFeedbacks(response.data);
      });
  }, []);

  return (
    <div>
      {!feedbacks.length ? (
        <>
          <p style={{ textAlign: "center" }}>No feedback</p>
        </>
      ) : (
        <List size="large">
          {feedbacks.map((feedback) => {
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
                      icon="star"
                      disabled
                      size="large"
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
