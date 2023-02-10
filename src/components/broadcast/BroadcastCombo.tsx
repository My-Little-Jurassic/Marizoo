import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  finishEffect(): void;
}

// 수정 필요
function BroadcastCombo(props: IProps) {
  const [comboCount, setComboCount] = useState(0);
  const [comboTimerCount, setComboTimerCount] = useState(0);

  console.log(comboTimerCount);

  const comboTimer = setTimeout(() => {
    // clearTimeout(comboTimer);
    if (comboTimerCount > 1) {
      setComboTimerCount(comboTimerCount - 1);
    } else if (comboTimerCount <= 0.5 && comboTimerCount !== 0) {
      setComboCount(0);
      setComboTimerCount(0);
      clearTimeout(comboTimer);
      props.finishEffect();
    }
  }, 1000 / (comboTimerCount / 6));

  const hitCombo = () => {
    // clearTimeout(comboTimer);
    setComboCount(comboCount + 1);
    setComboTimerCount(comboTimerCount + 1.5);
  };

  return (
    <StyledContainer onClick={hitCombo}>
      <StyledCombo comboTimerCount={comboTimerCount}>
        <div>x{comboCount}combo</div>
        <div></div>
      </StyledCombo>
    </StyledContainer>
  );
}

export default BroadcastCombo;

const StyledContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0);
`;

const shake = (comboTimerCount: number) => keyframes`
0% {
  -webkit-transform: translate(0);
          transform: translate(0);
}
20% {
  -webkit-transform: translate(-${comboTimerCount}px, ${comboTimerCount}px);
          transform: translate(-${comboTimerCount}px, ${comboTimerCount}px);
}
40% {
  -webkit-transform: translate(-${comboTimerCount}px, -${comboTimerCount}px);
          transform: translate(-${comboTimerCount}px, -${comboTimerCount}px);
}
60% {
  -webkit-transform: translate(${comboTimerCount}px, ${comboTimerCount}px);
          transform: translate(${comboTimerCount}px, ${comboTimerCount}px);
}
80% {
  -webkit-transform: translate(${comboTimerCount}px, -${comboTimerCount}px);
          transform: translate(${comboTimerCount}px, -${comboTimerCount}px);
}
100% {
  -webkit-transform: translate(0);
          transform: translate(0);
}`;

const StyledCombo = styled.div<{
  comboTimerCount: number;
}>`
  width: 120px;
  height: 30px;
  position: absolute;
  z-index: 10;
  top: 24px;
  right: 48px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  & div:first-child {
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: rgb(${({ comboTimerCount }) => comboTimerCount * 10}, 100, 100);
    font-size: calc(24px + ${({ comboTimerCount }) => comboTimerCount}px / 2);
    text-shadow: 0px 0px ${({ comboTimerCount }) => comboTimerCount}px
      rgb(
        ${({ comboTimerCount }) => comboTimerCount * 12},
        ${({ comboTimerCount }) => comboTimerCount * 8},
        0
      );
  }
  & div:last-child {
    height: 10px;
    background-color: rgb(${({ comboTimerCount }) => comboTimerCount * 10}, 100, 100);
    font-size: calc(24px + ${({ comboTimerCount }) => comboTimerCount / 2}px / 2);
    box-shadow: 0px 0px ${({ comboTimerCount }) => comboTimerCount}px
      rgb(
        ${({ comboTimerCount }) => comboTimerCount * 12},
        ${({ comboTimerCount }) => comboTimerCount * 8},
        0
      );
    transition: all 0.2s;
    width: ${({ comboTimerCount }) => comboTimerCount}%;
  }
  &:active {
    animation: ${(props) => shake((props.comboTimerCount / 8) * 2)} 0.1s linear;
  }
`;
