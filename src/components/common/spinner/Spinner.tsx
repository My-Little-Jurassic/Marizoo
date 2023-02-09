import React from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  size?: number;
}

function Spinner(props: IProps) {
  return (
    <StyledSpinner size={props.size}>
      <div id="spinner-bg">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </StyledSpinner>
  );
}

export default Spinner;

const fadeIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const StyledSpinner = styled.div<IProps>`
  #spinner-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: ${(props) => props.theme.colors.primaryBg};
    opacity: 0.5;
    & > div {
      width: ${(props) => (props.size ? props.size : "96")}px;
      height: ${(props) => (props.size ? props.size : "96")}px;
      border-radius: 100%;
      position: absolute;
    }
    & > :nth-child(1) {
      background-color: ${(props) => props.theme.colors.brandColors.basaltGray[600]};
      animation: ${fadeIn} 0.9s infinite both alternate;
      opacity: 0.5;
    }
    & > :nth-child(2) {
      background-color: ${(props) => props.theme.colors.brandColors.jurassicGreen[600]};
      animation: ${fadeIn} 1.5s infinite both alternate;
      animation-delay: 0.3s;
      opacity: 0.8;
    }
    & > :nth-child(3) {
      background-color: ${(props) => props.theme.colors.brandColors.mangoYellow[600]};
      animation: ${fadeIn} 1.9s infinite both alternate;
      animation-delay: 0.6s;
      opacity: 0.6;
    }
  }
`;
