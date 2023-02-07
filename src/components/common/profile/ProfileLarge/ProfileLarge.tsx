import React from "react";
import styled from "styled-components";

import { TbGenderMale, TbGenderFemale } from "react-icons/tb";

interface IProps {
  animalName: string;
  gender: string;
  classification: string;
  imgSrc: string;
}

const ProfileLarge = function (props: IProps) {
  return (
    <StyledContainer>
      <StyledDetailSpan>더보기</StyledDetailSpan>
      <StyledProfileImg src={props.imgSrc} alt="" />
      <StyledInfo>
        <StyledTitle>{props.animalName}</StyledTitle>
        <StyledFooter>
          <StyledClassification>{props.classification}</StyledClassification>
          <StyledGenderBox gender={props.gender}>
            {props.gender == "male" ? <TbGenderMale size={20} /> : <TbGenderFemale size={20} />}
          </StyledGenderBox>
        </StyledFooter>
      </StyledInfo>
    </StyledContainer>
  );
};

export default ProfileLarge;

const StyledDetailSpan = styled.span`
  display: none;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
`;

const StyledProfileImg = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
`;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 223px;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  transition: 0.1s;
  background: ${(props) => props.theme.colors.secondaryBg};
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    ${StyledDetailSpan} {
      display: block;
    }
    ${StyledProfileImg} {
      filter: brightness(0.8);
    }
  }
  &:active {
    transform: scale(1);
    ${StyledProfileImg} {
      filter: brightness(0.7);
    }
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 24px 0;
  gap: 8px;
`;

const StyledTitle = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledClassification = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: ${(props) => props.theme.fonts.subContent};
  color: ${(props) => props.theme.colors.secondaryText};
`;

const StyledGenderBox = styled.div<{ gender: string }>`
  width: 16px;
  height: 16px;
  color: ${(props) => (props.gender == "male" ? props.theme.colors.blue : props.theme.colors.red)};
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;
