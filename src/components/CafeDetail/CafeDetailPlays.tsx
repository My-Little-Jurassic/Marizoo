import React from "react";
import styled from "styled-components";

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
  return <StyledCafeDetailPlays>{playList}</StyledCafeDetailPlays>;
}

export default CafeDetailPlays;

const StyledCafeDetailPlays = styled.section`
  white-space: nowrap;
  overflow: scroll;
  padding-block: 16px;
`;

const StyledCafePlays = styled.div<{ imgSrc: string }>`
  ${({ theme }) => theme.styles.card};
  cursor: pointer;
  width: 240px;
  height: 320px;
  background: linear-gradient(180deg, rgba(2, 0, 36, 0) 40%, rgba(0, 0, 0, 0.7) 100%),
    url(${({ imgSrc }) => imgSrc});
  background-size: cover;
  display: inline-block;
  margin: 16px;
  & div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
  }
  & label {
    white-space: normal;
    padding: 16px;
    word-break: break-all;
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
  }
`;
