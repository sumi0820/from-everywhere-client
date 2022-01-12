/** @jsxRuntime classic */
/** @jsx jsx */

import React, { VFC } from 'react';
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
} from 'semantic-ui-react';
import GoBackBtn from 'components/atoms/GoBackBtn';
import { User } from '../../domains';

type Props = {
  user: User | undefined;
  loggedInUser: User | null;
};

const container = css`
  margin-top: 30px;

  .sixteen.wide.column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .sixteen.wide.column > image {
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.6));
    object-fit: contain;
  }
`;

const EnhancedUser: VFC<Props> = ({ user = {}, loggedInUser }) => (
  <Container text>
    {user && user.username ? (
      <div css={container}>
        <Grid columns={1} stackable>
          <Grid.Column width={16}>
            <Image src={user.imageProfile} size="medium" circular />
            <h1>{user.username}</h1>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column floated="right" width={5}>
              <p>
                <Icon name="map marker alternate" />
                {user.location}
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              {user.id === loggedInUser?._id ? (
                <Link to="/user/edit">
                  <Icon name="edit outline" />
                </Link>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <p>{user.bio}</p>

        <Divider horizontal>
          <Header as="h4">Your item</Header>
        </Divider>

        {loggedInUser && loggedInUser.item ? (
          <Grid>
            <Grid columns={1} stackable>
              <Grid.Column width={16}>
                <Image src={loggedInUser.item.image} size="medium" />
                <h3>{loggedInUser.item.name}</h3>
              </Grid.Column>
            </Grid>
            <Grid.Row columns={2}>
              <Grid.Column floated="right" width={5}>
                <p>
                  <Icon name="map marker alternate" />
                  {user.location}
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                {user.id === loggedInUser?._id ? (
                  <p>
                    <Icon name="edit outline" />
                  </p>
                ) : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <Grid columns={1} ui grid stackable>
            <Grid.Row>
              <div style={{ marginBottom: '15px' }}>
                <p>Please upload your item</p>
                <Link to="/upload-item">
                  <Button
                    className="profile__inbox goback"
                    animated
                    color="linkedin"
                  >
                    <Button.Content hidden>
                      <Icon name="cloud upload" />
                    </Button.Content>
                    <Button.Content visible>Upload</Button.Content>
                  </Button>
                </Link>
              </div>
            </Grid.Row>
          </Grid>
        )}
        <GoBackBtn />
      </div>
    ) : null}
  </Container>
);
export default EnhancedUser;
