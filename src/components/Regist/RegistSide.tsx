import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrayBtn, GreenBtn } from "../common/button";

const StyledDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h1 {
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

  & > button {
    position: fixed;
    top: 20px;
    left: 20px;
  }

  @media screen and (max-width: 800px) {
    height: 160px;
    & > h1 {
      margin-top: 40px;
      position: relative;
      display: inline;
      font: ${({ theme }) => theme.fonts.display3};
    }
    & > button {
      display: none;
    }
  }
`;

const RegistSide = (): JSX.Element => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
    console.log("fsdf");
  };
  return (
    <StyledDiv>
      <GrayBtn label={"뒤로가기"} type={2} isDisable={false} onClick={onBack} />
      <h1>
        <span>마이</span>
        <span>리틀</span>
        <span>쥬라기</span>
      </h1>
    </StyledDiv>
  );
};

export default RegistSide;
