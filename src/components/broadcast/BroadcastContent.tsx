import React, { useState } from "react";
import styled from "styled-components";
import { TbUsers, TbThumbUp } from "react-icons/tb";

import { GreenBtn, LikeBtn } from "../common/button/index";
import VoteModal from "./VoteModal";
import VoteResultModal from "./VoteResultModal";
import { useAppDispatch, useAppSelector } from "../../store";
import { broadcastActions } from "../../store/broadcastSlice";
import { ovActions } from "../../store/ovSlice";

interface IProps {
  title: string;
  detail: string;
  feedList: { id: number; feedName: string; imgSrc: string }[];
  // isVoted: boolean;
  // isLiked: boolean | string;
  // like: () => void;
  // viewers: number;
  // numberOfLikes: number;
}

const BroadcastContent = function (props: IProps) {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.broadcast.isLiked);
  const isVoted = useAppSelector((state) => state.broadcast.isVoted);
  const numberOfLikes = useAppSelector((state) => state.broadcast.numberOfLikes);
  const numberOfViewers = useAppSelector((state) => state.broadcast.numberOfViewers);

  const [isVoteModalOpened, setIsVoteModalOpened] = useState<boolean>(false);
  const [isResultModalOpened, setIsResultModalOpened] = useState<boolean>(false);

  return (
    <StyledContainer>
      {isVoteModalOpened && (
        <VoteModal feedList={props.feedList} closeModal={() => setIsVoteModalOpened(false)} />
      )}
      {isResultModalOpened && (
        <VoteResultModal
          feedName="귀뚜라미"
          imgSrc="https://picsum.photos/200/300"
          closeModal={() => setIsResultModalOpened(false)}
        />
      )}
      <StyledSubTitleContainer>
        <StyledTitle>{props.title}</StyledTitle>
        <StyledButtonContainer>
          {isVoted ? (
            <GreenBtn label="투표하기" type={0} isDisable={true} />
          ) : (
            <GreenBtn
              label="투표하기"
              type={0}
              isDisable={false}
              onClick={() => setIsVoteModalOpened(true)}
            />
          )}
          <LikeBtn
            onClick={() => {
              dispatch(broadcastActions.toggleLike());
              dispatch(ovActions.like(isLiked));
            }}
            isLiked={isLiked}
          />
        </StyledButtonContainer>
      </StyledSubTitleContainer>
      <StyledCountInfoContainer>
        <TbUsers size={20} />
        <StyledSpan>{numberOfViewers} 명</StyledSpan>
        <TbThumbUp size={20} />
        <StyledSpan>{numberOfLikes} 회</StyledSpan>
      </StyledCountInfoContainer>

      <StyledHr />
      <StyledDetail>
        {props.detail}
        <GreenBtn
          label="투표결과"
          type={0}
          isDisable={false}
          onClick={() => setIsResultModalOpened(true)}
        />
      </StyledDetail>
    </StyledContainer>
  );
};

export default BroadcastContent;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.div`
  font: ${(props) => props.theme.fonts.header2};
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledSubTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const StyledCountInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.paragraph};
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledDetail = styled.div`
  font: ${(props) => props.theme.fonts.paragraph};
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledHr = styled.hr`
  width: 100%;
  margin-left: 0;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["100"]};
`;
