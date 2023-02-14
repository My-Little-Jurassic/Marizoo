import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrayBtn } from "../../common/button";

const StyledDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 10000;
  & > main {
    z-index: 1;
    position: relative;
    max-width: 1056px;
    margin: auto;
    display: flex;
    & > * {
      flex: 1 1 0;
    }
    @media screen and (max-width: 1280px) {
      display: block;
    }
  }
  & > button {
    z-index: 10000;
    position: fixed;
    top: 20px;
    left: 20px;
  }

  & > .backImg,
  & > .frontImg {
    background-color: ${({ theme }) => theme.colors.brandColors.mangoYellow[50]};
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;

    & > img {
      width: 100%;
    }
  }
  & > .frontImg {
    background: none;
    z-index: 10;
    top: -30px;
    pointer-events: none;
  }
  @media screen and (max-aspect-ratio: 16/10) {
    & > .backImg,
    & > .frontImg {
      & > img {
        width: auto;
        height: 100vh;
      }
    }
    & > .frontImg {
      display: none;
    }
    & > button {
      display: none;
    }
  }

  @media screen and (max-width: 1280px) {
    & > .frontImg {
      z-index: 1;
    }
  }
`;

interface IProps {
  children: ReactNode;
}

const LoginVectorBg = ({ children }: IProps) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <StyledDiv>
      <GrayBtn label={"뒤로가기"} type={2} isDisable={false} onClick={onBack} />
      <div className="frontImg">
        <img src="./images/lightLoginVectorBgFront.svg" />
      </div>
      <div className="backImg">
        <img src="./images/lightLoginVectorBgBack.svg" />
      </div>
      <main>{children}</main>
    </StyledDiv>
  );
};

export default LoginVectorBg;
