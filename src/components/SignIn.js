import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Message,
  Form,
  Icon,
} from "semantic-ui-react";

import "./styles/Form.scss";

const SignIn = ({ onSignIn, onUnmount, onChange, errorMessage, onTest }) => {
  useEffect(() => {
    return onUnmount;
  }, []);
  return (
    <div className="form__container">
      <Container text>
        <Grid container>
          <Grid.Column>
            <Form onSubmit={onSignIn} className="form__form">
              <Form.Field>
                <label>Email</label>
                <input type="email" name="email" onChange={onChange} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" name="password" onChange={onChange} />
              </Form.Field>

              <Button
                className="form__button goback"
                animated
                type="submit"
                secondary
              >
                <Button.Content hidden>
                  <Icon name="sign-in" />
                </Button.Content>
                <Button.Content visible>Sign in</Button.Content>
              </Button>

              {errorMessage ? (
                <>
                  <Message negative>
                    <Message.Header>{errorMessage}</Message.Header>
                    <p>Please try again.</p>
                  </Message>
                </>
              ) : null}
            </Form>

            <div className="form__testMode__container goback">
              <Button
                className="form__button "
                animated
                onClick={onTest}
                color="linkedin"
              >
                <Button.Content hidden>
                  <Icon name="wrench" />
                </Button.Content>
                <Button.Content visible>Test Mode</Button.Content>
              </Button>
            </div>

          </Grid.Column>
        </Grid>

        <div className="form__right">
          <Link to="/sign-up">Sign up?</Link>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
