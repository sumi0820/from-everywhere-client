/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC, FormEvent, useState } from 'react';
import { Button, Modal, Input, Message } from 'semantic-ui-react';
import { css, jsx } from '@emotion/react';

const container = css`
  .ui.button {
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
const modal = css`
  .header.header {
    background: #fffdf0;
    border-bottom: 0px;
  }

  .ui.error.message {
    margin-top: 0px;
    background-color: #fcecf3;
    box-shadow: none;
  }

  .ui.error.message .header {
    background-color: #fcecf3;
  }
`;

const form = css`
  background: #fffdf0;

  .content,
  .actions {
    display: flex;
    padding: 5px 30px;
    justify-content: center;
  }

  .content {
    flex-direction: column;
  }
  .actions {
    margin-bottom: 10px;
  }
`;

const SignupForm: VFC = () => {
  const [isOpen, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <div css={container}>
      <Modal
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        open={isOpen}
        dimmer="inverted"
        size="mini"
        trigger={<Button>Sign up?</Button>}
        css={modal}
      >
        <Modal.Header className="header">Create Your Account</Modal.Header>
        <form onSubmit={handleSubmit} css={form}>
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
              type="button"
              primary
              onSubmit={handleSubmit}
              onClick={() => {
                setOpen(false);
              }}
            >
              Sign up
            </Button>
            <Button
              negative
              onClick={() => {
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
    </div>
  );
};

export default SignupForm;
