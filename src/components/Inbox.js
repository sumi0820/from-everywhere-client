import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  List,
  Container,
  Image,
  Grid,
  Divider,
  Button,
} from "semantic-ui-react";
import "./styles/Inbox.scss";

import Chat from "../components/Chat";
import { API_URL } from "../config";

const Inbox = ({ loggedInUser, onSelectedUserMobile }) => {
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
        setSelectedUser(response.data[0].from._id == loggedInUser._id ? response.data[1].from : response.data[0].from);
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

  // console.log(selectedUser, chat);
  return (
    <div>
      <div className="inbox__container">
        <div className="inbox__userList">
          <Grid container columns={1} stackable>
            <Grid.Column width={16}>
              <List divided relaxed className="inbox__fromList">
                {messages.map((chat, i) => {
                  return (
                    <List.Item key={i}>
                      <Image avatar src={chat.from.imageProfile} />
                      <List.Content>
                        {/* <List.Header as={Link} to={`/inbox/${chat.from._id}`}> */}
                        <List.Header
                          as="button"
                          onClick={() => {
                            handleSelectUser(chat.from._id);
                          }}
                        >
                          {chat.from.username}
                        </List.Header>
                        <List.Description as="a">{chat.body}</List.Description>
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
      <div className="inbox__mobile__container">
        <Grid centered columns={2}>
          <div className="inbox__mobile__header">
            <h1>Inbox</h1>
          </div>

          <List divided relaxed size="huge">
            {messages.map((chat, i) => {
              return (
                <>
                  <List.Item>
                    <Image avatar src={chat.from.imageProfile} />
                    <List.Content>
                      <List.Header
                        as="button"
                        onClick={() => {
                          onSelectedUserMobile(chat.from._id);
                        }}
                        style={{ textAlign: "left" }}
                        className="inbox__mobile__btn"
                      >
                        {chat.from.username}
                      </List.Header>
                      <List.Description
                        as="button"
                        onClick={() => {
                          onSelectedUserMobile(chat.from._id);
                        }}
                        className="inbox__mobile__btn"
                      >
                        {chat.bodylength >= 20
                          ? chat.body.slice(0, 20) + "..."
                          : chat.body}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <Container>
                    <Divider />
                  </Container>
                </>
              );
            })}
          </List>
        </Grid>
      </div>
    </div>
  );
};

export default Inbox;
