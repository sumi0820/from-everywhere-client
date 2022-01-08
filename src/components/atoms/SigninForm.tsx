/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC, FormEvent, useState } from 'react';
import { Button, Input, Label, Radio } from 'semantic-ui-react';
import { userSlice } from 'features/user';
import { useDispatch } from 'react-redux';
import { css, jsx } from '@emotion/react';
import { postSignIn, postSignInTest, User } from 'domains';
import SignupForm from './SignupForm';
import Spinner from './Spinner';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
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
    background-color: transparent !important;
  }

  .warning {
    margin-top: 0px;
    color: red;
  }
`;

const SigninForm: VFC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTest, setIsTest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch();
  const { userGotten } = userSlice.actions;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsLoading(true);

    const load = async (): Promise<void> => {
      try {
        if (!isTest && email && password) {
          await postSignIn({ json: { email, password } });
        } else if (isTest) {
          const user: User = await postSignInTest();
          dispatch(userGotten({ loggedInUser: user }));
        } else if (!isTest && (!email || !password)) {
          setIsEmpty(true);
        } // eslint-disable-line no-shadow
        setIsLoading(false);
      } catch (err) {
        throw new Error(`User auth failed`);
      }
    };
    void load();
  };

  return (
    <div css={container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(_, data) => {
              setEmail(data.value);
              setIsEmpty(false);
            }}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(_, data) => {
              setPassword(data.value);
              setIsEmpty(false);
            }}
          />
          <div>
            <Label>{isTest ? 'Test user' : 'Normal user'}</Label>
            <Radio
              toggle
              onChange={(_) => {
                setIsTest(!isTest);
                setIsEmpty(false);
              }}
            />
          </div>
          <div>
            <Button type="submit" primary>
              Sign in
            </Button>
            <SignupForm />
          </div>
          {isEmpty ? (
            <p className="warning">Email & password cannot be empty</p>
          ) : null}
        </form>
      )}
    </div>
  );
};

export default SigninForm;
