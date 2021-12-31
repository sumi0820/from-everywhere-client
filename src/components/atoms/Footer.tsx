/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';

import { css, jsx } from '@emotion/react';

const footer = css`
  padding: 24px 0;
  margin: 90px 0;
  text-align: center;
`;
const Footer: VFC = () => (
  <footer css={footer}>
    <p>2022 Sumiya Ushiro</p>
  </footer>
);

export default Footer;
