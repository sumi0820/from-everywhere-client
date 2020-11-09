import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import MessageForm from "./MessageForm";

const Chat = (props) => {
  const { loggedInUser, match, onGoBack, onSend } = props;
  let userId = match.params.userId;
  const [chat, setChat] = useState(null);
  const [accepted, setAccepted] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/chat/${userId}`, { withCredentials: true })
      .then((response) => {
        setChat(response.data);
        axios
        .get(`${API_URL}/item/${loggedInUser.item}`, { withCredentials: true })
        .then((response) => {
          setAccepted(response.data.accepted);
        })
        .catch((err) => {
          console.log(err);
        });
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

  const handleAccept = (userId) => {
    axios
      .post(`${API_URL}/item/${userId}/accept`, {}, { withCredentials: true })
      .then((response) => {
        setAccepted(true);
        console.log(response.data);
      });
  };

  const handleRevoke = (userId) => {
    axios
      .post(`${API_URL}/item/${userId}/revoke`, {}, { withCredentials: true })
      .then((response) => {
        setAccepted(false);
        console.log(response.data);
      });
  };
console.log(item);
  return (
    <div>
      {!chat ? (
        <p>No conversation</p>
      ) : (
        <>
          <div>
            {!accepted? (
              <div>
                <button
                  onClick={() => {
                    handleAccept(userId);
                  }}
                >
                  Accept
                </button>
              </div>
            ) : (
              <>
                <p>You accepted to exchange!</p>
                <button
                  onClick={() => {
                    handleRevoke(userId);
                  }}
                >
                  Revoke?
                </button>
              </>
            )}
          </div>
          {chat.map((message, i) => {
            return (
              <>
                {message.from._id == loggedInUser._id ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                    key={message._id + i}
                  >
                    <img src={message.from.image} alt="" />
                    <p>{message.from.username}</p>
                    <p>{message.body}</p>
                  </div>
                ) : (
                  <div key={message._id + i}>
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
