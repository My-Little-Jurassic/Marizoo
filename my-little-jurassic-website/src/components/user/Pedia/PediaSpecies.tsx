import React from "react";
import styled from "styled-components";
import { ISpecies } from "./type";

interface IProps {
  species: ISpecies;
  selectedSpeciesId: number | undefined;
  onClick: () => void;
}

const PediaSpecies = (props: IProps): JSX.Element => {
  return (
    <StyledPediaSpecies
      speciesId={props.species.id}
      speciesImg={props.species.classificationImg}
      selectedSpeciesId={props.selectedSpeciesId}
      onClick={props.onClick}
    >
      <img src={props.species.classificationImg}></img>
      <span>{props.species.classification}</span>
    </StyledPediaSpecies>
  );
};

export default React.memo(PediaSpecies);

const StyledPediaSpecies = styled.div<{
  speciesImg: string;
  speciesId: number;
  selectedSpeciesId: number | undefined;
}>`
  ${({ theme }) => theme.styles.button};
  width: calc(100% - 32px);
  font: ${({ theme }) => theme.fonts.mainContentBold};
  color: ${({ theme }) => theme.colors.brandColors.basaltGray[900]};
  border-radius: 32px;
  margin-block: 16px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 900px) {
    border: ${(props) =>
        props.speciesId === props.selectedSpeciesId
          ? ({ theme }) => theme.colors.yellow
          : ({ theme }) => theme.colors.brandColors.basaltGray[50]}
      4px solid;
    ${(props) =>
      props.speciesId === props.selectedSpeciesId
        ? "box-shadow: 0px 0px 20px 4px #fff539; filter: brightness(1.4);"
        : "box-shadow: none; filter: none;"}
    border-radius: 96px;
    width: 96px;
    height: 96px;
    background-image: url(${(props) => props.speciesImg});
    background-size: cover;
  }
  @media screen and (min-width: 900px) {
    padding: 8px;
    background-color: ${(props) =>
      props.speciesId === props.selectedSpeciesId
        ? ({ theme }) => theme.colors.yellow
        : ({ theme }) => theme.colors.brandColors.basaltGray[50]};
  }
  @media screen and (max-width: 600px) {
    width: 48px;
    height: 48px;
    display: inline-block;
    flex-shrink: 0;
    margin-inline: 8px;
  }
  & > img {
    @media screen and (max-width: 900px) {
      display: none;
    }
    @media screen and (min-width: 900px) {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 32px;
    }
  }
  & > span {
    margin-left: 8px;
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
`;
