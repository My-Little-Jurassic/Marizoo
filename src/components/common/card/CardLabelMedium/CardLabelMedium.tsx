import React from "react";
import styled from "styled-components";

import { TbPlayerPlay } from "react-icons/tb";

interface IProps {
  title: string;
  imgSrc: string;
}

const CardLabelMedium = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledCardImgBox>
        <StyledTbPlayerPlayBox>
          <TbPlayerPlay size={40} />
        </StyledTbPlayerPlayBox>
        <StyledCardImg src={props.imgSrc} alt="" />
      </StyledCardImgBox>
      <StyledCardTitle>{props.title}</StyledCardTitle>
    </StyledContainer>
  );
};

export default CardLabelMedium;

const StyledContainer = styled.div`
  width: 240px;
  height: 200px;
`;

const StyledTbPlayerPlayBox = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  display: none;
`;

const StyledCardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledCardImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 32px;
  filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
  transition: all 0.2s ease-in-out;
  border-radius: 32px;
  overflow: hidden;
  cursor: pointer;
  &:hover ${StyledTbPlayerPlayBox} {
    display: flex;
  }
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
  &:hover ${StyledCardImg} {
    filter: brightness(0.8);
  }
  &:active ${StyledCardImg} {
    filter: brightness(0.7);
  }
`;

const StyledCardTitle = styled.div`
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.primaryText};
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    text-decoration: underline;
  }
`;
