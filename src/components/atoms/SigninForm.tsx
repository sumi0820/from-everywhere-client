import { VFC, FormEvent, useState } from 'react';
import { Button, Input, Label, Radio } from 'semantic-ui-react';

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
    <>
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
        <Radio toggle onChange={(_) => setIsTest(!isTest)} />
        <Label>
          {isTest ? 'Log in as a test user' : 'Log in as a normal user'}
        </Label>
        <Button type="submit" primary>
          Sign in
        </Button>
      </form>
    </>
  );
};

export default SigninForm;
