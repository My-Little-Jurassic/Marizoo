import React, { useEffect, useState } from "react";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AnimalDetailRedBtn from "./AnimalDetailRedBtn";
import { IAnimalInfo, IBroadcastInfo, IFeed } from "./type";

interface IProps {
  animalInfo: IAnimalInfo;
  broadcastInfo: IBroadcastInfo;
  feedList: IFeed[];
}

const AnimalDetailProfile = function (props: IProps) {
  const [statusBtn, setStatusBtn] = useState<React.ReactNode | null>(null);

  const feeds = props.feedList.map((feed, idx) => {
    if (idx == props.feedList.length - 1) {
      return <span key={feed.name}>{feed.name} </span>;
    }
    return <span key={feed.name}>{feed.name}, </span>;
  });

  useEffect(() => {
    if (!props.broadcastInfo.onAir) {
      setStatusBtn(<AnimalDetailRedBtn label="지금은 쉬고 있어요" type={1} isDisable={true} />);
    } else {
      setStatusBtn(
        <NavLink
          to={`/broadcast/${props.broadcastInfo.broadcastId}/${props.broadcastInfo.sessionId}`}
          style={{ textDecoration: "none" }}
        >
          <AnimalDetailRedBtn label="지금 방송중!" type={0} isDisable={false} />
        </NavLink>,
      );
    }
  }, []);

  return (
    <StyledContainer>
      <StyledLeftSideContainer>
        <StyledImageBox>
          <StyledImage src={props.animalInfo.img} />
        </StyledImageBox>
        {statusBtn}
      </StyledLeftSideContainer>
      <StyledRightSideContainer>
        <StyledTextHeader>
          <StyledName>{props.animalInfo.name}</StyledName>
          <StyledGender gender={props.animalInfo.gender}>
            {props.animalInfo.gender === "MALE" ? (
              <TbGenderMale size={32} />
            ) : (
              <TbGenderFemale size={32} />
            )}{" "}
          </StyledGender>
        </StyledTextHeader>
        <StyledTextSpan>나이: {props.animalInfo.age}살</StyledTextSpan>
        <StyledTextSpan>키: {props.animalInfo.length}cm</StyledTextSpan>
        <StyledTextSpan>몸무게: {props.animalInfo.weight}g</StyledTextSpan>
        <StyledTextSpan>좋아하는 먹이: {feeds}</StyledTextSpan>
        <StyledTextSpan>특징: {props.animalInfo.feature}</StyledTextSpan>
      </StyledRightSideContainer>
    </StyledContainer>
  );
};

export default AnimalDetailProfile;

const StyledContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  /* max-height: 280px; */
  display: flex;
  gap: 24px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    max-height: 100%;
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

const StyledStatusButton = styled.button<{ status: string }>`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 32px;
  font: ${(props) => props.theme.fonts.header3};
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  cursor: pointer;
  ${(props) =>
    props.status === "onAir"
      ? `background: ${props.theme.colors.red}
      &:hover {

      }`
      : `background: ${props.theme.colors.green}`}
`;

const StyledRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24px 32px;
  gap: 8px;
  width: 74%;
  min-width: 448px;
  height: 100%;
  border-radius: 32px;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  background-color: ${(props) => props.theme.colors.secondaryBg};
  @media screen and (max-width: 800px) {
    min-width: 300px;
    width: 100%;
  }
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
  color: ${(props) => (props.gender == "MALE" ? props.theme.colors.blue : props.theme.colors.red)};
`;

const StyledTextSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContent};
  color: ${(props) => props.theme.colors.primaryText};
`;
