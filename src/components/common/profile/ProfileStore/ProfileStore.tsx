import React from "react";
import styled from "styled-components";

interface IProps {
  storeName: string;
  imgSrc: string;
}

const ProfileStore = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledImgBox>
        <StyledStoreImg src={props.imgSrc} alt="" />
      </StyledImgBox>
      <StyledStoreName>{props.storeName}</StyledStoreName>
    </StyledContainer>
  );
};

export default ProfileStore;

const StyledContainer = styled.div`
  width: 240px;
  min-height: 88px;
  border-radius: 32px;
  background-color: ${(props) => props.theme.colors.yellow};
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.02);
    filter: brightness(0.9);
  }
`;

const StyledImgBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 70%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledStoreImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledStoreName = styled.span`
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.brandColors.basaltGray["800"]};
  width: 70%;
  padding: 16px 0;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
`;
