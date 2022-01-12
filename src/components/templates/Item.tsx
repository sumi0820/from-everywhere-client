/* eslint-disable @typescript-eslint/restrict-template-expressions */
/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';

import { Container, Grid, Image } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import GoBackBtn from 'components/atoms/GoBackBtn';
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Item, User } from 'domains';

type Props = {
  item: Item | undefined;
  loggedInUser: User | null;
};

const container = css`
  .imageContainer {
    display: flex !important;
    justify-content: center;
  }
  .itemImage {
    margin-top: 30px;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.6));
    object-fit: contain;
    max-height: 500px;
  }
  span {
    margin-left: 5px;
    color: ##c5e4e4;
    text-shadow: 0 0 1px #444;
  }
`;

const EnhancedItem: VFC<Props> = ({ item = {}, loggedInUser }) => (
  <Container text>
    {item && item.user ? (
      <div>
        <Grid css={container} stackable>
          <Grid.Row columns={1}>
            <Grid.Column className="imageContainer">
              <Image src={item.image} className="itemImage" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Link to={`/user/${item.user._id}`}>
                <Image avatar circular src={item.user.imageProfile} />
                <span>{item.user.username}</span>
              </Link>
            </Grid.Column>
            {loggedInUser && loggedInUser.id === item.user._id ? (
              <Grid.Column>
                <Link to={`/item/${item.id}`}>
                  <p>{item.user.username}</p>
                </Link>
              </Grid.Column>
            ) : null}
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <p className='description'>{item.description}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <GoBackBtn />
      </div>
    ) : null}
  </Container>
);

export default EnhancedItem;
