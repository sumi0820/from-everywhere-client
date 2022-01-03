/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';

import { css, jsx } from '@emotion/react';

const footer = css`
  padding: 24px 0;
  margin-bottom: 30px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
`;

const Footer: VFC = () => (
  <footer css={footer}>
    <p>2022 Sumiya Ushiro</p>
  </footer>
);

export default Footer;
