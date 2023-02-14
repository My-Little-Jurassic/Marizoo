import React from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { GreenBtn } from "../../common/button";

interface Iprops {
  closeModal: () => void;
  receivedBadge: number;
}

const BroadcastBadgeModal = function (props: Iprops) {
  return (
    <StyledModal onClick={props.closeModal}>
      <StyledBlackDiv />
      <SytledIframe src="https://embed.lottiefiles.com/animation/32585" />
      <StyledContainer>
        <StyledHeader2>부화에 성공했어요!</StyledHeader2>
        <StyledImg src={`../../images/badgeEgg${props.receivedBadge}.png`} />
        <NavLink to="/user" style={{ textDecoration: "none" }}>
          <GreenBtn label="확인하러 가기" type={0} isDisable={false} />
        </NavLink>
      </StyledContainer>
    </StyledModal>
  );
};

export default BroadcastBadgeModal;

const StyledModal = styled.div``;

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

const StyledBlackDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 10000;
  animation: ${boxFade} 2s linear;
`;

const SytledIframe = styled.iframe`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: -50px;
  left: 0;
  pointer-events: none;
  z-index: 10002;
`;

const StyledContainer = styled.div`
  width: 646px;
  height: 620px;
  border-radius: 32px;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  z-index: 10001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  box-sizing: border-box;
  padding: 112px 32px;
`;

const StyledHeader2 = styled.span`
  font: ${(props) => props.theme.fonts.header2};
`;

const StyledImg = styled.img`
  width: 240px;
`;
