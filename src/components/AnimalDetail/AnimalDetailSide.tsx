import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { ProfileLarge, ProfileStore } from "../common/profile";

interface IStoreInfo {
  storeId: number;
  storeName: string;
  storeImg: string;
}

interface IStoreAnimal {
  animalName: string;
  classification: string;
  img: string;
  gender: string;
}

interface IProps {
  currentAnimalName: string;
  storeInfo: IStoreInfo;
  storeAnimals: IStoreAnimal[];
}

// 현재 동물과 같은 종인 동물들 받아오기
// api 아직 없음
const sampleSameSpeciesAnimals = [
  {
    animalName: "도",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "male",
  },
  {
    animalName: "레",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "female",
  },
  {
    animalName: "미",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "male",
  },
  {
    animalName: "파",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "female",
  },
];

const AnimalDetailSide = function (props: IProps) {
  const storeAnimals = props.storeAnimals.map((animal) => {
    if (animal.animalName === props.currentAnimalName) {
      return;
    }
    return (
      <Grid key={animal.animalName} item xs={12} sm={6} md={4} lg={12}>
        <ProfileLarge
          animalName={animal.animalName}
          gender={animal.gender}
          classification={animal.classification}
          imgSrc={animal.img}
        />
      </Grid>
    );
  });

  const sameSpeciesAnimals = sampleSameSpeciesAnimals.map((animal) => {
    if (animal.animalName === props.currentAnimalName) {
      return;
    }
    return (
      <Grid key={animal.animalName} item xs={12} sm={6} md={4} lg={12}>
        <ProfileLarge
          animalName={animal.animalName}
          gender={animal.gender}
          classification={animal.classification}
          imgSrc={animal.img}
        />
      </Grid>
    );
  });

  return (
    <StyledContainer>
      <ProfileStore storeName={props.storeInfo.storeName} imgSrc={props.storeInfo.storeImg} />
      <StyledSpan>카페 동물들</StyledSpan>
      <Grid container spacing={2}>
        {storeAnimals}
      </Grid>
      <StyledSpan>같은 종의 동물들</StyledSpan>
      <Grid container spacing={2}>
        {sameSpeciesAnimals}
      </Grid>
    </StyledContainer>
  );
};

export default AnimalDetailSide;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.primaryText};
`;
