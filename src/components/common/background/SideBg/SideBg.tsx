import React from "react";
import styled, { keyframes } from "styled-components";

function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

interface backgroundImgOption {
  src: string;
  top: number;
  left: number;
}

function SideBg() {
  const backgroundImageList: backgroundImgOption[] = [
    { src: "backgroundLeaf2.svg", top: 15, left: 50 },
    { src: "backgroundStone1.svg", top: 27, left: 30 },
    { src: "backgroundLeaf1.svg", top: 37, left: 60 },
    { src: "backgroundStone2.svg", top: 50, left: 20 },
    { src: "backgroundCircle1.svg", top: 60, left: 60 },
    { src: "backgroundFootPrint.svg", top: 70, left: 30 },
    { src: "backgroundCircle2.svg", top: 80, left: 50 },
  ];
  const backgroundElementList = backgroundImageList.map((option: backgroundImgOption, index) => (
    <StyledBackgroundImg
      key={`backgroundImage-${index}`}
      top={option.top + getRandomArbitrary(-5, 5)}
      left={option.left + getRandomArbitrary(-20, 20)}
      time={getRandomArbitrary(5, 15)}
      position={getRandomArbitrary(-50, 50)}
    >
      <img src={`./images/${option.src}`}></img>
    </StyledBackgroundImg>
  ));
  return (
    <StyledSideBg>
      <StyledSideBgLeft>{backgroundElementList}</StyledSideBgLeft>
      <StyledSideBgright>{backgroundElementList}</StyledSideBgright>
    </StyledSideBg>
  );
}

export default React.memo(SideBg);

const move = (position: number) => keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(${position}px);
  }
`;

const StyledSideBg = styled.div`
  position: fixed;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.primaryBg};
`;

const StyledSideBgLeft = styled.div`
  position: fixed;
  left: calc(50vw - 700px);
  bottom: 0px;
  @media screen and (max-width: 900px) {
    left: calc(50vw - 500px);
  }
  width: 300px;
  height: 90vh;
`;

const StyledSideBgright = styled.div`
  position: fixed;
  right: calc(50vw - 700px);
  bottom: 0px;
  @media screen and (max-width: 900px) {
    right: calc(50vw - 500px);
  }
  width: 300px;
  height: 90vh;
  transform: rotate(0.5turn);
`;

const StyledBackgroundImg = styled.div<{
  top: number;
  left: number;
  time: number;
  position: number;
}>`
  animation: ${(props) => move(props.position)} ${({ time }) => time}s ease-in-out alternate
    infinite;
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  transition: 3s all;
  &:hover {
    scale: 1.2;
  }
`;
