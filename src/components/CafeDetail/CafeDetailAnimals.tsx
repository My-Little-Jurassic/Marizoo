import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
];

function CafeDetailAnimals() {
  const AnimalSwiper = data.map((animal, index) => (
    <Link to={"/"} key={`animal-${index}`} style={{ textDecoration: "none" }}>
      <StyledCafeAnimal imgSrc={animal.img}>
        <button></button>
        <div id="name">{animal.name}</div>
        <div id="classification">{animal.classification}</div>
      </StyledCafeAnimal>
    </Link>
  ));

  return <StyledCafeDetailAnimals>{AnimalSwiper}</StyledCafeDetailAnimals>;
}

export default CafeDetailAnimals;

const StyledCafeDetailAnimals = styled.section`
  white-space: nowrap;
  overflow: scroll;
  display: flex;
  align-items: center;
  padding-block: 24px;
`;

const StyledCafeAnimal = styled.div<{ imgSrc: string }>`
  display: inline-block;
  padding-inline: 16px;
  & button {
    width: 128px;
    height: 128px;
    border-radius: 64px;
    background: url("${({ imgSrc }) => imgSrc}");
    background-size: cover;
    border: none;
    cursor: pointer;
  }
  & #name {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 8px;
    width: 128px;
    height: 24px;
    font: ${({ theme }) => theme.fonts.subContentBold};
    color: ${({ theme }) => theme.colors.primaryText};
    text-align: center;
  }
  & #classification {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 128px;
    height: 24px;
    font: ${({ theme }) => theme.fonts.tinyContent};
    color: ${({ theme }) => theme.colors.secondaryText};
    text-align: center;
  }
  ${({ theme }) => theme.styles.card});
  cursor: pointer;
  transition: all 0.1s;
`;
