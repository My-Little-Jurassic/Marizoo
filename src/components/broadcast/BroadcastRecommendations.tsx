import React from "react";
import styled from "styled-components";
import { CardLabelMedium } from "../common/card";

const BroadcastRecommendations = function () {
  // 임시 추천 방송 목록
  const tmpRecommendedBroadcastList = [
    {
      id: 1,
      title: "우파루파 먹방",
      imgSrc: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      title: "눈싸움",
      imgSrc: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      title: "핸들링",
      imgSrc: "https://picsum.photos/200/300",
    },
  ];

  const recommendedBroadcastCardList = tmpRecommendedBroadcastList.map((broadcast) => {
    return <CardLabelMedium key={broadcast.id} title={broadcast.title} imgSrc={broadcast.imgSrc} />;
  });

  return (
    <StyledContainer>
      <StyledHeader3>추천 방송</StyledHeader3>
      {recommendedBroadcastCardList}
    </StyledContainer>
  );
};

export default BroadcastRecommendations;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledHeader3 = styled.div`
  font: ${(props) => props.theme.fonts.header3};
  color: ${(props) => props.theme.colors.primaryText};
`;
