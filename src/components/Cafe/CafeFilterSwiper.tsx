import React from "react";
import styled from "styled-components";

import CafeFilterSwiperIcon from "./CafeFilterSwiperIcon";

interface IProps {
  animalList: {
    species_id: number;
    animalName: string;
    imgUrl: string;
  }[];
  focusdFilter: number | null;
  setFocusdFilter: (index: number | null) => void;
  searchKeyword: string | null;
  setSearchKeyword: (index: string | null) => void;
  filterKeyword: string | null;
  setFilterKeyword: (index: string | null) => void;
}

function FilterSwiper(props: IProps) {
  // swiper icon 배열 데이터 가공
  const swiperIcons = props.animalList.map((animal, index) => {
    return (
      <div key={`animal-${index}`}>
        <CafeFilterSwiperIcon
          animal={animal}
          focusdFilter={props.focusdFilter}
          setFocusdFilter={props.setFocusdFilter}
          filterKeyword={props.filterKeyword}
          setFilterKeyword={props.setFilterKeyword}
        ></CafeFilterSwiperIcon>
      </div>
    );
  });

  return (
    <StyledSwiper searchKeyword={props.searchKeyword} filterKeyword={props.filterKeyword}>
      <StyledSwiperSlide>{swiperIcons}</StyledSwiperSlide>
    </StyledSwiper>
  );
}

export default FilterSwiper;

const StyledSwiper = styled.div<{ searchKeyword: string | null; filterKeyword: string | null }>`
  width: 100%;
  height: ${(props) =>
    props.searchKeyword === null && props.filterKeyword === null ? "80px" : "0px"};
  filter: ${(props) =>
    props.searchKeyword === null || props.filterKeyword === null ? "opacity(1)" : "opacity(0)"};
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
