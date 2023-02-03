import React from "react";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import styled from "styled-components";

interface IAnimalInfo {
  gender: string;
  animalName: string;
  age: number;
  character: string;
  length: number;
  weight: number;
  img: string;
}

interface IProps {
  animalProfile: { animalInfo: IAnimalInfo; feeds: string[] };
}

const AnimalDetailProfile = function (props: IProps) {
  const feeds = props.animalProfile.feeds.map((feed, idx) => {
    if (idx == props.animalProfile.feeds.length - 1) {
      return <span key={feed}>{feed} </span>;
    }
    return <span key={feed}>{feed}, </span>;
  });

  return (
    <StyledContainer>
      <StyledLeftSideContainer>
        <StyledImageBox>
          <StyledImage src="https://picsum.photos/200/300" />
        </StyledImageBox>
        <StyledStatusButton>지금 방송중!</StyledStatusButton>
      </StyledLeftSideContainer>
      <StyledRightSideContainer>
        <StyledTextHeader>
          <StyledName>{props.animalProfile.animalInfo.animalName}</StyledName>
          <StyledGender gender={props.animalProfile.animalInfo.gender}>
            {props.animalProfile.animalInfo.gender === "male" ? (
              <TbGenderMale size={32} />
            ) : (
              <TbGenderFemale size={32} />
            )}{" "}
          </StyledGender>
        </StyledTextHeader>
        <StyledTextSpan>나이: {props.animalProfile.animalInfo.age}살</StyledTextSpan>
        <StyledTextSpan>키: {props.animalProfile.animalInfo.length}cm</StyledTextSpan>
        <StyledTextSpan>몸무게: {props.animalProfile.animalInfo.weight}g</StyledTextSpan>
        <StyledTextSpan>좋아하는 먹이: {feeds}</StyledTextSpan>
        <StyledTextSpan>성격: {props.animalProfile.animalInfo.character}</StyledTextSpan>
      </StyledRightSideContainer>
    </StyledContainer>
  );
};

export default AnimalDetailProfile;

const StyledContainer = styled.div`
  width: 100%;
  height: 292px;
  display: flex;
  gap: 24px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const StyledLeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 26%;
  min-width: 212px;
`;

const StyledImageBox = styled.div`
  width: 100%;
  height: 212px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: crop;
`;

const StyledStatusButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 32px;
  font: ${(props) => props.theme.fonts.header3};
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  background-color: ${(props) => props.theme.colors.red};
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  cursor: pointer;
`;

const StyledRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24px 32px;
  gap: 8px;
  width: 74%;
  min-width: 448px;
  height: 284px;
  border-radius: 32px;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  background-color: ${(props) => props.theme.colors.secondaryBg};
`;

const StyledTextHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font: ${(props) => props.theme.fonts.header2};
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledName = styled.span``;

const StyledGender = styled.span<{ gender: string }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.gender == "male" ? props.theme.colors.blue : props.theme.colors.red)};
`;

const StyledTextSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContent};
  color: ${(props) => props.theme.colors.primaryText};
`;
