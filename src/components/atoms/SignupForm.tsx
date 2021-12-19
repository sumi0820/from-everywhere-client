import { VFC, useState } from 'react';
import { Button, Modal, Message } from 'semantic-ui-react';

const SignupForm: VFC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Sign up?
      </Button>

      <Modal size="small" open={open}>
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
          <Button
            positive
            onClick={() => {
              setOpen(false);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
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
