/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';
import { Loader, SemanticSIZES } from 'semantic-ui-react';

import { css, jsx } from '@emotion/react';

const spinner = css`
  margin: 3rem 0 5rem;
`;
const Spinner: VFC<{ size?: SemanticSIZES }> = ({ size = 'medium' }) => (
  <div css={spinner}>
    <Loader size={size} inline="centered" active>
      Loading...
    </Loader>
  </div>
);

export default Spinner;
