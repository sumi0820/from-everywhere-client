/** @jsxRuntime classic */
/** @jsx jsx */

import React, { VFC } from 'react';
import { css, jsx } from '@emotion/react';

import { Container, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { User } from 'hooks/use-get-user';
import GoBackBtn from 'components/atoms/GoBackBtn';

type Props = {
  user: User | undefined;
};

const EnhancedUser: VFC<Props> = ({ user = {} }) => (
  <Container>
    {user && user.username ? (
      <div>
        <Container>
          <Grid columns={1} stackable>
            <Grid.Column width={16}>
              <div
                css={css`
                  background-image: url(${user.imageBg});
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  height: 500px;
                  width: 100%;
                  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.6));
                  margin-bottom: 50px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <Image src={user.imageProfile} size="medium" circular />
                <Header as="h1">{user.username}</Header>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <Container text>
          <Grid>
            <Grid.Column floated="left" width={5}>
              <p>
                <Icon name="map marker alternate" />
                {user.location}
              </p>
            </Grid.Column>
          </Grid>
          <p>{user.bio}</p>
        </Container>
        <GoBackBtn />
      </div>
    ) : null}
  </Container>
);
export default EnhancedUser;
