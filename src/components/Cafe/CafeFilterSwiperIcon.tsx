import React from "react";
import styled from "styled-components";
import { ISpecies } from "./type";

interface IProps {
  animal: ISpecies;
  focusdFilter: number | null;
  setFocusdFilter: (index: number | null) => void;
  filterKeyword: string | null;
  setFilterKeyword: (index: string | null) => void;
}

function CafeFilterSwiperIcon(props: IProps) {
  return (
    <StyledFilterSwiperIcon
      onMouseOver={() => {
        props.setFocusdFilter(props.animal.id);
      }}
      onMouseOut={() => {
        props.setFocusdFilter(null);
      }}
      onClick={() => {
        console.log(props.animal.classification);
        props.setFilterKeyword(props.animal.classification);
      }}
      animal={props.animal}
      focusdIcon={props.focusdFilter}
    >
      <StyledIcon
        animalId={props.animal.id}
        imgUrl={props.animal.classificationImg}
        focusdIcon={props.focusdFilter}
      ></StyledIcon>
    </StyledFilterSwiperIcon>
  );
}

export default CafeFilterSwiperIcon;

const StyledFilterSwiperIcon = styled.div<{
  animal: ISpecies;
  focusdIcon: number | null;
}>`
  position: relative;
  display: inline-block;
  &:hover {
    z-index: 100;
  }
`;

const StyledIcon = styled.div<{ animalId: number; imgUrl: string; focusdIcon: number | null }>`
  ${(props) => props.theme.styles.card}
  cursor: pointer;
  width: 48px;
  height: 48px;
  background: gray;
  border-radius: 48px;
  background-image: url("${(props) => props.imgUrl}");
  background-size: cover;
  transition: all 0.2s;
  margin-right: -16px;
  filter: ${(props) =>
    props.focusdIcon !== null && props.animalId !== props.focusdIcon
      ? "drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.5)"
      : "drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(1)"};
`;
