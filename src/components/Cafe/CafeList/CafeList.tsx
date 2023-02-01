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

const StyledCafeList = styled.div`
  ${(props) => props.theme.shadow};
  z-index: 1;
  position: absolute;
  top: 16px;
  right: 16px;
  width: 240px;
  max-height: calc(100% - 32px);
  border-radius: 32px;
  background-color: yellow;
  overflow: scroll;
  background-color: ${(props) => props.theme.colors.secondaryBg};
`;
