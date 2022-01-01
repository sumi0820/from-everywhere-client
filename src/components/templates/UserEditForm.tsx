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

const UserEditForm: VFC = () => (
  <Container text>
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

          <Grid container columns={2} stackable>
            <Grid.Column>
              <Form.Field>
                <Label>Profile Image</Label>
                <Input type="file" name="imageProfile" />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <Label>Background Image</Label>
                <Input type="file" name="imageBg" />
              </Form.Field>
            </Grid.Column>
          </Grid>

          <div className="itemDetail__btn profile__btn__container">
            <Button type="submit" secondary>
              Update
            </Button>
          </div>
        </Form>
        <GoBackBtn />
      </Grid.Column>
    </Grid>
  </Container>
);
export default UserEditForm;
