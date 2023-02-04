import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { TbCircleCheck, TbX } from "react-icons/tb";

interface IPlayInfo {
  playDateTime: string;
  title: string;
  description: string;
  runningTime: number;
  notice: string;
}

interface IProps {
  playInfo: IPlayInfo;
  numberOfVisitor: number | null;
}

const StoreReservationCompleteModal = function (props: IProps) {
  return (
    <>
      <StyledBlackDiv />
      <StyledContainer>
        <StyledCloseIcon>
          <NavLink to="/">
            <StyledCloseIconColor>
              <TbX size={32} />
            </StyledCloseIconColor>
          </NavLink>
        </StyledCloseIcon>
        <StyledCheckIcon>
          <TbCircleCheck size={64} />
        </StyledCheckIcon>
        <StyledHeader>예약이 완료되었습니다!</StyledHeader>
        <StyledTitle>{props.playInfo.title}</StyledTitle>
        <StyledContentContainer>
          <StyledContent>
            <StyledBold>방문 일시</StyledBold>
            <StyledSpan>{props.playInfo.playDateTime}</StyledSpan>
          </StyledContent>
          <StyledContent>
            <StyledBold>소요 시간</StyledBold>
            <StyledSpan>{props.playInfo.runningTime}H</StyledSpan>
          </StyledContent>
          <StyledContent>
            <StyledBold>방문 유형</StyledBold>
            <StyledSpan>{props.playInfo.description}</StyledSpan>
          </StyledContent>
          <StyledContent>
            <StyledBold>방문자 수</StyledBold>
            <StyledSpan>{props.numberOfVisitor}인</StyledSpan>
          </StyledContent>
        </StyledContentContainer>
      </StyledContainer>
    </>
  );
};

export default StoreReservationCompleteModal;

const StyledBlackDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 101;
`;

const StyledContainer = styled.div`
  width: 640px;
  min-width: 350px;
  height: 640px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 102;
  background-color: ${(props) => props.theme.colors.secondaryBg};
  border-radius: 32px;
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
  @media screen and (max-width: 416px) {
    gap: 24px;
    height: 85%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledCloseIcon = styled.div`
  margin-left: 95%;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const StyledCloseIconColor = styled.div`
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledCheckIcon = styled.div`
  color: ${(props) => props.theme.colors.green};
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.span`
  font: ${(props) => props.theme.fonts.header2};
  color: ${(props) => props.theme.colors.primaryText};
  @media screen and (max-width: 416px) {
    font: ${(props) => props.theme.fonts.header3};
  }
`;

const StyledTitle = styled.span`
  font: ${(props) => props.theme.fonts.header2};
  color: ${(props) => props.theme.colors.green};
  @media screen and (max-width: 416px) {
    font: ${(props) => props.theme.fonts.header3};
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledContent = styled.div`
  color: ${(props) => props.theme.colors.primaryText};
  display: flex;
  align-items: center;
  gap: 32px;
  @media screen and (max-width: 416px) {
    gap: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledBold = styled.span`
  font: ${(props) => props.theme.fonts.mainContentBold};
`;

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContent};
`;
