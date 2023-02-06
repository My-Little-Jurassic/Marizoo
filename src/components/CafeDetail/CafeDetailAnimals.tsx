import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FreeModeSwiper } from "../common/swiper";

const data = [
  {
    name: "롱뇽asdfasdfasdfasfasd이",
    classification: "도롱뇽",
    img: "https://picsum.photos/200/300",
    gender: "수컷",
  },
  {
    name: "롱뇽이",
    classification: "도롱뇽",
    img: "https://picsum.photos/200/300",
    gender: "수컷",
  },
  {
    name: "롱뇽이",
    classification: "도롱뇽",
    img: "https://picsum.photos/200/300",
    gender: "수컷",
  },
  {
    name: "롱뇽이",
    classification: "도롱뇽",
    img: "https://picsum.photos/200/300",
    gender: "수컷",
  },
  {
    name: "롱뇽이",
    classification: "도롱뇽",
    img: "https://picsum.photos/200/300",
    gender: "수컷",
  },
];

function CafeDetailAnimals() {
  const AnimalSwiper = data.map((animal, index) => (
    <Link to={`/animal/${animal.name}`} key={`animal-${index}`} style={{ textDecoration: "none" }}>
      <StyledCafeAnimal imgSrc={animal.img}>
        <div></div>
        <div id="name">{animal.name}</div>
        <div id="classification">{animal.classification}</div>
      </StyledCafeAnimal>
    </Link>
  ));

  return (
    <FreeModeSwiper
      elementList={AnimalSwiper}
      slidesPerView={window.innerWidth > 600 ? 5.5 : 3.5}
      spaceBetween={16}
    ></FreeModeSwiper>
  );
}

export default CafeDetailAnimals;

const StyledCafeAnimal = styled.div<{ imgSrc: string }>`
  cursor: pointer;
  transition: all 0.1s;
  box-sizing: border-box;
  & > div:first-child {
    width: 96px;
    height: 96px;
    border-radius: 96px;
    background: url("${({ imgSrc }) => imgSrc}");
    background-size: cover;
    border: none;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;
  }
  & #name {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 8px;
    width: 96px;
    height: 24px;
    font: ${({ theme }) => theme.fonts.subContentBold};
    color: ${({ theme }) => theme.colors.primaryText};
    text-align: center;
  }
  & #classification {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 96px;
    height: 24px;
    font: ${({ theme }) => theme.fonts.tinyContent};
    color: ${({ theme }) => theme.colors.secondaryText};
    text-align: center;
  }
  ${({ theme }) => theme.styles.card};
`;
