import React from "react";
import styled from "styled-components";
import PediaContentGrid from "./PediaContentGrid";

import PediaContentScreen from "./PediaContentScreen";

interface IProps {
  selectedSpeciesId: number | null;
}

const PediaContent = (props: IProps): JSX.Element => {
  return (
    <StyledPediaContent>
      <PediaContentScreen selectedSpeciesId={props.selectedSpeciesId}></PediaContentScreen>
      <PediaContentGrid selectedSpeciesId={props.selectedSpeciesId}></PediaContentGrid>
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
  }
`;
