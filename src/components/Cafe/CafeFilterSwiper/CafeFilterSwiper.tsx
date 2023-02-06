import React from "react";
import styled from "styled-components";

import CafeFilterSwiperIcon from "./CafeFilterSwiperIcon";

interface IProps {
  animalList: {
    animalName: string;
    imgUrl: string;
  }[];
  focusdFilter: number | null;
  setFocusdFilter: (index: number | null) => void;
  searchKeyword: string | null;
  setSearchKeyword: (index: string | null) => void;
}

function FilterSwiper(props: IProps) {
  // swiper icon 배열 데이터 가공
  const swiperIcons = props.animalList.map((animal, index) => {
    return (
      <CafeFilterSwiperIcon
        key={`animal-${index}`}
        index={index}
        animalName={animal.animalName}
        imgUrl={animal.imgUrl}
        focusdFilter={props.focusdFilter}
        setFocusdFilter={props.setFocusdFilter}
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
      ></CafeFilterSwiperIcon>
    );
  });

  return (
    <StyledSwiper searchKeyword={props.searchKeyword}>
      <StyledSwiperSlide>{swiperIcons}</StyledSwiperSlide>
    </StyledSwiper>
  );
}

export default FilterSwiper;

const StyledSwiper = styled.div<{ searchKeyword: string | null }>`
  width: 100%;
  height: ${(props) => (props.searchKeyword === null ? "80px" : "0px")};
  filter: ${(props) => (props.searchKeyword === null ? "opacity(1)" : "opacity(0)")};
  transition: all 0.5s;
  overflow: hidden;
  max-width: 927px;
  @media screen and (max-width: 600px) {
    display: none;
  }
  padding-inline: 16px;
`;

const StyledSwiperSlide = styled.div`
  height: 80px;
  white-space: nowrap;
  overflow: auto;
  display: flex;
  align-items: center;
`;
