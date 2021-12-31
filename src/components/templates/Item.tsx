import { VFC } from 'react';

import { Container, Grid, Image } from 'semantic-ui-react';
import { Item } from 'hooks/use-get-items';
import { Link } from 'react-router-dom';
import GoBackBtn from 'components/atoms/GoBackBtn';

type Props = {
  item: Item | undefined;
};

const EnhancedItem: VFC<Props> = ({ item = {} }) => (
  <Container>
    {item && item.user ? (
      <>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Image src={item.image} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column floated="left" width={5}>
              <Link to={`/public/${item.user._id}`}>
                <Image avatar circular src={item.user.imageProfile} />
                <span>{item.user.username}</span>
              </Link>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <p>{item.condition}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <p>{item.description}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <GoBackBtn />
      </>
    ) : null}
  </Container>
);
export default EnhancedItem;
