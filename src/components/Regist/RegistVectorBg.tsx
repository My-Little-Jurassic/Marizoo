import React, { ReactNode } from "react";
import styled from "styled-components";

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
    @media screen and (max-width: 800px) {
      display: block;
    }
  }

  & > .backImg {
    background-color: ${({ theme }) => theme.colors.brandColors.mangoYellow[50]};
    z-index: 0;
    position: fixed;
    width: 100%;
    height: 100%;

    & > img {
      width: 100%;
      @media screen and (max-aspect-ratio: 16/11) {
        width: auto;
        height: 100%;
      }
    }
    & svg:hover {
      transform: scale(50%);
    }
  }
`;

interface IProps {
  children: ReactNode;
}

const RegistVectorBg = ({ children }: IProps) => {
  return (
    <StyledDiv>
      <div className="backImg">
        <img src="./images/lightLoginVectorBgBack.svg" />
      </div>
      <main>{children}</main>
    </StyledDiv>
  );
};

export default RegistVectorBg;
