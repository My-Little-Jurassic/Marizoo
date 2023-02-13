import React, { useState, useEffect } from "react";
import { TbHeart } from "react-icons/tb";
import styled, { keyframes } from "styled-components";

interface IProps {
  clientX: number;
  clientY: number;
}

function BroadcastHeart(props: IProps) {
  const [isMouseHold, setIsMouseHold] = useState(false);
  const [holdTime, setHoldTime] = useState<number>(0);
  const [mouseIcon, setMouseIcon] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (isMouseHold) {
      setHoldTime(Date.now());
    } else if (holdTime) {
      setHoldTime(Date.now());
    }
  }, [isMouseHold]);

  const [effectIconList, setEffectIconList] = useState<JSX.Element[]>([]);
  const initEffectIcon = () => {
    const holdSize = Date.now() - holdTime;
    return (
      <StyledIcon
        key={Date.now()}
        holdTime={holdTime}
        mousePosition={{
          X: props.clientX - holdSize / 4,
          Y: props.clientY - holdSize / 4,
        }}
      >
        <TbHeart size={holdSize / 2} fill="white"></TbHeart>
      </StyledIcon>
    );
  };

  const pushEffectIcon = () => {
    const newEffectIconList = effectIconList;
    newEffectIconList.push(initEffectIcon());
    setEffectIconList(newEffectIconList);
    setTimeout(() => {
      newEffectIconList.shift();
      setEffectIconList(newEffectIconList);
    }, 1000);
  };

  return (
    <StyledBroadcastEffect
      onMouseDown={() => {
        setIsMouseHold(true);
        setMouseIcon(<TbHeart id="mouse-icon" fill="white"></TbHeart>);
      }}
      onMouseUp={() => {
        setIsMouseHold(false);
        setMouseIcon(<></>);
        pushEffectIcon();
      }}
      holdTime={holdTime}
      mousePosition={{ X: props.clientX, Y: props.clientY }}
    >
      <div>{mouseIcon}</div>
      <div>{effectIconList}</div>
    </StyledBroadcastEffect>
  );
}

export default React.memo(BroadcastHeart);

interface IBroadcastEffectProps {
  holdTime: number;
  mousePosition: { X: number; Y: number };
}

const flyAway = keyframes`
  0% {transform: translateY(0px); opacity: 1;
}
  100% {transform: translateY(-500px); opacity: 0;
}
`;

const sizeUp = keyframes`
  from {scale: 0;
}
  to {scale: 100;
}
`;

const StyledIcon = styled.div<IBroadcastEffectProps>`
  position: absolute;
  color: white;
  top: ${(props) => props.mousePosition.Y}px;
  left: ${({ mousePosition }) => mousePosition.X}px;
  animation: ${flyAway} 1s forwards;
  pointer-events: none;
  opacity: 1;
`;

