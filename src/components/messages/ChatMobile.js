import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Button, Image, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import { API_URL } from "../../config";
import MessageForm from "./MessageForm";
import ChatModal from "./ChatModal";

import "../styles/Inbox.scss";

const Chat = (props) => {
  const {
    loggedInUser,
    onGoBack,
    initialChat,
    initialAccepted,
    selectedUser,
  } = props;
  // let userId = match.params.userId;
  const [chat, setChat] = useState(initialChat);
  const [accepted, setAccepted] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [text, setText] = useState("");

  let chatCheck = !chat ? initialChat : chat;
  let acceptedStatus = accepted == null ? initialAccepted : accepted;

  console.log(selectedUser);

  const handleSend = (e) => {
    e.preventDefault();
    console.log(selectedUser);

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
        setReceiver(selectedUser);
        setChat(response.data);
        setText("");
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

  const handleChange = (e) => setText(e.target.value);

  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }

  return (
    <div>
      <div className="chat__mobile__container">
        {!chatCheck ? (
          <div className="chat__noChat">
            <p className="chat__noChat__text">Please select conversation</p>
          </div>
        ) : (
          <>
            <div className="chat__mobile__header">
              <List divided relaxed style={{ marginTop: "20px" }}>
                <List.Item>
                  <Image
                    avatar
                    src={
                      !selectedUser
                        ? receiver.imageProfile
                        : selectedUser.imageProfile
                    }
                    size="tiny"
                  />
                </List.Item>
              </List>
              {!acceptedStatus ? (
                <ChatModal
                  handleAccept={handleAccept}
                  selectedUser={selectedUser}
                />
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
        <MessageForm
          selectedUserId={!selectedUser ? receiver._id : selectedUser._id}
          onSend={handleSend}
          text={text}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Chat;
