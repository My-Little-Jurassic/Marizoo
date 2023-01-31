import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  TbHandStop,
  TbHeart,
  TbFlame,
  TbMaximize,
  TbMinimize,
  TbUsers,
  TbThumbUp,
} from "react-icons/tb";

import { GreenBtn, ReactionBtn } from "../common/button";
import VoteModal from "./VoteModal";

interface IProps {
  title: string;
  isMaximized: boolean;
  toggleScreenMode: () => void;
  feedList: { id: number; feedName: string; imgSrc: string }[];
}

const BroadcastScreen = function (props: IProps) {
  const [isBtnShown, setIsBtnShown] = useState<boolean>(false);
  const [isVoteModalOpened, setIsVoteModalOpened] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  useEffect(() => {
    if (isMouseOver) {
      return;
    }
    const timeout = setTimeout(() => {
      setIsBtnShown(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isBtnShown, isMouseOver]);

  const showHeader = function () {
    if (isMouseOver || (!isBtnShown && !isVoteModalOpened)) {
      setIsBtnShown(true);
    }
  };

  return (
    <StyledContainer
      onMouseMove={showHeader}
      isMaximized={props.isMaximized}
      isBtnShown={isBtnShown}
      isVoteModalOpened={isVoteModalOpened}
    >
      {props.isMaximized && (
        <StyledHeader isBtnShown={isBtnShown}>
          <StyledTopShadow />
          <StyledTitle>{props.title}</StyledTitle>
          <StyledCountInfoContainer>
            <TbUsers size={20} />
            <StyledSpan>00 명</StyledSpan>
            <TbThumbUp size={20} />
            <StyledSpan>000 회</StyledSpan>
          </StyledCountInfoContainer>
        </StyledHeader>
      )}
      <StyledReactionContainer
        onMouseOver={() => setIsMouseOver(true)}
        onMouseOut={() => setIsMouseOver(false)}
        isBtnShown={isBtnShown}
        isMaximized={props.isMaximized}
      >
        <ReactionBtn label="쓰다듬기" icon={TbHandStop} color="#F1A604" />
        <ReactionBtn label="예뻐하기" icon={TbHeart} color="#ff38a4" />
        <ReactionBtn label="응원하기" icon={TbFlame} color="#f33041" />
      </StyledReactionContainer>
      {props.isMaximized && (
        <StyledBtnContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
        >
          <GreenBtn
            label="투표하기"
            type={0}
            isDisable={false}
            onClick={() => setIsVoteModalOpened(true)}
          />
        </StyledBtnContainer>
      )}
      {isVoteModalOpened && (
        <VoteModal feedList={props.feedList} closeModal={() => setIsVoteModalOpened(false)} />
      )}
      {!props.isMaximized && (
        <StyledModeChangeIconContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
          onClick={() => {
            document.documentElement.requestFullscreen();
            props.toggleScreenMode();
            setIsMouseOver(false);
          }}
        >
          <TbMaximize size={30} />
        </StyledModeChangeIconContainer>
      )}
      {props.isMaximized && (
        <StyledModeChangeIconContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
          onClick={() => {
            document.exitFullscreen();
            props.toggleScreenMode();
            setIsMouseOver(false);
          }}
        >
          <TbMinimize size={30} />
        </StyledModeChangeIconContainer>
      )}
    </StyledContainer>
  );
};

export default BroadcastScreen;

const StyledContainer = styled.div<{
  isMaximized: boolean;
  isBtnShown: boolean;
  isVoteModalOpened: boolean;
}>`
  width: 100%;
  aspect-ratio: 1654 / 1000;
  border-radius: 32px;
  filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
  background: #999999;
  overflow: hidden;
  ${(props) =>
    props.isMaximized
      ? "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; border-radius: 0;"
      : ""}
  ${(props) =>
    props.isMaximized && !props.isBtnShown && !props.isVoteModalOpened ? "cursor: none;" : ""}
`;

const StyledHeader = styled.div<{ isBtnShown: boolean }>`
  opacity: ${(props) => (props.isBtnShown ? " 1" : "0")};
  transition: all 0.5s;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledTopShadow = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
`;

const StyledTitle = styled.span`
  z-index: 2;
  position: fixed;
  top: 48px;
  left: 48px;
  font: ${(props) => props.theme.fonts.header1};
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
`;

const StyledReactionContainer = styled.div<{ isBtnShown: boolean; isMaximized: boolean }>`
  position: absolute;
  bottom: 24px;
  left: ${(props) => (props.isBtnShown ? "24px" : "-60px")};
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.5s;
`;

const StyledBtnContainer = styled.div<{ isBtnShown: boolean }>`
  position: fixed;
  bottom: ${(props) => (props.isBtnShown ? "24px" : "-60px")};
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.5s;
`;

const StyledModeChangeIconContainer = styled.div<{ isBtnShown: boolean }>`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 32px;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isBtnShown ? "1" : "0")};
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    filter: brightness(0.8);
  }
`;

const StyledCountInfoContainer = styled.div`
  position: fixed;
  top: 108px;
  left: 48px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
`;

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.paragraph};
`;