const StyledBroadcastEffect = styled.div<IBroadcastEffectProps>`
  position: absolute;
  z-index: 5;
  color: white;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  overflow: hidden;
  cursor: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNyAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0Ljc1MzcgNy45NjkwNUw4LjUwNjk0IDE0TDIuMjYwMTggNy45NjkwNUMxLjg0ODE1IDcuNTc4MiAxLjUyMzU5IDcuMTA4NDMgMS4zMDY5NiA2LjU4OTNDMS4wOTAzMyA2LjA3MDE4IDAuOTg2MzA1IDUuNTEyOTUgMS4wMDE0NCA0Ljk1MjcxQzEuMDE2NTggNC4zOTI0NyAxLjE1MDU1IDMuODQxMzUgMS4zOTQ5MiAzLjMzNDA3QzEuNjM5MjkgMi44MjY3OCAxLjk4ODc2IDIuMzc0MzEgMi40MjEzMyAyLjAwNTE1QzIuODUzOSAxLjYzNTk5IDMuMzYwMiAxLjM1ODE0IDMuOTA4MzMgMS4xODkwOUM0LjQ1NjQ3IDEuMDIwMDQgNS4wMzQ1OCAwLjk2MzQ1NiA1LjYwNjI1IDEuMDIyOUM2LjE3NzkyIDEuMDgyMzUgNi43MzA3OCAxLjI1NjU0IDcuMjMgMS41MzQ1QzcuNzI5MjIgMS44MTI0NiA4LjE2Mzk5IDIuMTg4MTcgOC41MDY5NCAyLjYzNzk4QzguODUxMzcgMi4xOTE0NCA5LjI4NjY1IDEuODE5MDEgOS43ODU1MyAxLjU0NEMxMC4yODQ0IDEuMjY4OTkgMTAuODM2MSAxLjA5NzMxIDExLjQwNjIgMS4wMzk3M0MxMS45NzYzIDAuOTgyMTM2IDEyLjU1MjQgMS4wMzk4NyAxMy4wOTg1IDEuMjA5MzFDMTMuNjQ0NyAxLjM3ODc2IDE0LjE0OSAxLjY1NjI2IDE0LjU4MDEgMi4wMjQ0NkMxNS4wMTExIDIuMzkyNjYgMTUuMzU5NiAyLjg0MzYyIDE1LjYwMzYgMy4zNDkxM0MxNS44NDc2IDMuODU0NjQgMTUuOTgyIDQuNDAzODEgMTUuOTk4MyA0Ljk2MjI3QzE2LjAxNDYgNS41MjA3MyAxNS45MTI1IDYuMDc2NDYgMTUuNjk4MyA2LjU5NDY3QzE1LjQ4NDIgNy4xMTI4OSAxNS4xNjI2IDcuNTgyNDMgMTQuNzUzNyA3Ljk3MzkyIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTQuNzUzNyA3Ljk2OTA1TDguNTA2OTQgMTRMMi4yNjAxOCA3Ljk2OTA1QzEuODQ4MTUgNy41NzgyIDEuNTIzNTkgNy4xMDg0MyAxLjMwNjk2IDYuNTg5M0MxLjA5MDMzIDYuMDcwMTggMC45ODYzMDUgNS41MTI5NSAxLjAwMTQ0IDQuOTUyNzFDMS4wMTY1OCA0LjM5MjQ3IDEuMTUwNTUgMy44NDEzNSAxLjM5NDkyIDMuMzM0MDdDMS42MzkyOSAyLjgyNjc4IDEuOTg4NzYgMi4zNzQzMSAyLjQyMTMzIDIuMDA1MTVDMi44NTM5IDEuNjM1OTkgMy4zNjAyIDEuMzU4MTQgMy45MDgzMyAxLjE4OTA5QzQuNDU2NDcgMS4wMjAwNCA1LjAzNDU4IDAuOTYzNDU2IDUuNjA2MjUgMS4wMjI5QzYuMTc3OTIgMS4wODIzNSA2LjczMDc4IDEuMjU2NTQgNy4yMyAxLjUzNDVDNy43MjkyMiAxLjgxMjQ2IDguMTYzOTkgMi4xODgxNyA4LjUwNjk0IDIuNjM3OThDOC44NTEzNyAyLjE5MTQ0IDkuMjg2NjUgMS44MTkwMSA5Ljc4NTUzIDEuNTQ0QzEwLjI4NDQgMS4yNjg5OSAxMC44MzYxIDEuMDk3MzEgMTEuNDA2MiAxLjAzOTczQzExLjk3NjMgMC45ODIxMzYgMTIuNTUyNCAxLjAzOTg3IDEzLjA5ODUgMS4yMDkzMUMxMy42NDQ3IDEuMzc4NzYgMTQuMTQ5IDEuNjU2MjYgMTQuNTgwMSAyLjAyNDQ2QzE1LjAxMTEgMi4zOTI2NiAxNS4zNTk2IDIuODQzNjIgMTUuNjAzNiAzLjM0OTEzQzE1Ljg0NzYgMy44NTQ2NCAxNS45ODIgNC40MDM4MSAxNS45OTgzIDQuOTYyMjdDMTYuMDE0NiA1LjUyMDczIDE1LjkxMjUgNi4wNzY0NiAxNS42OTgzIDYuNTk0NjdDMTUuNDg0MiA3LjExMjg5IDE1LjE2MjYgNy41ODI0MyAxNC43NTM3IDcuOTczOTIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=)
      9 10,
    none;
  & > div {
    width: 100%;
    height: 100%;
    & > svg {
      pointer-events: none;
    }
  }
  & .effect-icon {
    position: absolute;
    color: white;
    top: ${({ mousePosition }) => mousePosition.Y}px;
    left: ${({ mousePosition }) => mousePosition.X}px;
  }
  & #mouse-icon {
    position: absolute;
    animation: ${sizeUp} 5s forwards;
    top: ${({ mousePosition }) => mousePosition.Y - 10}px;
    left: ${({ mousePosition }) => mousePosition.X - 10}px;
  }
`;
