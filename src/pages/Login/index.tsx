import React from "react";
import { LoginContainer, LoginSide, LoginVectorBg } from "../../components/Login";

const Login = (): JSX.Element => {
  return (
    <LoginVectorBg>
      <LoginSide />
      <LoginContainer />
    </LoginVectorBg>
  );
};

export default Login;
