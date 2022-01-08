/** @jsxRuntime classic */
/** @jsx jsx */

import React, { VFC } from 'react';
import { css, jsx } from '@emotion/react';

import { Container, Grid, Icon, Image } from 'semantic-ui-react';
import GoBackBtn from 'components/atoms/GoBackBtn';
import { User } from '../../domains';

type Props = {
  user: User | undefined;
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

const EnhancedUser: VFC<Props> = ({ user = {} }) => (
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
          <Grid.Column floated="left" width={5}>
            <p>
              <Icon name="map marker alternate" />
              {user.location}
            </p>
          </Grid.Column>
        </Grid>
        <p>{user.bio}</p>
        <GoBackBtn />
      </div>
    ) : null}
  </Container>
);
export default EnhancedUser;
