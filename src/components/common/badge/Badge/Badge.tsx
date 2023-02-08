import React, { useState, useEffect, MouseEvent } from "react";
import styled from "styled-components";

const Badge = function () {
  const [clientPosition, setClientPosition] = useState<{
    X: number;
    Y: number;
    centerX: number;
    centerY: number;
  }>({ X: 0, Y: 0, centerX: 0, centerY: 0 });

  const moveHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const eventTarget = e.target as HTMLCanvasElement;
    setClientPosition({
      X: e.clientX - eventTarget.getBoundingClientRect().left,
      Y: e.clientY - eventTarget.getBoundingClientRect().top,
      centerX:
        e.clientX -
        eventTarget.getBoundingClientRect().width / 2 -
        eventTarget.getBoundingClientRect().left,
      centerY:
        e.clientY -
        eventTarget.getBoundingClientRect().height / 2 -
        eventTarget.getBoundingClientRect().top,
    });
  };

  return (
    <div>
      <StyledBadge badgeId={1} clientPosition={clientPosition}>
        <div
          onMouseMove={moveHandler}
          onMouseOut={() => setClientPosition({ X: 0, Y: 0, centerX: 0, centerY: 0 })}
        >
          <div></div>
          <div id="badge">
            <img id="cover" src="./images/glitter.png"></img>
          </div>
        </div>
      </StyledBadge>
    </div>
  );
};
export default Badge;

interface IStyledBadgeProps {
  badgeId: number;
  clientPosition: { X: number; Y: number; centerX: number; centerY: number };
}

const StyledBadge = styled.div<IStyledBadgeProps>`
  margin: 200px;
  & > div {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    overflow: hidden;
    display: inline-block;
    background: none;
    transform-style: preserve-3d;
    transform: perspective(600px) rotateX(${(props) => (props.clientPosition.centerY / 3) * -1}deg)
      rotateY(${(props) => props.clientPosition.centerX / 3}deg);
    -webkit-transform-style: preserve-3d;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;

    & > div:first-child {
      transition: all 0.3s ease;
      -webkit-transition: all 0.3s ease;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(255, 255, 255, 0.718) 7.29%,
        rgba(255, 255, 255, 0) 100%
      );
      pointer-events: none;
      position: absolute;
      left: ${(props) => props.clientPosition.X - 170}px;
      top: ${(props) => props.clientPosition.Y - 170}px;
    }
    & > #badge {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-image: url("./images/badgePlayTime200.png");
      & > #cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* mix-blend-mode: overlay; */
        mix-blend-mode: soft-light;
      }
    }
  }
`;
