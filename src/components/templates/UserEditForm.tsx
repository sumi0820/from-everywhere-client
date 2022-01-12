/** @jsxRuntime classic */
/** @jsx jsx */
import GoBackBtn from 'components/atoms/GoBackBtn';
import React, { useState, VFC } from 'react';
import { css, jsx } from '@emotion/react';
import { CountryDropdown } from 'react-country-region-selector';
import {
  Button,
  Container,
  Form,
  Grid,
  Input,
  Label,
  TextArea,
} from 'semantic-ui-react';
import { User } from 'domains';

type Props = {
  loggedInUser: User | null;
};

const container = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const UserEditForm: VFC<Props> = ({ loggedInUser }) => {
  const [location, setLocation] = useState('');

  return (
    <Container text css={container}>
      <h2>Edit Your Profile</h2>
      <Grid container>
        <Grid.Column>
          <Form className="form__editUser">
            <Form.Field>
              <Label>Bio</Label>
              <TextArea
                type="text"
                name="bio"
                defaultValue={loggedInUser?.bio}
              />
            </Form.Field>

            <Form.Field>
              <Label>Location</Label>
              <CountryDropdown
                name="location"
                value={location}
                onChange={(country) => setLocation(country)}
                defaultOptionLabel={loggedInUser?.location}
              />
            </Form.Field>

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
};
export default UserEditForm;
