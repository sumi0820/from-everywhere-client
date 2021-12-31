/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';

import { css, jsx } from '@emotion/react';

const header = css`
  border-bottom: 1px solid #000;
  padding: 8px 0;
  text-align: center;
`;
const Header: VFC = () => (
  <header css={header}>
    <h1>from everywhere</h1>
  </header>
);

export default Header;
