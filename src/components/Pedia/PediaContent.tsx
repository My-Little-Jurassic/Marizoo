import React from "react";
import styled from "styled-components";
import PediaContentGrid from "./PediaContentGrid";

import PediaContentScreen from "./PediaContentScreen";
import { ISpecies } from "./type";

interface IProps {
  selectedSpecies: ISpecies | null;
}

const PediaContent = (props: IProps): JSX.Element => {
  return (
    <StyledPediaContent>
      <PediaContentScreen
        selectedSpeciesId={props.selectedSpecies?.id}
        selectedSpeciesImg={props.selectedSpecies?.classificationImg}
      ></PediaContentScreen>
      <PediaContentGrid selectedSpeciesId={props.selectedSpecies?.id}></PediaContentGrid>
    </StyledPediaContent>
  );
};

export default React.memo(PediaContent);

const StyledPediaContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 100%;
  box-sizing: border-box;
  padding: 32px;
  padding-left: 16px;
  @media screen and (max-width: 600px) {
    width: 100%;
    padding-inline: 16px;
    padding-block: 0px;
  }
`;
