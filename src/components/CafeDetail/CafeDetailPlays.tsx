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
        <Link key={`play-${index}`} to={`/reservation/${props.cafeId}/${play.id}`}>
          <StyledCafePlays imgSrc={play.img}>
            <div>
              <label>{play.title}</label>
              <label>{play.description}</label>
              <label>{play.playDateTime.substring(0, 10)}</label>
              <label>{play.playDateTime.substring(11, 16)}</label>
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

export default React.memo(CafeDetailPlays);

const StyledCafePlays = styled.div<{ imgSrc: string }>`
  ${({ theme }) => theme.styles.card};
  cursor: pointer;
  width: 100%;
  height: 300px;
  background: linear-gradient(180deg, rgba(2, 0, 36, 0) 40%, rgba(0, 0, 0, 0.7) 100%),
    url(${({ imgSrc }) => imgSrc});
  background-size: cover;
  display: inline-block;
  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 50%),
      url(${({ imgSrc }) => imgSrc});
    background-size: cover;
    & div {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    & div :nth-child(1) {
      display: none;
    }
    & div :nth-child(2),
    & div :nth-child(3),
    & div :nth-child(4) {
      display: inline-block;
      pointer-events: none;
    }
  }
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    padding: 24px;
    box-sizing: border-box;
  }
  & div :nth-child(1) {
    white-space: normal;
    word-break: break-all;
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
    cursor: pointer;
  }
  & div :nth-child(2),
  & div :nth-child(3),
  & div :nth-child(4) {
    display: none;
    white-space: normal;
    word-break: break-all;
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
    cursor: pointer;
  }
`;
