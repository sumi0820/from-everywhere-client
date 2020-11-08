import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Inbox = ({messages}) => {
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/inbox`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log("This is messages request", response.data);
  //       setMessages(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  console.log(messages);
  return (
    <div>
      <h1>Inbox</h1>
      {messages.map((chat) => {
        return <div key={chat.from._id}>
          <img src={chat.from.image} alt=""/>
          <p>{chat.from.username}</p>
        </div>;
      })}
    </div>
  );
};

export default Inbox;
