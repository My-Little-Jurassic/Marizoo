import React from "react";
import styled from "styled-components";

import CafeListContent from "../CafeListContent/CafeListContent";

interface IProps {
  cafeData: {
    store_name: string;
    discription: string;
    address: string;
    tel: string;
    profile_img: string;
    lat: number;
    lng: number;
  }[];
}

function CafeList(props: IProps) {
  const CafeList = props.cafeData.map((cafe, index) => {
    return <CafeListContent key={`cafe-${index}`} cafe={cafe}></CafeListContent>;
  });

  return <StyledCafeList>{CafeList}</StyledCafeList>;
}

export default CafeList;

const StyledCafeList = styled.aside`
  z-index: 1;
  position: absolute;
  top: 0px;
  right: 0px;
  max-height: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
