import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

import { GreenBtn } from "../common/button";
import { CardVote } from "../common/card/index";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { broadcastActions } from "../../store/broadcastSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IFeed } from "./type";
import { ovActions } from "../../store/ovSlice";

interface Iprops {
  closeModal: () => void;
}

const VoteModal = function (props: Iprops) {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [feedList, setFeedList] = useState<IFeed[] | null>(null);
  const selectedFeed = useAppSelector((state) => state.broadcast.selectedFeed);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/broadcasts/${params.broadcast_id}/vote`,
    })
      .then((res) => setFeedList(res.data.feeds))
      .catch((err) => console.log(err));
  }, []);

  const selectFeed = function (feed: string) {
    dispatch(broadcastActions.pickFeed(feed));
  };

  const feedCardList = feedList?.map((feed: IFeed) => {
    return (
      <Grid key={feed.name} item xs={12} sm={6} md={6}>
        <CardVote
          title={feed.name}
          imgSrc={feed.img}
          selectedFeed={selectedFeed}
          selectFeed={selectFeed}
        />
      </Grid>
    );
  });

  const vote = function () {
    if (typeof selectedFeed === "string") {
      dispatch(broadcastActions.vote(selectedFeed));
      dispatch(ovActions.vote(selectFeed));
      props.closeModal();
    }
  };

  return (
    <StyledModal>
      {feedCardList && (
        <>
          <StyledBlackDiv onClick={props.closeModal} />
          <StyledContainer>
            <StyledMdClose onClick={props.closeModal}>
              <MdClose size={32} />
            </StyledMdClose>
            <StyledHeader>먹이를 투표해주세요.</StyledHeader>
            <StyledCardContainer>
              <Grid container spacing={4}>
                {feedCardList}
              </Grid>
            </StyledCardContainer>
            <GreenBtn label="투표하기" type={0} isDisable={false} onClick={vote} />
          </StyledContainer>
        </>
      )}
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
  min-height: 440px;
  max-height: 620px;
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
    min-height: 60%;
    max-height: 620px;
  }
  @media screen and (max-width: 555px) {
    min-height: 80%;
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
  width: 90%;
`;
