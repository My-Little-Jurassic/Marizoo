import React from "react";
import styled from "styled-components";
import { FreeModeSwiper } from "../common/swiper";

const dataList = [
  {
    broadcast_id: "1",
    title: "도롱뇽 먹 이asdfasdfas fasdfasdfas dfasdfas주기",
    img: "https://picsum.photos/200/300",
  },
  {
    broadcast_id: "1",
    title: "도롱뇽 먹이asdfasdfasdfasdfasdfasdfasdfas주기",
    img: "https://picsum.photos/200/300",
  },
  {
    broadcast_id: "1",
    title: "도롱뇽 먹이asdfasdfasdfasdfasdfasdfasdfas주기",
    img: "https://picsum.photos/200/300",
  },
  {
    broadcast_id: "1",
    title: "도롱뇽 먹이asdfasdfasdfasdfasdfasdfasdfas주기",
    img: "https://picsum.photos/200/300",
  },
  {
    broadcast_id: "1",
    title: "도롱뇽 먹이asdfasdfasdfasdfasdfasdfasdfas주기",
    img: "https://picsum.photos/200/300",
  },
];

function CafeDetailPlays() {
  const playList = dataList.map((data, index) => (
    <StyledCafePlays key={`play-${index}`} imgSrc={data.img}>
      <div>
        <label>{data.title}</label>
      </div>
    </StyledCafePlays>
  ));
  return (
    <FreeModeSwiper
      elementList={playList}
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
