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

const SignIn = ({ onSignIn, onUnmount, onChange, errorMessage }) => {
  useEffect(() => {
    return onUnmount;
  }, []);
  return (
    // <form onSubmit={onSignIn}>
    //   <input type="email" name="email" onChange={onChange} />
    //   <input type="password" name="password" onChange={onChange} />
    //   <button type="submit">Sign in</button>
    //   {errorMessage ? (
    //     <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
    //   ) : null}
    // </form>
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

              <Button className="form__button" animated type="submit" secondary>
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
