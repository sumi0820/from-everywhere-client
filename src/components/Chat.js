import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import MessageForm from "./MessageForm";

const Chat = (props) => {
  const { loggedInUser, match, onGoBack, onSend } = props;
  let userId = match.params.userId;
  const [chat, setChat] = useState(null);
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    axios
      .get(`${API_URL}/chat/${userId}`, { withCredentials: true })
      .then((response) => {
        setChat(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSend = (userId, e) => {
    e.preventDefault();

    const { body } = e.target;
    axios
      .post(
        `${API_URL}/send/${userId}`,
        {
          body: body.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setChat(response.data);
      });
  };

  // const handleAccept = () => {
  //   axios
  //     .post(`${API_URL}/item/accept`,{}, { withCredentials: true })
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

  return (
    <div>
      {!chat ? (
        <p>No conversation</p>
      ) : (
        <>
          <div>
          {/* {!accepted ? (
            <div>
              <button onClick={handleAccept}>Accept</button>
              <button>Decline</button>
            </div>
          ) : (
            <p>You accepted to exchange!</p>
          )} */}

          </div>
          {chat.map((message) => {
            return (
              <>
                {message.from._id == loggedInUser._id ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                    key={message._id}
                  >
                    <img src={message.from.image} alt="" />
                    <p>{message.from.username}</p>
                    <p>{message.body}</p>
                  </div>
                ) : (
                  <div key={message._id}>
                    <img src={message.from.image} alt="" />
                    <p>{message.from.username}</p>
                    <p>{message.body}</p>
                  </div>
                )}
              </>
            );
          })}
        </>
      )}
      <MessageForm userId={userId} onSend={handleSend} />
    </div>
  );
};

export default Chat;
