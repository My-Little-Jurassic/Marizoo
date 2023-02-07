import React from "react";
import styled from "styled-components";

import { ProfileStore, ProfileLarge } from "../common/profile/index";
import BroadcastContent from "./BroadcastContent";
import BroadcastScreen from "./BroadcastScreen";
import BroadcastRecommendations from "./BroadcastRecommendations";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../../store";

// 임시 방송 정보
const sampleBroadcastInfo = {
  broadcast: {
    title: "우파루파 먹방",
    description: "우리 우파루파 얼마나 맛있게 먹는지 보러 올 사람?",
  },
  animals: [
    {
      name: "우파",
      gender: "male",
      classification: "axolotl",
      image: "https://picsum.photos/200/300",
    },
    {
      name: "우파파",
      gender: "female",
      classification: "axolotl",
      image: "https://picsum.photos/200/300",
    },
  ],
  store: {
    name: "마리쥬 카페",
    profile: "https://picsum.photos/200/300",
  },
};

const animalProfileList = sampleBroadcastInfo.animals.map((animal) => {
  return (
    <Grid key={animal.name} item xs={12} sm={6} md={12}>
      <ProfileLarge
        animalName={animal.name}
        gender={animal.gender}
        classification={animal.classification}
        imgSrc={animal.image}
      />
    </Grid>
  );
});

// 임시 먹이 리스트
const tmpFeedList = [
  { id: 1, feedName: "귀뚜라미", imgSrc: "https://picsum.photos/200/300" },
  { id: 2, feedName: "지렁이", imgSrc: "https://picsum.photos/200/300" },
  { id: 3, feedName: "쥐", imgSrc: "https://picsum.photos/200/300" },
  { id: 4, feedName: "곤충젤리", imgSrc: "https://picsum.photos/200/300" },
];

const BroadcastHome = function () {
  const isMaximized = useAppSelector((state) => state.broadcast.isMaximized);

  return (
    <StyledContainer>
      <StyledLeftSection>
        <BroadcastScreen title={sampleBroadcastInfo.broadcast.title} feedList={tmpFeedList} />
        {!isMaximized && (
          <BroadcastContent
            title={sampleBroadcastInfo.broadcast.title}
            detail={sampleBroadcastInfo.broadcast.description}
            feedList={tmpFeedList}
          />
        )}
      </StyledLeftSection>
      {!isMaximized && (
        <StyledRightSection>
          <ProfileStore
            storeName={sampleBroadcastInfo.store.name}
            imgSrc={sampleBroadcastInfo.store.profile}
          />
          <Grid container spacing={4}>
            {animalProfileList}
          </Grid>
          <BroadcastRecommendations />
        </StyledRightSection>
      )}
    </StyledContainer>
  );
};

export default BroadcastHome;

const StyledContainer = styled.div`
  box-sizing: border-box;
  padding: 80px 8.75vw;
  background-color: ${(props) => props.theme.colors.primaryBg};
  width: 100vw;
  height: 100%;
  display: flex;
  gap: 32px;
  @media screen and (max-width: 1400px) {
    padding: 80px 2vw;
  }
  @media screen and (max-width: 900px) {
    padding: 80px 4vw;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    padding: 80px 2vw;
    min-width: 375px;
  }
`;

const StyledLeftSection = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const StyledRightSection = styled.div`
  width: 22%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  }
`;
