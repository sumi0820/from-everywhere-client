/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';
import { css, jsx } from '@emotion/react';

const container = css`
  background: linear-gradient(to bottom, #fce4dc 0%, #c5e4e4 100%);
  background: -webkit-linear-gradient(to bottom, #fce4dc 0%, #c5e4e4 100%);
  background: -moz-linear-gradient(to bottom, #fce4dc 0%, #c5e4e4 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  height: calc(100% + 200px);
  padding: 140px 0;
  margin-top: 30px;
  margin-bottom: 90px;
`;
const Tagline = css`
  h1,
  p {
    margin-bottom: 0px;
    color: #25201a;
    text-shadow: 0 0 2px #444444;
  }
`;

const MainVisual: VFC = () => (
  <section css={container}>
    <div css={Tagline}>
      <h1>from everywhere</h1>
      <p>You will never be special,</p>
      <p>but you can be special in the eyes of someone else.</p>
    </div>
  </section>
);

export default MainVisual;
