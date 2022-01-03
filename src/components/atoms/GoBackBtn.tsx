/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';

import { Container, Grid } from 'semantic-ui-react';
import { css, jsx } from '@emotion/react';

const btn = css`
  button {
    position: relative;
    display: inline-block;
    padding: 1rem 4rem;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    letter-spacing: 0.1em;
    border-radius: 0.5rem;
    padding: 0.5rem 2rem;
    border-radius: 100% 80px / 80px 100%;
    border: 0px;
    color: #25201a;
    text-shadow: 0 0 1px #444;
    margin-top: 30px;
  }

  button {
    background: #fdb9b6;
    background: -webkit-linear-gradient(-45deg, #fdb9b6 40%, #fcfc5d 100%);
    background: -webkit-linear-gradient(315deg, #fdb9b6 40%, #fcfc5d 100%);
    background: linear-gradient(135deg, #fdb9b6 40%, #fcfc5d 100%);
    -webkit-box-shadow: 0px 5px 0 #c5e4e4;
    box-shadow: 10px 5px 0 #c5e4e4;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fdb9b6', endColorstr='#fcfc5d', GradientType=1);
  }
`;

const GoBackBtn: VFC = () => (
  <Container>
    <Grid columns={1} ui centered grid stackable>
      <Grid.Row>
        <div css={btn}>
          <button
            type="button"
            onClick={() => {
              // onGoBack();
              console.log('onGoBack');
            }}
          >
            Go Back
          </button>
        </div>
      </Grid.Row>
    </Grid>
  </Container>
);

export default GoBackBtn;
