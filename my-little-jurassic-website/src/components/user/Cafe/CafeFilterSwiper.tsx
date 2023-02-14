import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSpeciesList } from "../../api";

import CafeFilterSwiperIcon from "./CafeFilterSwiperIcon";
import { ISpecies } from "./type";

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
  const [speciesDataList, setSpeciesDataList] = useState<ISpecies[] | null>(null);
  const [speciesList, setSpeciesList] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    getSpeciesList()
      .then((res) => {
        setSpeciesDataList(res.data.species);
      })
      .catch((e) => {
        console.log("종 목록 로드 실패", e);
      });
  }, []);

  useEffect(() => {
    if (speciesDataList) {
      const newSwiperIcons = speciesDataList.map((animal, index) => {
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
      setSpeciesList(newSwiperIcons);
    }
  }, [speciesDataList]);

  return (
    <StyledSwiper searchKeyword={props.searchKeyword} filterKeyword={props.filterKeyword}>
      <StyledSwiperSlide>{speciesList}</StyledSwiperSlide>
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
