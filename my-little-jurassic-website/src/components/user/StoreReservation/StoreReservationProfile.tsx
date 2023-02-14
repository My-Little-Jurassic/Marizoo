import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IStoreInfo } from "./type";

interface IProps {
  storeInfo: IStoreInfo;
}

const StoreReservationProfile = function (props: IProps) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <StyledContainer onClick={() => navigate(`/cafe/${params.cafe_id}`, { replace: false })}>
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
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(1);
    filter: brightness(0.9);
  }
  @media screen and (max-width: 1024px) {
    height: 100%;
  }
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
