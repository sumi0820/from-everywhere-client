import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Container, Image, Grid } from "semantic-ui-react";

import { API_URL } from "../config";
import MessageForm from "./MessageForm";
import "./styles/Inbox.scss";

const Chat = (props) => {
  const {
    loggedInUser,
    onGoBack,
    onSend,
    initialChat,
    initialAccepted,
    selectedUser,
  } = props;
  // let userId = match.params.userId;
  const [chat, setChat] = useState(initialChat);
  const [accepted, setAccepted] = useState(initialAccepted);
  const [item, setItem] = useState(null);

  let chatCheck = !chat ? initialChat : chat;
  console.log(selectedUser);
  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/chat/${userId}`, { withCredentials: true })
  //     .then((response) => {
  //       setChat(response.data);
  //       axios
  //       .get(`${API_URL}/item/${loggedInUser.item}`, { withCredentials: true })
  //       .then((response) => {
  //         setAccepted(response.data.accepted);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // }, []);

  const handleSend = (e) => {
    e.preventDefault();

    const { body } = e.target;
    axios
      .post(
        `${API_URL}/send/${selectedUser._id}`,
        {
          body: body.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setChat(response.data);
        console.log(response.data)
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

  return (
    <div>
        {!chatCheck ? (
          <div className="chat__noChat">
            <p className="chat__noChat__text">Please select conversation</p>
          </div>
        ) : (
          <>
            <div className="inbox__chatBox__header">
              <List divided relaxed style={{ marginTop: "20px" }}>
                <List.Item>
                  <Image avatar src={selectedUser.imageProfile} />
                  <List.Content>
                    <List.Header as="h3">{selectedUser.username}</List.Header>
                  </List.Content>
                </List.Item>
              </List>
              {!accepted ? (
                <div>
                  <button
                    onClick={() => {
                      handleAccept(selectedUser._id);
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
                      handleRevoke(selectedUser._id);
                    }}
                  >
                    Revoke?
                  </button>
                </>
              )}
            </div>
            <div className="inbox__chatBox__container">
              {chatCheck.map((message, i) => {
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
                        className="inbox__me"
                      >
                        <div className="inbox__entete">
                          <h2>{message.from.username}</h2>
                        </div>
                        <div className="inbox__triangle"></div>
                        <p className="inbox__text">{message.body}</p>
                      </div>
                    ) : (
                      <div key={message._id + i} className="inbox__you">
                        <div className="inbox__entete">
                          <h2>{message.from.username}</h2>
                        </div>
                        <div className="inbox__triangle"></div>
                        <p className="inbox__text">{message.body}</p>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </>
        )}
        <MessageForm onSend={handleSend} />
      <div className="chat__mobile__container">
      {!chatCheck ? (
          <div className="chat__noChat">
            <p className="chat__noChat__text">Please select conversation</p>
          </div>
        ) : (
          <>
            <div className="inbox__chatBox__header">
              <List divided relaxed style={{ marginTop: "20px" }}>
                <List.Item>
                  <Image avatar src={selectedUser.imageProfile} />
                  <List.Content>
                    <List.Header as="h3">{selectedUser.username}</List.Header>
                  </List.Content>
                </List.Item>
              </List>
              {!accepted ? (
                <div>
                  <button
                    onClick={() => {
                      handleAccept(selectedUser._id);
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
                      handleRevoke(selectedUser._id);
                    }}
                  >
                    Revoke?
                  </button>
                </>
              )}
            </div>
            <div className="inbox__chatBox__container">
              {chatCheck.map((message, i) => {
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
                        className="inbox__me"
                      >
                        <div className="inbox__entete">
                          <h2>{message.from.username}</h2>
                        </div>
                        <div className="inbox__triangle"></div>
                        <p className="inbox__text">{message.body}</p>
                      </div>
                    ) : (
                      <div key={message._id + i} className="inbox__you">
                        <div className="inbox__entete">
                          <h2>{message.from.username}</h2>
                        </div>
                        <div className="inbox__triangle"></div>
                        <p className="inbox__text">{message.body}</p>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </>
        )}
        <MessageForm selectedUserId={selectedUser._id} onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
