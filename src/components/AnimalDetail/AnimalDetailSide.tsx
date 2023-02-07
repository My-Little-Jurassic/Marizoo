import { Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileLarge, ProfileStore } from "../common/profile";
import { IStoreInfo, IStoreAnimalInfo } from "./type";

interface IProps {
  currentAnimalName: string;
  storeInfo: IStoreInfo;
}

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
  const [storeAnimalList, setStoreAnimalList] = useState<React.ReactNode[] | null>(null);

  const params = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/stores/${props.storeInfo.storeId}/animals`,
    })
      .then((res) => {
        const tmpStoreAnimalList = res.data.animals.map((animal: IStoreAnimalInfo) => {
          if (animal.name === props.currentAnimalName) {
            return;
          }
          return (
            <Grid key={animal.id} item xs={12} sm={6} md={4} lg={12}>
              <NavLink to={`/animal/${animal.id}`} style={{ textDecoration: "none" }}>
                <ProfileLarge
                  animalName={animal.name}
                  gender={animal.gender}
                  classification={animal.classification}
                  imgSrc={animal.img}
                />
              </NavLink>
            </Grid>
          );
        });
        setStoreAnimalList(tmpStoreAnimalList);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

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
      {storeAnimalList !== null && (
        <>
          <NavLink to={`/cafe/${props.storeInfo.storeId}`} style={{ textDecoration: "none" }}>
            <ProfileStore storeName={props.storeInfo.storeName} imgSrc={props.storeInfo.img} />
          </NavLink>
          <StyledSpan>카페 동물들</StyledSpan>
          <Grid container spacing={2}>
            {storeAnimalList}
          </Grid>
          <StyledSpan>같은 종의 동물들</StyledSpan>
          <Grid container spacing={2}>
            {sameSpeciesAnimals}
          </Grid>
        </>
      )}
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
