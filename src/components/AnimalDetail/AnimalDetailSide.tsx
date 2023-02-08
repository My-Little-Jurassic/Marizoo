import { Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileLarge, ProfileStore } from "../common/profile";
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

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/species/${props.speciesId}`,
    })
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
  }, [params.animal_id]);

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
            {sameSpeciesAnimalList}
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
