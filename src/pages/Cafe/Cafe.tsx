import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { HomeNav } from "../../components/common/navbar";
import { CafeList, CafeMap } from "../../components/Cafe";

function Cafe() {
  // 파충류카페 더미데이터
  const cafeData = [
    {
      animal_store_id: 0,
      store_name: "마리쥬 파충류카페",
      discription: "설명 어쩌구 저쩌구",
      address: "천안시 어딘가",
      tel: "000-000-0000",
      profile_img: "https://picsum.photos/200/300",
      lat: 36.818022,
      lng: 127.123231,
    },
    {
      animal_store_id: 1,
      store_name: "민우네집",
      discription: "설명 어쩌구 저쩌구",
      address: "롯데타워 352층",
      tel: "000-000-0000",
      profile_img: "https://picsum.photos/200/300",
      lat: 37.5126,
      lng: 127.102544,
    },
    {
      animal_store_id: 2,
      store_name: "우파파루파파",
      discription: "설명 어쩌구 저쩌구",
      address: "어딘가",
      tel: "000-000-0000",
      profile_img: "https://picsum.photos/200/300",
      lat: 35.450879,
      lng: 127.56994,
    },
    {
      animal_store_id: 3,
      store_name: "렙타일샵",
      discription: "설명 어쩌구 저쩌구",
      address: "제주도 어딘가",
      tel: "000-000-0000",
      profile_img: "https://picsum.photos/200/300",
      lat: 33.451393,
      lng: 126.570738,
    },
  ];

  return (
    <StyledCafe>
      <HomeNav />
      <StyledCafeMain>
        <CafeMap cafeData={cafeData} />
        <CafeList cafeData={cafeData} />
      </StyledCafeMain>
    </StyledCafe>
  );
}

export default Cafe;

const StyledCafe = styled.div`
  width: 100%
  height: 100%
`;

const StyledCafeMain = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - 142px);
  background-color: black;
`;
