import React, { useState } from "react";
import axios from "axios";
import { List, Button, Image, Icon } from "semantic-ui-react";

import { API_URL } from "../../config";
import MessageForm from "./MessageForm";
import "../styles/Inbox.scss";
import ChatModal from "./ChatModal";

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
  const [accepted, setAccepted] = useState(null);

  let chatCheck = !chat ? initialChat : chat;
  let acceptedStatus = accepted == null ? initialAccepted : accepted;
  console.log(selectedUser);

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
        console.log(response.data);
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
            {!acceptedStatus ? (
              <ChatModal
                handleAccept={handleAccept}
                selectedUser={selectedUser}
              />
            ) : acceptedStatus == selectedUser._id ? (
              <div className="inbox__chatBox__alert">
                <b className="inbox__chatBox__text__alert">
                  You accepted other's!
                </b>
              </div>
            ) : (
              <div className="inbox__chatBox__alert">
                <b className="inbox__chatBox__text__success">
                  You accepted to exchange!
                </b>
              </div>
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
    </div>
  );
};

export default Chat;
