import React from "react";
import styled from "styled-components";

import FilterSwiperIcon from "./FilterSwiperIcon";

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
      <FilterSwiperIcon
        key={`animal-${index}`}
        index={index}
        animalName={animal.animalName}
        imgUrl={animal.imgUrl}
        focusdFilter={props.focusdFilter}
        setFocusdFilter={props.setFocusdFilter}
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
      ></FilterSwiperIcon>
    );
  });

  return (
    <StyledSwiper searchKeyword={props.searchKeyword}>
      <StyledSwiperTitle>
        {props.focusdFilter === null
          ? "보고싶은 동물을 골라보세요"
          : `"${props.animalList[props.focusdFilter].animalName}" 라이브 보기`}
      </StyledSwiperTitle>
      <StyledSwiperSlide>{swiperIcons}</StyledSwiperSlide>
    </StyledSwiper>
  );
}

export default FilterSwiper;

const StyledSwiper = styled.div<{ searchKeyword: string | null }>`
  width: 90%;
  height: ${(props) => (props.searchKeyword === null ? "160px" : "0px")};
  filter: ${(props) => (props.searchKeyword === null ? "opacity(1)" : "opacity(0)")};
  transition: all 0.5s;
  overflow: hidden;
  max-width: 927px;
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
`;

const StyledSwiperTitle = styled.h4`
  font: ${(props) => props.theme.fonts.header4};
  color: ${(props) => props.theme.colors.primaryText};
  margin-bottom: 16px;
`;

const StyledSwiperSlide = styled.div`
  height: 88px;
  white-space: nowrap;
  overflow: auto;
  display: flex;
  align-items: center;
`;
