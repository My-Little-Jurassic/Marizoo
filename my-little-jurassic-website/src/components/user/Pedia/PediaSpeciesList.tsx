import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpeciesList } from "../../../api/pedia";
import PediaSpecies from "./PediaSpecies";
import { ISpecies } from "./type";

interface IProps {
  selectedSpecies: ISpecies | null;
  setSelectedSpecies: (species: ISpecies | null) => void;
}

const PediaSpeciesList = (props: IProps): JSX.Element => {
  const [speciesDataList, setSpeciesDataList] = useState<ISpecies[] | null>(null);
  const [speciesList, setSpeciesList] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    getSpeciesList()
      .then((res) => {
        setSpeciesDataList(res.data.species);
      })
      .catch((e) => {
        console.log("종 목록 로드 실패", e);
      });
  }, [props.selectedSpecies]);

  useEffect(() => {
    if (speciesDataList) {
      const newSpeciesList = speciesDataList.map((species: ISpecies, index: number) => (
        <PediaSpecies
          key={`species-${index}`}
          species={species}
          selectedSpeciesId={props.selectedSpecies?.id}
          onClick={() => {
            props.setSelectedSpecies(species);
          }}
        ></PediaSpecies>
      ));
      setSpeciesList(newSpeciesList);
    }
  }, [speciesDataList]);

  return <StyledPediaSpeciesListContainer>{speciesList}</StyledPediaSpeciesListContainer>;
};

export default React.memo(PediaSpeciesList);

const StyledPediaSpeciesListContainer = styled.aside`
  width: 30%;
  height: 100%;
  padding-block: 16px;
  padding-inline: 16px;
  padding-top: 9%;
  box-sizing: border-box;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    padding-inline: 16px;
    padding-block: 0px;
    margin-block: 48px 16px;
  }
`;
