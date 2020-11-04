# from everywhere

## Description

from everywhere is inspired by a Japanese folk tale called "The straw millionaire".  
Post your item that is not to be used anymore, and exchange it with others. Keep exchanging, you may get something you have never expected in the end.  

Your thing may help others, you may also be helped by others.  
You can start from everywhere. Let's enjoy serendipity in the world!

For your reference: [Straw Millionaire](https://en.wikipedia.org/wiki/Straw_Millionaire)


## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start saving favorite restaurants
-  **Login:** As a user I can login to the platform so that I can see my favorite restaurants
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Create profile** As a user I can add/edit personal information.
-  **Add item** As a user I add item that I don't use anymore.(*only 1 item)
-  **Find item** As a user I want to find/search items that I want to exchange for.
-  **See user profile** As a user I want to see other user's profile.
-  **Send a request** As a user I want to send a request to an another user for transaction.
-  **Accept/Decline** As a user I want to accept/decline the request.
-  **Send message** As a user I want to send messages to communicate other users.


## Backlog

Like:
- give likes to item/user

Favorite:
- add item/user to favorite list

Review:
- add review for user

# Client

## Routes

- / - Homepage

- /signup - Signup form
- /signin - Signin form

- /user/:id -  User profile
- /user/:id/edit -  Edit form
- /user/:id/item -  Edit form
- /user/:id/inbox -  Message box
- /user/:id/inbox/:id -  Conversation

- /item/list -  List of items
- /item/:id -  Detail of item

- 404

## Pages

- Home Page (public)
- Sign up Page (anon only)
- Sign in Page (anon only)
- User profile Page (public/private)
- User profile edit Page (private)
- User profile item upload Page (private)
- User profile inbox Page (private)
- Item list Page (public only)
- Item detail Page(public only)
- 404 Page (public)

## Components

- App.js
- Nav.js

- Landing.js

- ItemList.js
- ItemDetail.js
- RandomItems.js
- SearchItem.js

- UserProfile.js
- UserEdit.js
- UserItem.js
- UserInbox.js
- UserMessage.js


## IO


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Restaurant Service
  - restaurant.list()
  - restaurant.create(data)
  - restaurant.detail(id)
  - restaurant.addFavorite(id)
  - restaurant.removeFavorite(id)   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
image - String  
bio - String  
location - String
message - [ObjectId<Message>]
item - [ObjectId<Item>]
// like
// favorites - [ObjectID<Restaurant>]
```

Item model

```
title - String // required
description - String // required
condition - String // required
image - String
user - [ObjectID<User>]
```

Message model

```
from - [ObjectID<User>] // required
to - [ObjectID<User>] // required
message - String // required
accepted - Boolean
```

## API Endpoints/Backend Routes
```
- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
```
```
- GET /user/:id
    - user

- Patch /user/:id/user-edit
  - body: 
    - username
    - bio
    - image
    - location

- POST /user/:id/item-create
  - body: 
    - title
    - description
    - image
    - condition

- PATCH /user/:id/item-edit/:id
  - body: 
    - title
    - description
    - image
    - condition

- DELETE /user/:id/item-edit/:id/delete
  - body: 
    - title
    - description
    - image
    - condition
```
```
- GET /items
    - items

- GET /items/random
    - items

- GET /items/:id
    - item

- POST /user/:id/request
  - body: 
    - body
```
```
- GET /user/:id/inbox
  - messages 

- GET /user/:id/inbox/:id
  - message

- POST /user/:id/inbox/:id/accept
  - body:
      - accepted

- POST /user/:id/inbox/:id/decline
  - body:
      - accepted

- POST /user/:id/inbox/:id/send
  - body:
      - body
```
 

## Links

### Trello/Kanban

[Link to your trello board](https://miro.com/app/board/o9J_kgEJKtY=/) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/sumi0820/from-everywhere-client)
[Server repository Link](https://github.com/sumi0820/from-everywhere-server)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)