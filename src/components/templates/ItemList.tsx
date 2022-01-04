/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC } from 'react';
import { css, jsx } from '@emotion/react';

import { Card, Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Item } from '../../domains/models/item';

type Props = {
  items: Item[];
};

const card = css`
  display: flex !important;
  justify-content: center;
`;

const ItemList: VFC<Props> = ({ items = [] }) => (
  <Container>
    <Grid columns={2} container divided="vertically" stackable>
      <Grid.Row>
        <Grid.Column floated="left" width={5} textAlign="left">
          <h1>Latest Items</h1>
        </Grid.Column>
        <Grid.Column floated="right" width={5} textAlign="center">
          {/* <SearchForm onQuickSearch={onQuickSearch} onSearch={onSearch} /> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Grid columns={3} stackable>
      {items &&
        items.map((item) => (
          <Grid.Column css={card}>
            <Card key={item.id}>
              <Image
                src={item.image}
                wrapped
                ui={false}
                alt="item-image"
                as={Link}
                to={`/item/${item.id}`}
              />
              <Card.Content>
                <Card.Header>
                  {item.name.length >= 20
                    ? `${item.name.slice(0, 20)}...`
                    : item.name}
                </Card.Header>
                <Card.Meta>{item.user.username}</Card.Meta>
                <Card.Description>
                  {item.description.length >= 70
                    ? `${item.description.slice(0, 70)}...`
                    : item.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Link to={`/item/${item.id}`}>Read more</Link>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
    </Grid>
  </Container>
);
export default ItemList;
