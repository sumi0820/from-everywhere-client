import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { List, Image, Grid } from "semantic-ui-react";
import "../styles/Inbox.scss";
import { API_URL } from "../../config";

import Chat from "./Chat";
import InboxMobile from "./InboxMobile";

const Inbox = ({ loggedInUser, onSelectedUserMobile, onGoBack }) => {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [accepted, setAccepted] = useState(null);
  // const [item, setItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/inbox`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("This is messages request", response.data);
        console.log(response.data[0].from);
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectUser = (userId) => {
    axios
      .get(`${API_URL}/chat/${userId}`, { withCredentials: true })
      .then((response) => {
        console.log("This is handleSelectUser", response.data[0].from);
        setChat(response.data);
        setSelectedUser(
          response.data[0].from._id == loggedInUser._id
            ? response.data[1].from
            : response.data[0].from
        );
        axios
          .get(`${API_URL}/item/${loggedInUser.item._id}`, {
            withCredentials: true,
          })
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
  };
  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  // console.log(selectedUser, chat);
  return (
    <div>
      <div className="inbox__container">
        <div className="inbox__userList">
          <Grid columns={1}>
            <Grid.Column width={16}>
              <List divided relaxed size="big">
                <div className="inbox__header">
                  <button onClick={onGoBack} className="inbox__btn">
                    <h2>Inbox</h2>
                  </button>
                </div>
                {messages.map((chat, i) => {
                  return (
                    <List.Item
                      key={i}
                      className="inbox__fromList__user inbox__btn"
                      as="button"
                      onClick={() => {
                        handleSelectUser(chat.from._id);
                      }}
                    >
                      <Image avatar src={chat.from.imageProfile} />
                      <List.Content>
                        <List.Header
                          as="button"
                          onClick={() => {
                            handleSelectUser(chat.from._id);
                          }}
                          className="inbox__btn"
                        >
                          <p>{chat.from.username}</p>
                        </List.Header>
                        <List.Description as="a">
                          <p className="inbox__userList__text">{chat.body}</p>
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Grid.Column>
          </Grid>
        </div>
        <div className="inbox__chatBox">
          <Chat
            initialChat={chat}
            initialAccepted={accepted}
            loggedInUser={loggedInUser}
            selectedUser={selectedUser}
          />
        </div>
      </div>
      <InboxMobile
        onGoBack={onGoBack}
        messages={messages}
        onSelectedUserMobile={onSelectedUserMobile}
      />
    </div>
  );
};

export default Inbox;
