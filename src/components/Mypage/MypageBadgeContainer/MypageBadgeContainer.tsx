import React from "react";
import styled from "styled-components";
import MypageBadgeGauge from "./MypageBadgeGauge";
import MypageBadgeList from "./MypageBadgeList";

const MypageBadgeContainer = () => {
  return (
    <StyledDiv>
      <h2>나의 배지 컬렉션</h2>
      <div className="badge-area">
        <MypageBadgeGauge />
        <MypageBadgeList />
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  & > .badge-area {
    border-radius: 32px;
    padding: 40px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    ${({ theme }) => theme.shadow};
  }
`;

export default MypageBadgeContainer;
