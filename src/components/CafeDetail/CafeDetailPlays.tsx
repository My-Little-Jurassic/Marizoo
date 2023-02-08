import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getStorePlayList } from "../../api";
import { FreeModeSwiper } from "../common/swiper";
import { ICafePlay } from "./type";

function CafeDetailPlays(props: { cafeId: number }) {
  const [cafePlayList, setCafePlayList] = useState<ICafePlay[]>();
  const [playSwiper, setPlaySwiper] = useState<JSX.Element[]>();

  useEffect(() => {
    getStorePlayList(String(props.cafeId))
      .then((res) => {
        setCafePlayList(res.data.plays);
      })
      .catch((e) => {
        console.log("카페 동물 정보 요청 실패", e);
      });
  }, []);

  useEffect(() => {
    if (cafePlayList) {
      const newPlaySwiper = cafePlayList.map((play, index) => (
        <Link key={`play-${index}`} to={`/stores/books/${play.id}`}>
          <StyledCafePlays imgSrc={play.img}>
            <div>
              <label>{play.title}</label>
            </div>
          </StyledCafePlays>
        </Link>
      ));
      setPlaySwiper(newPlaySwiper);
    }
  }, [cafePlayList]);

  return (
    <div>
      {playSwiper && (
        <FreeModeSwiper
          elementList={playSwiper}
          slidesPerView={
            window.innerWidth > 680
              ? window.innerWidth > 900
                ? 2.5
                : 3.5
              : window.innerWidth > 530
              ? 2.5
              : 1.5
          }
          spaceBetween={16}
        ></FreeModeSwiper>
      )}
    </div>
  );
}

export default CafeDetailPlays;

const StyledCafePlays = styled.div<{ imgSrc: string }>`
  ${({ theme }) => theme.styles.card};
  cursor: pointer;
  height: 300px;
  background: linear-gradient(180deg, rgba(2, 0, 36, 0) 40%, rgba(0, 0, 0, 0.7) 100%),
    url(${({ imgSrc }) => imgSrc});
  background-size: cover;
  display: inline-block;
  & div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    padding: 24px;
    box-sizing: border-box;
  }
  & label {
    white-space: normal;
    word-break: break-all;
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
  }
`;
