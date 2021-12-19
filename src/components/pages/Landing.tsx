import React, { VFC } from 'react';
import { Container, Grid, Divider, Segment } from 'semantic-ui-react';

import SigninForm from '../atoms/SigninForm';
import SignupForm from '../atoms/SignupForm';

const Landing: VFC = () => (
  <>
    <Container>
      <Segment placeholder>
        <Grid columns={2} container doubling stackable>
          <Grid.Column>
            <h2>
              Your thing may help others, <br />
              you may also be helped by others.
            </h2>
            <p>
              <b>from everywhere</b> is a simple online marketplace.
              <br />
              What you need it the item that you don`&apos;`t use anymore.
              <br />
              <br />
              Post your item, and exchange it with others. <br />
              Keep exchanging, you may get something you have never expected in
              the end.
            </p>
          </Grid.Column>

          <Grid.Column>
            <SigninForm />
            <SignupForm />
          </Grid.Column>
        </Grid>

        <Divider vertical hidden />
      </Segment>
    </Container>
  </>
);

export default Landing;
