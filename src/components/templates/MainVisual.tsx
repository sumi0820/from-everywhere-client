/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';
import { css, jsx } from '@emotion/react';

const container = css`
  background-image: url('https://res.cloudinary.com/djct87vbj/image/upload/v1605097867/Snapseed_mewpfq.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  width: calc(100% + 20px);
  height: calc(100% + 200px);
  padding: 140px 0;
  margin-bottom: 100px;
`;
const Tagline = css`
  h1,
  p {
    margin-bottom: 0px;
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
