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

function SideBgLeft() {
  const backgroundImageList: backgroundImgOption[] = [
    { src: "backgroundLeaf2.svg", top: 15, left: 70 },
    { src: "backgroundStone1.svg", top: 25, left: 30 },
    { src: "backgroundLeaf1.svg", top: 35, left: 60 },
    { src: "backgroundStone2.svg", top: 45, left: 20 },
    { src: "backgroundCircle1.svg", top: 55, left: 60 },
    { src: "backgroundFootPrint.svg", top: 65, left: 30 },
    { src: "backgroundCircle2.svg", top: 75, left: 40 },
    { src: "backgroundStone1.svg", top: 85, left: 70 },
  ];
  const backgroundElementList = backgroundImageList.map((option: backgroundImgOption, index) => (
    <StyledBackgroundImg
      key={`backgroundImage-${index}`}
      top={option.top + getRandomArbitrary(-5, 5)}
      left={option.left + getRandomArbitrary(-20, 20)}
      time={getRandomArbitrary(10, 30)}
      position={getRandomArbitrary(-50, 50)}
    >
      <img src={`./images/${option.src}`}></img>
    </StyledBackgroundImg>
  ));
  return <StyledSideBg>{backgroundElementList}</StyledSideBg>;
}

export default React.memo(SideBgLeft);

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
  left: calc(50vw - 700px);
  width: 160px;
  height: 100vh;
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
