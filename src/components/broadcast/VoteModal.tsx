import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

import { GreenBtn } from "../common/button";
import { CardVote } from "../common/card/index";
import { Grid } from "@mui/material";

interface Iprops {
  feedList: { id: number; feedName: string; imgSrc: string }[];
  closeModal: () => void;
  vote: (selectedFeed: string) => void;
}

const VoteModal = function (props: Iprops) {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);

  // 먹이 고르기
  const selectFeed = useCallback(
    (feed: string) => {
      if (selectedFeed === feed) {
        setSelectedFeed(null);
      } else {
        setSelectedFeed(feed);
      }
    },
    [selectedFeed],
  );

  // 먹이 투표 카드들
  const Cards = props.feedList.map((feed) => {
    return (
      <Grid key={feed.id} item xs={12} sm={12} md={6}>
        <CardVote
          title={feed.feedName}
          imgSrc={feed.imgSrc}
          selectedFeed={selectedFeed}
          selectFeed={selectFeed}
        />
      </Grid>
    );
  });

  // 투표하기
  const vote = useCallback(() => {
    console.log(selectedFeed, typeof selectedFeed);
    if (typeof selectedFeed === "string") {
      props.vote(selectedFeed);
      localStorage.setItem("isVoted", "true");
      props.closeModal();
    }
  }, [selectedFeed]);

  return (
    <StyledModal>
      <StyledBlackDiv onClick={props.closeModal} />
      <StyledContainer>
        <StyledMdClose onClick={props.closeModal}>
          <MdClose size={32} />
        </StyledMdClose>
        <StyledHeader>먹이를 투표해주세요.</StyledHeader>
        <StyledCardContainer>
          <Grid container spacing={4}>
            {Cards}
          </Grid>
        </StyledCardContainer>
        <GreenBtn label="투표하기" type={0} isDisable={false} onClick={vote} />
      </StyledContainer>
    </StyledModal>
  );
};

export default VoteModal;

const StyledModal = styled.div``;

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
  z-index: 102;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 720px;
  min-width: 646px;
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border-radius: 32px;
  color: ${(props) => props.theme.colors.primaryText};
  padding: 24px 8px;
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  background-color: ${(props) => props.theme.colors.primaryBg};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 700px) {
    min-width: 90vw;
    height: 80%;
    max-height: 620px;
  }
  @media screen and (max-width: 555px) {
    height: 80%;
  }
  @media screen and (max-width: 400px) {
    min-width: 320px;
    flex-direction: column;
  }
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
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: center;
  // gap: 20px;
`;
