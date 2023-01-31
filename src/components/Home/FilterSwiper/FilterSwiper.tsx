import React, { useState } from "react";
import styled from "styled-components";

import FilterSwiperIcon from "./FilterSwiperIcon";

function FilterSwiper() {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  return (
    <StyledSwiper>
      <StyledSwiperTitle>보고싶은 동물을 골라보세요</StyledSwiperTitle>
      <StyledSwiperSlide>
        <FilterSwiperIcon
          iconName="도마뱀"
          imgUrl="https://picsum.photos/200/300"
        ></FilterSwiperIcon>
        <FilterSwiperIcon iconName="거북" imgUrl="https://picsum.photos/200/300"></FilterSwiperIcon>
        <FilterSwiperIcon
          iconName="도롱뇽"
          imgUrl="https://picsum.photos/200/300"
        ></FilterSwiperIcon>
        <FilterSwiperIcon
          iconName="우파루파"
          imgUrl="https://picsum.photos/200/300"
        ></FilterSwiperIcon>
        <FilterSwiperIcon iconName="뱀" imgUrl="https://picsum.photos/200/300"></FilterSwiperIcon>
        <FilterSwiperIcon
          iconName="개구리"
          imgUrl="https://picsum.photos/200/300"
        ></FilterSwiperIcon>
        <FilterSwiperIcon
          iconName="얼룩말"
          imgUrl="https://picsum.photos/200/300"
        ></FilterSwiperIcon>
      </StyledSwiperSlide>
    </StyledSwiper>
  );
}

export default FilterSwiper;

const StyledSwiper = styled.div`
  width: 90%;
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
  margin-bottom: 32px;
`;
