import React from "react";
import styled from "styled-components";

const MypageBadgeGauge = () => {
  const collectionRate = 1 / 2;

  const getPercent = () => {
    return collectionRate * 100;
  };
  return (
    <StyledDiv percent={getPercent()}>
      <div>
        <span>{getPercent() + "%"}</span>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{ percent: number }>`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.brandColors.basaltGray[200]};
  overflow: hidden;
  position: relative;

  & > div {
    background-color: ${({ theme }) => theme.colors.green};
    width: ${({ percent }) => percent + "%"};
    height: 100%;
    border-radius: 20px;
    ${({ theme }) => theme.shadow};

    & > span {
      color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
      font: ${({ theme }) => theme.fonts.subContentBold};
      position: absolute;
      right: 32px;
      ${({ percent }) => (percent < 30 ? "left : 32px;" : undefined)}
    }
    display: flex;
    align-items: center;
  }
`;

export default MypageBadgeGauge;
