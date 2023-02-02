import React, { useState } from "react";
import styled from "styled-components";

import { TbChevronUp, TbChevronDown } from "react-icons/tb";
import CafeListContent from "../CafeListContent/CafeListContent";

interface IProps {
  cafeData: {
    animal_store_id: number;
    store_name: string;
    discription: string;
    address: string;
    tel: string;
    profile_img: string;
    lat: number;
    lng: number;
  }[];
  focusedCafe: number | null;
  setFocusedCafe: (id: number | null) => void;
}

function CafeList(props: IProps) {
  // 모바일 카페 리스트 전체화면 여부F
  const [isListMax, setIsListMax] = useState(false);

  // 카페 리스트에 맞는 목록 컨텐츠 리스트 생성
  const CafeList = props.cafeData.map((cafe, index) => {
    return (
      <CafeListContent
        key={`cafe-${index}`}
        cafe={cafe}
        focusedCafe={props.focusedCafe}
        setFocusedCafe={props.setFocusedCafe}
      ></CafeListContent>
    );
  });

  return (
    <StyledCafeList isListMax={isListMax}>
      <StyledMaxBar
        onClick={() => {
          setIsListMax(!isListMax);
        }}
      >
        {isListMax ? <TbChevronDown size={32} /> : <TbChevronUp size={32} />}
      </StyledMaxBar>
      {CafeList}
    </StyledCafeList>
  );
}

export default React.memo(CafeList);

const StyledCafeList = styled.aside<{ isListMax: boolean }>`
  z-index: 50;
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: all 0.5s;
  @media screen and (max-width: 600px) {
    height: ${(props) => (props.isListMax ? "100%" : "40%")};
    width: 100vw;
    bottom: 0px;
    border-radius: 32px 32px 0px 0px;
    background-color: ${(props) => props.theme.colors.secondaryBg};
  }
  @media screen and (min-width: 600px) {
    z-index: 50;
    position: absolute;
    top: 0px;
    right: 0px;
    min-width: 260px;
    width: 30vw;
    max-height: 100%;
    padding: 8px;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledMaxBar = styled.div`
  @media screen and (max-width: 600px) {
    cursor: pointer;
    z-index: 60;
    position: sticky;
    top: 0px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.secondaryBg};
  }
  @media screen and (min-width: 600px) {
    display: none;
  }
`;
