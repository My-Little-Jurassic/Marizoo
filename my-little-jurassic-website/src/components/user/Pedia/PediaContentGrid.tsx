import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { ProfileLarge } from "../../common/profile";
import { IAinmal } from "./type";
import { getSpeciesAnimalList } from "../../../api/pedia";
import { Link } from "react-router-dom";

interface IProps {
  selectedSpeciesId: number | undefined;
}

const PediaContentGrid = (props: IProps): JSX.Element => {
  const [speciesAnimalDataList, setSpeciesAnimalDataList] = useState<IAinmal[] | null>(null);
  const [speciesAnimalList, setSpeciesAnimalList] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    if (props.selectedSpeciesId) {
      getSpeciesAnimalList(props.selectedSpeciesId)
        .then((res) => {
          setSpeciesAnimalDataList(res.data.animals);
        })
        .catch((e) => {
          console.log("종 동물 목록 로드 실패", e);
        });
    }
  }, [props.selectedSpeciesId]);

  useEffect(() => {
    if (speciesAnimalDataList) {
      const newSpeciesAnimalList = speciesAnimalDataList?.map((animal: IAinmal, index: number) => (
        <Grid key={`speciesAnimal-${index}`} item xs={12} sm={6} md={4}>
          <Link to={`/animal/${animal.id}`} style={{ textDecoration: "none" }}>
            <div id="gridItem">
              <img src={animal.img}></img>
              <p>{animal.name}</p>
            </div>
          </Link>
        </Grid>
      ));
      setSpeciesAnimalList(newSpeciesAnimalList);
    }
  }, [speciesAnimalDataList]);

  return (
    <StyledPediaContentGrid>
      <Grid container spacing={2}>
        {speciesAnimalList}
      </Grid>
    </StyledPediaContentGrid>
  );
};

export default React.memo(PediaContentGrid);

const StyledPediaContentGrid = styled.section`
  box-sizing: border-box;
  width: 100%;
  border-radius: 32px;
  margin-block: 32px;
  padding: 32px;
  min-height: 150px;
  border: ${({ theme }) => theme.colors.brandColors.basaltGray[900]} 8px solid;
  box-shadow: rgb(41, 171, 69) 3px 3px 6px 0px inset,
    rgba(195, 195, 195, 0.5) -3px -3px 6px 1px inset;
  background-color: ${({ theme }) => theme.colors.brandColors.jurassicGreen[300]};
  & div > div {
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
    font: ${({ theme }) => theme.fonts.subContentBold};
    filter: grayscale(100) contrast(1.05);
    background: none;
    mix-blend-mode: darken;
    box-sizing: border-box;
  }
  & #gridItem {
    display: flex;
    justify-content: start;
    padding: 8px;
    width: 100%;
    border-radius: 8px;
    box-sizing: border-box;
    & > img {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      flex-shrink: 0;
    }
    & > p {
      margin: 8px;
      box-sizing: border-box;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
      background: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
      mix-blend-mode: darken;
    }
  }
`;
