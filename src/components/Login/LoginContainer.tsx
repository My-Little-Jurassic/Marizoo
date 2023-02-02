import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "./LoginForm";

const StyledDiv = styled.div`
  z-index: -1;
  display: absolute;
  max-width: 484px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  ${({ theme }) => theme.shadow}; //shadow CSS
  display: flex;
  margin: auto 8px;
  padding: 56px 8px;
  flex-direction: column;

  & > .container-header,
  & > .container-footer {
    text-align: center;
    margin-bottom: 56px;

    & h2 {
      color: ${({ theme }) => theme.colors.primaryText};
      font: ${({ theme }) => theme.fonts.display4};
      margin-bottom: 8px;
    }
    & span {
      color: ${({ theme }) => theme.colors.secondaryText};
      font: ${({ theme }) => theme.fonts.tinyContentBold};
    }
    & a {
      cursor: pointer;
      font-size: 16px;
      text-decoration: underline;

      &:hover {
        opacity: 0.75;
      }
    }
  }
  & > .container-footer {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1280px) {
    margin: auto;
    margin-bottom: 100px;
  }
`;

const LoginContainer = (): JSX.Element => {
  const navigate = useNavigate();

  const moveToRegist = () => navigate("/regist");
  return (
    <StyledDiv>
      <div className="container-header">
        <h2>로그인</h2>
      </div>
      <LoginForm />
      <div className="container-footer">
        <span>
          아직 회원이 아니신가요? <a onClick={moveToRegist}>회원가입</a>
        </span>
      </div>
    </StyledDiv>
  );
};

export default LoginContainer;
