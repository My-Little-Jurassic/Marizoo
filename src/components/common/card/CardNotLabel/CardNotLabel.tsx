import React from "react";
import styled from "styled-components";

interface IProps {
  imgSrc: string;
}

const CardNotLabel = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledCardImg src={props.imgSrc} alt="" />
    </StyledContainer>
  );
};

export default CardNotLabel;

const StyledContainer = styled.div`
  width: 100%;
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
