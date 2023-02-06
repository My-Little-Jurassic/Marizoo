import React from "react";
import styled from "styled-components";
import PediaSpecies from "./PediaSpecies";

const speciesData = [
  {
    spacies_id: 0,
    imgSrc: "./images/SpeciesIconChameleon.svg",
    classification: "카멜레온",
  },
  { spacies_id: 1, imgSrc: "./images/SpeciesIconCobra.svg", classification: "코브라" },
  { spacies_id: 2, imgSrc: "./images/SpeciesIconCrocodile.svg", classification: "악어" },
  {
    spacies_id: 3,
    imgSrc: "./images/SpeciesIconFrilledLizard.svg",
    classification: "목도리도마뱀",
  },
  { spacies_id: 4, imgSrc: "./images/SpeciesIconFrog.svg", classification: "개구리" },
  { spacies_id: 5, imgSrc: "./images/SpeciesIconIguana.svg", classification: "이구아나" },
  { spacies_id: 6, imgSrc: "./images/SpeciesIconLizard.svg", classification: "도마뱀" },
  { spacies_id: 7, imgSrc: "./images/SpeciesIconSalamander.svg", classification: "도롱뇽" },
  { spacies_id: 8, imgSrc: "./images/SpeciesIconSnake.svg", classification: "뱀" },
  { spacies_id: 9, imgSrc: "./images/SpeciesIconTurtle.svg", classification: "거북" },
];

interface IProps {
  selectedSpeciesId: number | null;
  setSelectedSpeciesId: (id: number | null) => void;
}

const PediaSpeciesList = (props: IProps): JSX.Element => {
  const speciesList = speciesData.map((species, index) => (
    <PediaSpecies
      key={`species-${index}`}
      spaciesId={species.spacies_id}
      imgSrc={species.imgSrc}
      speciesName={species.classification}
      selectedSpeciesId={props.selectedSpeciesId}
      onClick={() => {
        props.setSelectedSpeciesId(species.spacies_id);
      }}
    ></PediaSpecies>
  ));

  return <StyledPediaSpeciesListContainer>{speciesList}</StyledPediaSpeciesListContainer>;
};

export default PediaSpeciesList;
const StyledPediaSpeciesListContainer = styled.aside`
  width: 30%;
  height: 100%;
  padding-block: 16px;
  padding-inline: 16px;
  padding-top: 9%;
  box-sizing: border-box;
`;
