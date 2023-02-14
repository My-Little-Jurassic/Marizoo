import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  z-index: 10000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h1 {
    cursor: pointer;
    margin: auto;
    position: fixed;
    font: ${({ theme }) => theme.fonts.display1};
    font-weight: heavy;
    line-height: 104px;
    display: flex;
    flex-direction: column;

    & > span:nth-child(1) {
      color: ${({ theme }) => theme.colors.green};
    }
    & > span:nth-child(2) {
      color: ${({ theme }) => theme.colors.brandColors.mangoYellow[700]};
    }
    & > span:nth-child(3) {
      color: ${({ theme }) => theme.colors.secondaryText};
    }
  }

  @media screen and (max-width: 1280px) {
    height: 160px;
    & > h1 {
      margin-top: 40px;
      border-radius: 32px;
      position: relative;
      display: inline;
      font: ${({ theme }) => theme.fonts.display3};
    }
  }
`;

const LoginSide = (): JSX.Element => {
  const navigate = useNavigate();

  const onClick = () => navigate("/");
  return (
    <StyledDiv>
      <h1 onClick={onClick}>
        <span>마이</span>
        <span>리틀</span>
        <span>쥬라기</span>
      </h1>
    </StyledDiv>
  );
};

export default LoginSide;
