import React from "react";
import styled from "styled-components";

import { TbPlayerPlay } from "react-icons/tb";

interface IProps {
  title: string;
  thumbnailSrc: string;
  classficationImgList: string[];
}

const CardLabelLarge = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledThumbnailContainer>
        {/* hover하면 나타나는 아이콘 */}
        <StyledTbPlayerPlayBox>
          <TbPlayerPlay size={60} />
        </StyledTbPlayerPlayBox>

        <StyledCardImgBox>
          {/* 썸네일 */}
          <StyledThumbnail src={props.thumbnailSrc} alt="" />

          {/* 종 이미지들 */}
          <StyledSpeciesFirstImg src={props.classficationImgList[0]} alt="" />
          {props.classficationImgList.length > 1 ? (
            <StyledSpeciesSecondImg src={props.classficationImgList[1]} alt="" />
          ) : (
            ""
          )}
          {props.classficationImgList.length > 2 ? (
            <StyledSpeciesRemainCnt>
              +{props.classficationImgList.length - 2}
            </StyledSpeciesRemainCnt>
          ) : (
            ""
          )}
        </StyledCardImgBox>
      </StyledThumbnailContainer>

      {/* 제목 */}
      <StyledCardTitle>{props.title}</StyledCardTitle>
    </StyledContainer>
  );
};

export default CardLabelLarge;

const StyledContainer = styled.div`
  width: 285px;
  height: 247px;
  position: relative;
  filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
`;

const StyledTbPlayerPlayBox = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  display: none;
`;

const StyledCardImgBox = styled.div`
  width: 100%;
  height: 178px;
  overflow: hidden;
`;

const StyledThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 178px;
  &:hover ${StyledTbPlayerPlayBox} {
    display: flex;
  }
  cursor: pointer;
  border-radius: 32px;
  filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  &:hover ${StyledCardImgBox} {
    filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.8);
  }
  &:active ${StyledCardImgBox} {
    filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.7);
  }
`;

const StyledThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
`;

const StyledSpeciesFirstImg = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 70%;
  object-fit: cover;
  top: 112px;
  left: 12px;
  z-index: 3;
  border: 3px solid ${(props) => props.theme.colors.primaryBg};
`;

const StyledSpeciesSecondImg = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 70%;
  object-fit: cover;
  top: 112px;
  left: 44px;
  z-index: 2;
  border: 3px solid ${(props) => props.theme.colors.primaryBg};
`;

const StyledSpeciesRemainCnt = styled.div`
  position: absolute;
  width: 54px;
  height: 54px;
  border-radius: 70%;
  top: 112px;
  left: 76px;
  padding-top: 14px;
  padding-left: 20px;
  z-index: 1;
  box-sizing: border-box;
  border: 3px solid ${(props) => props.theme.colors.primaryBg};
  color: ${(props) => props.theme.colors.primaryBg};
  font: ${(props) => props.theme.fonts.tinyContentBold};
  background-color: ${(props) => props.theme.colors.brandColors.basaltGray["400"]};
`;

const StyledCardTitle = styled.div`
  font: ${(props) => props.theme.fonts.mainContentBold};
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    text-decoration: underline;
  }
`;
