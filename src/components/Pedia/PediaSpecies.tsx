import React from "react";
import styled from "styled-components";
import { ISpecies } from "./type";

interface IProps {
  species: ISpecies;
  selectedSpeciesId: number | null;
  onClick: () => void;
}

const PediaSpecies = (props: IProps): JSX.Element => {
  return (
    <StyledPediaSpecies
      spaciesId={props.species.id}
      selectedSpeciesId={props.selectedSpeciesId}
      onClick={props.onClick}
    >
      <img src={props.species.classificationImg}></img>
      <span>{props.species.classification}</span>
    </StyledPediaSpecies>
  );
};

export default React.memo(PediaSpecies);

const StyledPediaSpecies = styled.div<{ spaciesId: number; selectedSpeciesId: number | null }>`
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
        props.spaciesId === props.selectedSpeciesId
          ? ({ theme }) => theme.colors.yellow
          : ({ theme }) => theme.colors.brandColors.basaltGray[50]}
      4px solid;
    ${(props) =>
      props.spaciesId === props.selectedSpeciesId
        ? "box-shadow: 0px 0px 20px 4px #fff539; filter: brightness(1.4);"
        : "box-shadow: none; filter: none;"}
    border-radius: 96px;
    max-width: 96px;
    & > img {
      width: 100%;
      max-width: 96px;
    }
    & > span {
      display: none;
    }
  }
  @media screen and (min-width: 900px) {
    padding: 8px;
    background-color: ${(props) =>
      props.spaciesId === props.selectedSpeciesId
        ? ({ theme }) => theme.colors.yellow
        : ({ theme }) => theme.colors.brandColors.basaltGray[50]};
    & > img {
      width: 48px;
    }
    & > span {
      margin-left: 16px;
    }
  }
  @media screen and (max-width: 600px) {
    width: 48px;
    height: 48px;
    display: inline-block;
    flex-shrink: 0;
    margin: 8px;
  }
`;
