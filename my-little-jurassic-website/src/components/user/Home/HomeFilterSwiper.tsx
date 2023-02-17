import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FreeModeSwiper } from "../../common/swiper";

interface IProps {
  speciesList: ISpecies[];
  focusdFilter: number | null;
  setFocusdFilter: (index: number | null) => void;
  searchKeyword: string | null;
  setSearchKeyword: (index: string | null) => void;
}

function HomeFilterSwiper(props: IProps) {
  const [slidesPerView, setSlidesPerView] = useState(window.innerWidth / 100);
  useEffect(() => {
    addEventListener("resize", () => {
      setSlidesPerView(innerWidth / 100);
    });
  }, []);
  // swiper icon 배열 데이터 가공
  const homeAnimalList = props.speciesList.map((species, index) => {
    return (
      <div
        key={`HomeSwiper-${index}`}
        onMouseOver={() => {
          props.setFocusdFilter(index);
        }}
        onMouseOut={() => {
          props.setFocusdFilter(null);
        }}
        onClick={() => {
          props.setSearchKeyword(species.classification);
        }}
      >
        <StyledIcon
          index={index}
          imgUrl={species.classificationIcon}
          focusdIcon={props.focusdFilter}
        ></StyledIcon>
      </div>
    );
  });

  return (
    <StyledHomeFilterSwiper searchKeyword={props.searchKeyword}>
      <h3>
        {props.focusdFilter === null
          ? "보고싶은 동물을 골라보세요"
          : `"${props.speciesList[props.focusdFilter].classification}" 라이브 보기`}
      </h3>
      <FreeModeSwiper
        elementList={homeAnimalList}
        slidesPerView={slidesPerView}
        spaceBetween={2}
      ></FreeModeSwiper>
    </StyledHomeFilterSwiper>
  );
}

export default HomeFilterSwiper;

const StyledHomeFilterSwiper = styled.section<{ searchKeyword: string | null }>`
  width: 100%;
  height: ${(props) => (props.searchKeyword === null ? "160px" : "0px")};
  filter: ${(props) => (props.searchKeyword === null ? "opacity(1)" : "opacity(0)")};
  transition: all 0.5s;
  max-width: 927px;
  & > div {
    padding: 16px;
  }
  & > h3 {
    font: ${(props) => props.theme.fonts.header4};
    color: ${(props) => props.theme.colors.primaryText};
    padding-inline: 16px;
  }
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
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
