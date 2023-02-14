import React, { useRef } from "react";
import styled from "styled-components";
interface IProps {
  spreadBadge(): void;
}

const BroadcastBadgeController = ({ spreadBadge }: IProps): JSX.Element => {
  const badgeRef = useRef<boolean>(false);

  const onClick = () => {
    spreadBadge();
    badgeRef.current = true;
  };
  return (
    <StyledDiv>
      <button onClick={onClick} disabled={badgeRef.current}>
        부화 배지 뿌리기
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div``;

export default React.memo(BroadcastBadgeController);
