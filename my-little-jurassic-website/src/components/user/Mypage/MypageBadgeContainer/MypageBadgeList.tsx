import React from "react";
import styled from "styled-components";
import MypageBadgeItem from "./MypageBadgeItem";

const sampleImg = "/images/sampleBadge.png";

export interface IBadge {
  img: string;
  type: string;
  desc: string;
}

const MypageBadgeList = () => {
  const badgeList: IBadge[] = [
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다",
    },
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다.",
    },
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다.",
    },
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다.",
    },
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다",
    },
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다.",
    },
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다.",
    },
    {
      img: sampleImg,
      type: "watch",
      desc: "배지에 대한 설명입니다.",
    },
  ];
  return (
    <StyledUl>
      {badgeList.map((item, index) => (
        <MypageBadgeItem key={index} item={item} />
      ))}
    </StyledUl>
  );
};

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export default MypageBadgeList;
