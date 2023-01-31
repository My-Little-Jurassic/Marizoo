import React, { useState } from "react";
import styled from "styled-components";
import BroadcastContent from "./BroadcastContent";
import BroadcastScreen from "./BroadcastScreen";

import { ProfileStore, ProfileLarge } from "../common/profile/index";
import BroadcastRecommendations from "./BroadcastRecommendations";

// 임시 방송 정보
const tmpBroadcastInfo = {
  title: "우파루파 먹방",
  detail: "우리 우파루파 얼마나 맛있게 먹는지 보러 올 사람?",
};

// 임시 동물 목록
const tmpAnimalList = [
  {
    id: 1,
    animalName: "우파파",
    gender: "male",
    classification: "axolotl",
    imgSrc: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    animalName: "움파파",
    gender: "female",
    classification: "snake",
    imgSrc: "https://picsum.photos/200/300",
  },
];

const animalProfileList = tmpAnimalList.map((animal) => {
  return (
    <ProfileLarge
      key={animal.id}
      animalName={animal.animalName}
      gender={animal.gender}
      classification={animal.classification}
      imgSrc={animal.imgSrc}
    />
  );
});

// 임시 먹이 리스트
const tmpFeedList = [
  { id: 1, feedName: "귀뚜라미", imgSrc: "https://picsum.photos/200/300" },
  { id: 2, feedName: "지렁이", imgSrc: "https://picsum.photos/200/300" },
  { id: 3, feedName: "쥐", imgSrc: "https://picsum.photos/200/300" },
  { id: 4, feedName: "곤충젤리", imgSrc: "https://picsum.photos/200/300" },
];

const Broadcast = function () {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  return (
    <StyledFragment>
      <StyledContainer>
        <StyledLeftSection>
          <BroadcastScreen
            title={tmpBroadcastInfo.title}
            isMaximized={isMaximized}
            toggleScreenMode={() => setIsMaximized(!isMaximized)}
            feedList={tmpFeedList}
          />
          {!isMaximized && (
            <BroadcastContent
              title={tmpBroadcastInfo.title}
              detail={tmpBroadcastInfo.detail}
              feedList={tmpFeedList}
            />
          )}
        </StyledLeftSection>
        {!isMaximized && (
          <StyledRightSection>
            <ProfileStore storeName="우파파 움파파" imgSrc="https://picsum.photos/200/300" />
            {animalProfileList}
            <BroadcastRecommendations />
          </StyledRightSection>
        )}
      </StyledContainer>
    </StyledFragment>
  );
};

export default Broadcast;

const StyledFragment = styled.div``;

const StyledContainer = styled.div`
  box-sizing: border-box;
  padding: 0 8.75vw;
  background-color: ${(props) => props.theme.colors.primaryBg};
  width: 100vw;
  height: 100%;
  display: flex;
  gap: 32px;
`;

const StyledLeftSection = styled.div`
  width: 74%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledRightSection = styled.div`
  width: 26%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
