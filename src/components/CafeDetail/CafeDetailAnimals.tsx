import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FreeModeSwiper } from "../common/swiper";
import { getStoreAinmalList } from "../../api";
import { ICafeAnimal } from "./type";

function CafeDetailAnimals(props: { cafeId: number }) {
  const [cafeAnimalList, setCafeAnimalList] = useState<ICafeAnimal[]>();
  const [animalSwiper, setAnimalSwiper] = useState<JSX.Element[]>();

  useEffect(() => {
    getStoreAinmalList(String(props.cafeId))
      .then((res) => {
        setCafeAnimalList(res.data.animals);
      })
      .catch((e) => {
        console.log("카페 동물 정보 요청 실패", e);
      });
  }, []);

  useEffect(() => {
    if (cafeAnimalList) {
      const newAnimalSwiper = cafeAnimalList.map((animal, index) => (
        <Link
          to={`/animal/${animal.id}`}
          key={`animal-${index}`}
          style={{ textDecoration: "none" }}
        >
          <StyledCafeAnimal imgSrc={animal.img}>
            <div></div>
            <div id="name">{animal.name}</div>
            <div id="classification">{animal.classification}</div>
          </StyledCafeAnimal>
        </Link>
      ));
      setAnimalSwiper(newAnimalSwiper);
    }
  }, [cafeAnimalList]);

  return (
    <div>
      {animalSwiper && (
        <FreeModeSwiper
          elementList={animalSwiper}
          slidesPerView={window.innerWidth > 600 ? 5.5 : 3.5}
          spaceBetween={16}
        ></FreeModeSwiper>
      )}
    </div>
  );
}

export default React.memo(CafeDetailAnimals);

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
