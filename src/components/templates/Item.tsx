/** @jsxRuntime classic */
/** @jsx jsx */

import { VFC } from 'react';

import { Container, Grid, Image } from 'semantic-ui-react';
import { Item } from 'hooks/use-get-items';
import { Link } from 'react-router-dom';
import GoBackBtn from 'components/atoms/GoBackBtn';
import { css, jsx } from '@emotion/react';

type Props = {
  item: Item | undefined;
};

const container = css`
  .itemImage {
    margin-top: 30px;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.6));
    object-fit: contain;
    max-height: 500px;
  }
`;

const EnhancedItem: VFC<Props> = ({ item = {} }) => (
  <Container text>
    {item && item.user ? (
      <div>
        <Grid css={container} stackable>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Image src={item.image} className="itemImage" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Link to={`/public/${item.user._id}`}>
                <Image avatar circular src={item.user.imageProfile} />
                <span>{item.user.username}</span>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <p>{item.description}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <GoBackBtn />
      </div>
    ) : null}
  </Container>
);
export default EnhancedItem;
