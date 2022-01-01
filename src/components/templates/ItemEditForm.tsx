/** @jsxRuntime classic */

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

const ItemEditform: VFC = () => (
  <Container text>
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

          <Form.Field required>
            <Label>Condition</Label>
            <Input placeholder="..." />
          </Form.Field>

          <Form.Field>
            <Label>Item Image</Label>
            <Input type="file" name="imageProfile" />
          </Form.Field>

          <Button type="submit" secondary>
            Update
          </Button>
          <Button type="submit" secondary>
            Delete
          </Button>
        </Form>
        <GoBackBtn />
      </Grid.Column>
    </Grid>
  </Container>
);
export default ItemEditform;
