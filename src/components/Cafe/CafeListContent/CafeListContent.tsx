import React from "react";
import styled from "styled-components";

interface IProps {
  cafe: {
    store_name: string;
    discription: string;
    address: string;
    tel: string;
    profile_img: string;
    lat: number;
    lng: number;
  };
}

function CafeListContent(props: IProps) {
  return (
    <StyledCafeListContent>
      <StyledCafeProfileImg src={props.cafe.profile_img}></StyledCafeProfileImg>
      {props.cafe.store_name}
      {props.cafe.address}
      {props.cafe.tel}
    </StyledCafeListContent>
  );
}

export default CafeListContent;

const StyledCafeListContent = styled.div`
  padding: 8px;
`;

const StyledCafeProfileImg = styled.img`
  ${(props) => props.theme.shadow};
  width: 64px;
  height: 64px;
  border-radius: 32px;
  object-fit: cover;
`;
