import React from "react";
import styled from "styled-components";

interface IProps {
  index: number;
  animalName: string;
  imgUrl: string;
  focusdFilter: number | null;
  setFocusdFilter: (index: number | null) => void;
  searchKeyword: string | null;
  setSearchKeyword: (index: string | null) => void;
}

function CafeFilterSwiperIcon(props: IProps) {
  return (
    <StyledFilterSwiperIcon
      onMouseOver={() => {
        props.setFocusdFilter(props.index);
      }}
      onMouseOut={() => {
        props.setFocusdFilter(null);
      }}
      onClick={() => {
        props.setSearchKeyword(props.animalName);
      }}
      index={props.index}
      imgUrl={props.imgUrl}
      focusdIcon={props.focusdFilter}
    >
      <StyledIcon
        index={props.index}
        imgUrl={props.imgUrl}
        focusdIcon={props.focusdFilter}
      ></StyledIcon>
    </StyledFilterSwiperIcon>
  );
}

export default CafeFilterSwiperIcon;

const StyledFilterSwiperIcon = styled.div<{
  index: number;
  imgUrl: string;
  focusdIcon: number | null;
}>`
  position: relative;
  display: inline-block;
  &:hover {
    z-index: 100;
  }
`;

const StyledIcon = styled.div<{ index: number; imgUrl: string; focusdIcon: number | null }>`
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
    props.focusdIcon !== null && props.index !== props.focusdIcon
      ? "drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.5)"
      : "drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(1)"};
`;
