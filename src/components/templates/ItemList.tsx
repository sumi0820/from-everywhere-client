/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC, useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';

import { mockData } from 'data/items';
import { Card, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Data = {
  _id: string;
  image: string;
  accepted?: boolean | null;
  hi?: string[];
  name: string;
  description: string;
  condition: string;
  user: { username: string };
};

const card = css`
  display: flex !important;
  justify-content: center;
`;

const ItemList: VFC = () => {
  const [items, setItems] = useState<Data[] | null>([]);

  useEffect(() => {
    setItems(mockData);
  }, []);

  return (
    <Grid columns={3} stackable>
      {items &&
        items.map((item) => (
          <Grid.Column as={Link} to={`/item/${item._id}`} css={card}>
            <Card key={item._id}>
              <Image src={item.image} wrapped ui={false} alt="item-image" />
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
                <Link to={`/item/${item._id}`}>Read more</Link>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
    </Grid>
  );
};
export default ItemList;
