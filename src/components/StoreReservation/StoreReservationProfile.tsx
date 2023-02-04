import React from "react";
import styled from "styled-components";

interface IStoreName {
  storename: string;
  address: string;
  tel: string;
}

interface IProps {
  storeInfo: IStoreName;
}

const StoreReservationProfile = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledTitle>{props.storeInfo.storename}</StyledTitle>
      <StyledSpan>{props.storeInfo.address}</StyledSpan>
      <StyledSpan>{props.storeInfo.tel}</StyledSpan>
    </StyledContainer>
  );
};

export default StoreReservationProfile;

const StyledContainer = styled.div`
  width: 100%;
  height: 208px;
  background-color: ${(props) => props.theme.colors.yellow};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
`;

const StyledTitle = styled.span`
  color: black;
  font: ${(props) => props.theme.fonts.header2};
  font-weight: 800;
  margin-bottom: 16px;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.theme.colors.brandColors.basaltGray["900"]};
  font: ${(props) => props.theme.fonts.mainContentBold};
`;
