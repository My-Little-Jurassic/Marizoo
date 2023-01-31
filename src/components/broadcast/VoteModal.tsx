import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

import { GreenBtn } from "../common/button";
import { CardVote } from "../common/card/index";

interface Iprops {
  feedList: { id: number; feedName: string; imgSrc: string }[];
  closeModal: () => void;
}

const VoteModal = function (props: Iprops) {
  const Cards = props.feedList.map((feed) => {
    return <CardVote key={feed.id} title={feed.feedName} imgSrc={feed.imgSrc} />;
  });

  return (
    <StyledModal>
      <StyledBlackDiv onClick={props.closeModal} />
      <StyledContainer>
        <StyledMdClose onClick={props.closeModal}>
          <MdClose size={32} />
        </StyledMdClose>
        <StyledHeader>먹이를 투표해주세요.</StyledHeader>
        <StyledCardContainer>{Cards}</StyledCardContainer>
        <GreenBtn label="투표하기" type={0} isDisable={false} onClick={props.closeModal} />
      </StyledContainer>
    </StyledModal>
  );
};

export default VoteModal;

const StyledModal = styled.div``;

const StyledBlackDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 2;
`;

const StyledContainer = styled.div`
  z-index: 3;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 646px;
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border-radius: 32px;
  color: ${(props) => props.theme.colors.primaryText};
  padding: 24px 0;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  background-color: ${(props) => props.theme.colors.primaryBg};
`;

const StyledMdClose = styled.div`
  margin-left: 85%;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const StyledHeader = styled.span`
  font: ${(props) => props.theme.fonts.header2};
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;
