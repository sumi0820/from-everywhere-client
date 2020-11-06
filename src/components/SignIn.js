import React, { useEffect } from "react";

const SignIn = ({ onSignIn, onUnmount, onChange, errorMessage }) => {
  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <form onSubmit={onSignIn}>
      <input type="email" name="email" onChange={onChange} />
      <input type="password" name="password" onChange={onChange} />
      <button type="submit">Sign in</button>
      {errorMessage ? (
        <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
      ) : null}
    </form>
  );
};

export default SignIn;
