import { Grid } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ProfileLarge, ProfileStore } from "../common/profile";

interface IStoreInfo {
  storeId: number;
  storeName: string;
  storeImg: string;
}

interface IProps {
  currentAnimalName: string;
  storeInfo: IStoreInfo;
}

// /stores/{store_id}/animals
const sampleStoreAnimals = [
  {
    id: 1,
    animalName: "우파파",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "male",
  },
  {
    id: 2,
    animalName: "대파",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "female",
  },
  {
    id: 3,
    animalName: "쪽파",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "male",
  },
  {
    id: 4,
    animalName: "양파",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "female",
  },
];

// 현재 동물과 같은 종인 동물들 받아오기
// api 아직 없음
const sampleSameSpeciesAnimals = [
  {
    id: 1,
    animalName: "도",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "male",
  },
  {
    id: 2,
    animalName: "레",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "female",
  },
  {
    id: 3,
    animalName: "미",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "male",
  },
  {
    id: 4,
    animalName: "파",
    classification: "axolotl",
    img: "https://picsum.photos/200/300",
    gender: "female",
  },
];

const AnimalDetailSide = function (props: IProps) {
  const storeAnimals = sampleStoreAnimals.map((animal) => {
    if (animal.animalName === props.currentAnimalName) {
      return;
    }
    return (
      <Grid key={animal.animalName} item xs={12} sm={6} md={4} lg={12}>
        <NavLink to={`/animal/${animal.id}`} style={{ textDecoration: "none" }}>
          <ProfileLarge
            animalName={animal.animalName}
            gender={animal.gender}
            classification={animal.classification}
            imgSrc={animal.img}
          />
        </NavLink>
      </Grid>
    );
  });

  const sameSpeciesAnimals = sampleSameSpeciesAnimals.map((animal) => {
    if (animal.animalName === props.currentAnimalName) {
      return;
    }
    return (
      <Grid key={animal.animalName} item xs={12} sm={6} md={4} lg={12}>
        <NavLink to={`/animal/${animal.id}`} style={{ textDecoration: "none" }}>
          <ProfileLarge
            animalName={animal.animalName}
            gender={animal.gender}
            classification={animal.classification}
            imgSrc={animal.img}
          />
        </NavLink>
      </Grid>
    );
  });

  return (
    <StyledContainer>
      <NavLink to={`/cafe/${props.storeInfo.storeId}`} style={{ textDecoration: "none" }}>
        <ProfileStore storeName={props.storeInfo.storeName} imgSrc={props.storeInfo.storeImg} />
      </NavLink>
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
