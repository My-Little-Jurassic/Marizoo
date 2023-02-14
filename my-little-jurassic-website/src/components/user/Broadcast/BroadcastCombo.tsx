import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  finishEffect(): void;
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
    if (delay !== null) {
      // 만약 delay가 null이 아니라면
      const id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
    }
  }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
}

// 수정 필요
function BroadcastCombo(props: IProps) {
  const [comboCount, setComboCount] = useState(0);
  const [comboTimerCount, setComboTimerCount] = useState(0);
  const comboRef = useRef<number>(0);

  useInterval(() => {
    if (comboTimerCount < 0.96 && comboTimerCount !== 0) {
      setComboCount(0);
      props.finishEffect();
    }
    if (comboTimerCount === 0) {
      return;
    }
    if (comboTimerCount < 20) {
      setComboTimerCount(comboTimerCount * 0.95);
    } else {
      setComboTimerCount(comboTimerCount * 0.93);
    }
  }, 100);

  const hitCombo = () => {
    setComboCount(comboCount + 1);
    setComboTimerCount(comboTimerCount + 2);
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
    width: ${({ comboTimerCount }) => comboTimerCount * 3}%;
  }
  &:active {
    animation: ${(props) => shake((props.comboTimerCount / 8) * 2)} 0.1s linear;
  }
`;
