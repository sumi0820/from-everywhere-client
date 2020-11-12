import React from "react";
import { List, Image, Grid } from "semantic-ui-react";
import "../styles/Inbox.scss";

const InboxMobile = ({ onGoBack, messages, onSelectedUserMobile }) => {
  return (
    <div className="inbox__mobile__container">
      <Grid centered columns={2}>
        <div className="inbox__mobile__header">
          <button onClick={onGoBack} className="inbox__btn">
            <h1>Inbox</h1>
          </button>
        </div>
        {!messages.length ? (
          <h3 className="chat__noChat__text chat__noChat">
            There's no message...
          </h3>
        ) : (
          <Grid.Column width={16}>
            <List divided relaxed size="huge">
              {messages.map((chat, i) => {
                return (
                  <>
                    <List.Item
                      className="inbox__mobile__fromList inbox__link"
                      key={i}
                      as="button"
                      onClick={() => {
                        onSelectedUserMobile(chat.from._id);
                      }}
                      
                    >
                      <Image avatar src={chat.from.imageProfile} />
                      <List.Content className="inbox__mobile__fromList__content">
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
                  </>
                );
              })}
            </List>
          </Grid.Column>
        )}
      </Grid>
    </div>
  );
};

export default InboxMobile;
