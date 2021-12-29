import { VFC, FormEvent, useState } from 'react';
import { Button, Modal, Message, Input } from 'semantic-ui-react';

const SignupForm: VFC = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Sign up</Button>}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Content>
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
          </Modal.Content>
          <Modal.Actions>
            <Button
              type="submit"
              primary
              onSubmit={handleSubmit}
              onClose={() => {
                setOpen(false);
              }}
            >
              Sign up
            </Button>
            <Button
              negative
              onClose={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Actions>
        </form>

        <Message
          error
          header="There was some errors with your submission"
          list={[
            'You must include both a upper and lower case letters in your password.',
            'You need to select your home country.',
          ]}
        />
      </Modal>
    </>
  );
};

export default SignupForm;
