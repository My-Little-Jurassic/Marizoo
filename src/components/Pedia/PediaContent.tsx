import React from "react";
import styled from "styled-components";
import PediaContentGrid from "./PediaContentGrid";

import PediaContentScreen from "./PediaContentScreen";

const speciesData = {
  speciesInfo: {
    habitat: "서식지",
    classification: "생물학적 분류체계",
    lifeSpan: "수명",
    info: "설명, 애완동물 장단점",
  },
  feeds: [],
};

interface IProps {
  selectedSpeciesId: number | null;
}

const PediaContent = (props: IProps): JSX.Element => {
  return (
    <StyledPediaContent>
      <PediaContentScreen speciesData={speciesData}></PediaContentScreen>
      <PediaContentGrid></PediaContentGrid>
    </StyledPediaContent>
  );
};

export default PediaContent;
const StyledPediaContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 100%;
  box-sizing: border-box;
  padding: 32px;
  padding-left: 16px;
`;
