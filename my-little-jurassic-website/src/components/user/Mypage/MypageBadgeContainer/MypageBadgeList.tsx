import React from "react";
import styled from "styled-components";
import { IBadge } from "./MypageBadgeContainer";
import MypageBadgeItem from "./MypageBadgeItem";

const sampleImg = "/images/sampleBadge.png";

interface IProps {
  badgeList: IBadge[];
}

const MypageBadgeList = ({ badgeList }: IProps) => {
  return (
    <StyledUl>
      {!badgeList.length ? (
        <div className="no-badge">아직 획득한 배지가 없어요!</div>
      ) : (
        badgeList.map((item, index) => <MypageBadgeItem key={index} item={item} />)
      )}
    </StyledUl>
  );
};

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  & > .no-badge {
    width: 100%;
    height: 80px;
    display: flex;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
    font: ${({ theme }) => theme.fonts.mainContent};
  }
`;

export default MypageBadgeList;
