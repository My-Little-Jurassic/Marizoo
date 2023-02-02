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
      <StyledCafeProfileImg src={props.cafe.profile_img} />
      <StyledCafeInfoBox>
        <StyledStoreName>{props.cafe.store_name}</StyledStoreName>
        <StyledStoreContent>{props.cafe.address}</StyledStoreContent>
        <StyledStoreContent>{props.cafe.tel}</StyledStoreContent>
      </StyledCafeInfoBox>
    </StyledCafeListContent>
  );
}

export default CafeListContent;

const StyledCafeListContent = styled.div`
  ${(props) => props.theme.styles.card};
  cursor: pointer;
  padding: 8px;
  display: flex;
  ${(props) => props.theme.shadow};
  width: 240px;
  background-color: ${(props) => props.theme.colors.secondaryBg};
  margin: 8px;
`;

const StyledCafeProfileImg = styled.img`
  ${(props) => props.theme.shadow};
  width: 64px;
  height: 64px;
  border-radius: 32px;
  object-fit: cover;
`;

const StyledCafeInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 8px;
`;

const StyledStoreName = styled.h3`
  font: ${(props) => props.theme.fonts.mainContentBold};
`;
const StyledStoreContent = styled.p`
  font: ${(props) => props.theme.fonts.tinyContent};
`;
