import React from "react";
import styled from "styled-components";

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
}

function CafeList(props: IProps) {
  // 카페 리스트에 맞는 목록 컨텐츠 리스트 생성
  const CafeList = props.cafeData.map((cafe, index) => {
    return (
      <CafeListContent
        key={`cafe-${index}`}
        cafe={cafe}
        focusedCafe={props.focusedCafe}
      ></CafeListContent>
    );
  });

  return <StyledCafeList>{CafeList}</StyledCafeList>;
}

export default React.memo(CafeList);

const StyledCafeList = styled.aside`
  z-index: 50;
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 600px) {
    padding-top: 10px;
    height: 40%;
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
    width: 260px;
    max-height: 100%;
    padding: 8px;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
