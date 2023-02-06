import React from "react";
import styled from "styled-components";
import {
  AnimalDetailProfile,
  AnimalDetailDescription,
  AnimalDetailSide,
} from "../components/AnimalDetail";

const AnimalDetail = function () {
  // /stores/{animal_id}/animal_detail
  const sampleAnimalProfile = {
    animalInfo: {
      gender: "male",
      animalName: "우파파",
      age: 3,
      character: "까다롭고 예민한 편",
      length: 30,
      weight: 56,
      img: "https://picsum.photos/200/300",
    },
    storeInfo: {
      storeId: 1,
      storeName: "마리쥬 카페",
      storeImg: "https://picsum.photos/200/300",
    },
    speciesInfo: {
      speciesId: 1,
      classification: "도마뱀",
      habitat: "대전",
      lifeSpan: 10,
      info: "아무 설명 아무 설명 아무 설명아무 설명 아무 설명 아무 설명아무 설명아무 설명아무 설명아무 설명아무 설명아무 설명아무 설명 아무 설명",
      classificationImg: "https://picsum.photos/200/300",
    },
    broadcast: {
      id: 1,
      status: "onair",
    },
    feeds: ["고등어 초밥", "귀뚜라미"],
  };

  return (
    <StyledContainer>
      <StyledLeftSide>
        <AnimalDetailSide
          currentAnimalName={sampleAnimalProfile.animalInfo.animalName}
          storeInfo={sampleAnimalProfile.storeInfo}
        />
      </StyledLeftSide>
      <StyledRightSide>
        <AnimalDetailProfile animalProfile={sampleAnimalProfile} />
        <AnimalDetailDescription speciesInfo={sampleAnimalProfile.speciesInfo} />
      </StyledRightSide>
    </StyledContainer>
  );
};

export default AnimalDetail;

const StyledContainer = styled.div`
  padding: 96px 10vw;
  background-color: ${(props) => props.theme.colors.primaryBg};
  display: flex;
  gap: 40px;
  @media screen and (max-width: 1200px) {
    flex-direction: column-reverse;
    gap: 64px;
  }
`;

const StyledLeftSide = styled.div`
  width: 20%;
  height: 100vh;
  min-width: 232px;
  padding: 0 8px;
  box-sizing: border-box;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const StyledRightSide = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
