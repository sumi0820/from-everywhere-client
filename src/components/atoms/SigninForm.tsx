import { VFC, FormEvent, useState } from 'react';
import { Button, Input } from 'semantic-ui-react';

const SigninForm: VFC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
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
        <Button type="submit" primary>
          Sign in
        </Button>
      </form>
    </>
  );
};

export default SigninForm;
