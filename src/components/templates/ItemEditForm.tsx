/** @jsxRuntime classic */
/** @jsx jsx */
import GoBackBtn from 'components/atoms/GoBackBtn';
import React, { VFC } from 'react';

import {
  Button,
  Container,
  Form,
  Grid,
  Input,
  Label,
  TextArea,
} from 'semantic-ui-react';
import { css, jsx } from '@emotion/react';

const container = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ItemEditform: VFC = () => (
  <Container text css={container}>
    <h2>Edit Your Item</h2>
    <Grid container>
      <Grid.Column>
        <Form className="form__editUser">
          <Form.Field required>
            <Label>Item Name</Label>
            <Input placeholder="..." />
          </Form.Field>

          <Form.Field>
            <Label>Description</Label>
            <TextArea type="text" name="bio" />
          </Form.Field>

          <Form.Field>
            <Label>Item Image</Label>
            <Input type="file" name="imageProfile" />
          </Form.Field>

          <Button type="submit" primary>
            Update
          </Button>
          <Button type="submit" negative>
            Delete
          </Button>
        </Form>
        <GoBackBtn />
      </Grid.Column>
    </Grid>
  </Container>
);
export default ItemEditform;
