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

function HomeFilterSwiperIcon(props: IProps) {
  return (
    <StyledHomeFilterSwiperIcon
      onMouseOver={() => {
        props.setFocusdFilter(props.index);
      }}
      onMouseOut={() => {
        props.setFocusdFilter(null);
      }}
      onClick={() => {
        props.setSearchKeyword(props.animalName);
      }}
    >
      <StyledIcon
        index={props.index}
        imgUrl={props.imgUrl}
        focusdIcon={props.focusdFilter}
      ></StyledIcon>
    </StyledHomeFilterSwiperIcon>
  );
}

export default HomeFilterSwiperIcon;

const StyledHomeFilterSwiperIcon = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledIcon = styled.div<{ index: number; imgUrl: string; focusdIcon: number | null }>`
  ${(props) => props.theme.styles.card}
  cursor: pointer;
  width: 64px;
  height: 64px;
  background: gray;
  border-radius: 64px;
  background-image: url("${(props) => props.imgUrl}");
  background-size: cover;
  transition: all 0.2s;
  margin-inline: 8px;
  filter: ${(props) =>
    props.focusdIcon !== null && props.index !== props.focusdIcon
      ? "drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.5)"
      : "drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(1)"};
`;
