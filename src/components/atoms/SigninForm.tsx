/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC, FormEvent, useState } from 'react';
import { Button, Input, Label, Radio } from 'semantic-ui-react';

import { css, jsx } from '@emotion/react';
import SignupForm from './SignupForm';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .ui.label {
    background-color: #fcecf3 !important;
  }

  .ui.primary.button {
    margin-bottom: 10px;
    background-color: #c5e4e4;
    color: #25201a;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    appearance: none;
  }
`;

const SigninForm: VFC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTest, setIsTest] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isTest) {
      console.log(`Login with ${email} and ${password} `);
    } else {
      console.log('Login as a test user');
    }
  };

  return (
    <div css={container}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={(_, data) => setEmail(data.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(_, data) => setPassword(data.value)}
        />
        <div>
          <Label>{isTest ? 'Test user' : 'Normal user'}</Label>
          <Radio toggle onChange={(_) => setIsTest(!isTest)} />
        </div>
        <div>
          <Button type="submit" primary>
            Sign in
          </Button>
          <SignupForm />
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
