import React from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  imgSrc: string;
}

const CardOverlayLabel = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledCardImg src={props.imgSrc} alt="" />
      <StyledCardTitle>{props.title}</StyledCardTitle>
      <StyledCardInnerShadow />
    </StyledContainer>
  );
};

export default CardOverlayLabel;

const StyledContainer = styled.div`
  width: 240px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  ${(props) => props.theme.styles.card}
  cursor: pointer;
`;

const StyledCardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledCardTitle = styled.span`
  position: absolute;
  top: 75%;
  left: 10%;
  color: white;
  z-index: 99;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
`;

const StyledCardInnerShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 64px;
  bottom: 0px;
  background: linear-gradient(to top, rgba(58, 57, 72, 0.72), rgba(58, 57, 72, 0));
`;
