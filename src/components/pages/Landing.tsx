/** @jsxRuntime classic */
/** @jsx jsx */

import React, { VFC } from 'react';
import { Container, Grid, Divider, Segment } from 'semantic-ui-react';
import { css, jsx } from '@emotion/react';

import SigninForm from '../atoms/SigninForm';

const container = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ui.placeholder.segment {
    background: -moz-linear-gradient(65deg, #f8dcb8, #a6eaf5);
    background: -webkit-linear-gradient(65deg, #f8dcb8, #a6eaf5);
    background: linear-gradient(25deg, #f8dcb8, #a6eaf5);
    border: none !important;
  }
`;

const Landing: VFC = () => (
  <Container css={container}>
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
        </Grid.Column>
      </Grid>

      <Divider vertical hidden />
    </Segment>
  </Container>
);

export default Landing;
