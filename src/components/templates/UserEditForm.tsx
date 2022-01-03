/** @jsxRuntime classic */
/** @jsx jsx */
import GoBackBtn from 'components/atoms/GoBackBtn';
import React, { VFC } from 'react';
import { css, jsx } from '@emotion/react';

import {
  Button,
  Container,
  Form,
  Grid,
  Input,
  Label,
  TextArea,
} from 'semantic-ui-react';

const container = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const UserEditForm: VFC = () => (
  <Container text css={container}>
    <h2>Edit Your Profile</h2>
    <Grid container>
      <Grid.Column>
        <Form className="form__editUser">
          <Form.Field>
            <Label>Bio</Label>
            <TextArea type="text" name="bio" />
          </Form.Field>

          {/* <Form.Field>
            <Label>Location</Label> */}
          {/* <CountryDropdown
              name="location"
              valueType="short"
              value={location}
              onChange={handleLocation}
              priorityOptions={['US', 'CA', 'DE', 'FR', 'CN', 'JP']}
              defaultOptionLabel={loggedInUser.location}
            /> */}
          {/* </Form.Field> */}

          <Form.Field>
            <Label>Profile Image</Label>
            <Input type="file" name="imageProfile" />
          </Form.Field>

          <Button type="submit" primary>
            Update
          </Button>
        </Form>
        <GoBackBtn />
      </Grid.Column>
    </Grid>
  </Container>
);
export default UserEditForm;
