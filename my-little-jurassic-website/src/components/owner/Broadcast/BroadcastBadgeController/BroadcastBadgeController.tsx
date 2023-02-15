import React, { useRef } from "react";
import styled from "styled-components";
import { TStatus } from "../type";

interface IProps {
  spreadBadge(): void;
  status: TStatus;
}

const BroadcastBadgeController = ({ spreadBadge, status }: IProps): JSX.Element => {
  const badgeRef = useRef<boolean>(false);

  const onClick = () => {
    spreadBadge();
    badgeRef.current = true;
  };

  const isDisabled = () => {
    switch (status) {
      case "ONAIR":
        return badgeRef.current;
      case "DEFAULT":
      case "FINISH":
      case "RESERVE":
      default:
        return true;
    }
  };
  return (
    <StyledDiv>
      <button onClick={onClick} disabled={isDisabled()}>
        부화 배지 뿌리기
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 16px;
  & > button {
    width: 100%;
    height: 40px;
    font: ${({ theme }) => theme.fonts.header5};
  }
`;

export default React.memo(BroadcastBadgeController);
