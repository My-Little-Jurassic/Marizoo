import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getSameSpeciesAnimals, getSameStoreAnimals } from "../../../api";
import { ProfileLarge, ProfileStore } from "../../common/profile";
import { IStoreInfo, IStoreAnimalInfo } from "./type";

interface IProps {
  currentAnimalName: string;
  speciesName: string;
  speciesId: number;
  storeInfo: IStoreInfo;
}

const AnimalDetailSide = function (props: IProps) {
  const [storeAnimalList, setStoreAnimalList] = useState<React.ReactNode[] | null>(null);
  const [sameSpeciesAnimalList, setSameSpeciesAnimalList] = useState<React.ReactNode[] | null>(
    null,
  );

  useEffect(() => {
    getSameStoreAnimals(props.storeInfo.storeId)
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

    getSameSpeciesAnimals(props.speciesId)
      .then((res) => {
        const tmpSameSpeciesAnimalList = res.data.animals.map((animal: IStoreAnimalInfo) => {
          if (animal.name === props.currentAnimalName) {
            return;
          }
          return (
            <Grid key={animal.id} item xs={12} sm={6} md={4} lg={12}>
              <NavLink to={`/animal/${animal.id}`} style={{ textDecoration: "none" }}>
                <ProfileLarge
                  animalName={animal.name}
                  gender={animal.gender}
                  classification={props.speciesName}
                  imgSrc={animal.img}
                />
              </NavLink>
            </Grid>
          );
        });
        setSameSpeciesAnimalList(tmpSameSpeciesAnimalList);
      })
      .catch((err) => console.log(err));
  }, [props.currentAnimalName]);

  return (
    <StyledContainer>
      <NavLink to={`/cafe/${props.storeInfo.storeId}`} style={{ textDecoration: "none" }}>
        <ProfileStore storeName={props.storeInfo.storeName} imgSrc={props.storeInfo.img} />
      </NavLink>
      {storeAnimalList !== null && (
        <div>
          <StyledSpan>카페 동물들</StyledSpan>
          <Grid container spacing={2}>
            {storeAnimalList}
          </Grid>
        </div>
      )}
      {sameSpeciesAnimalList !== null && (
        <div>
          <StyledSpan>같은 종의 동물들</StyledSpan>
          <Grid container spacing={2}>
            {sameSpeciesAnimalList}
          </Grid>
        </div>
      )}
    </StyledContainer>
  );
};

export default AnimalDetailSide;

const StyledContainer = styled.div`
  width: 100%;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.primaryText};
`;
