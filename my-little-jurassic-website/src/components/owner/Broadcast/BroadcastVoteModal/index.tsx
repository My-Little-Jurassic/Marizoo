import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { selectBroadcastModal, closeBroadcastModal } from "../../../../store/broadcastModalSlice";
import { IFeed, IVote } from "../type";
import BroadcastVoteTable from "./BroadcastVoteTable";

interface IProps {
  startVote(vote: IVote): void;
  animalIdList: number[];
}

const BroadcastVoteModal = ({ startVote, animalIdList }: IProps) => {
  const [feedList, setFeedList] = useState<IFeed[]>([]);
  const modal = useAppSelector(selectBroadcastModal);
  const dispatch = useAppDispatch();

  const updateFeedList = (list: IFeed[]) => {
    setFeedList(list);
  };
  const onStartVote = () => {
    startVote({
      winnerFeed: 0,
      voteStatus: "proceeding",
      options: feedList,
    });
    onClose();
  };
  const onClose = () => {
    dispatch(closeBroadcastModal());
  };

  return (
    <StyledDiv visible={modal.visible}>
      <div>
        <h1>먹이 투표 생성</h1>
        <BroadcastVoteTable animalIdList={animalIdList} setFeedList={updateFeedList} />
        <div className="btn-area">
          <button onClick={onClose}>취소</button>
          <button onClick={onStartVote}>생성</button>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  & > div {
    background-color: ${({ theme }) => theme.colors.primaryBg};
    margin: 8px;
    width: 100%;
    height: 100%;
    max-width: 560px;
    max-height: 480px;
    border-radius: 4px;
    padding: 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > h1 {
      font: ${({ theme }) => theme.fonts.header2};
      color: ${({ theme }) => theme.colors.primaryText};
    }

    & > .btn-area {
      display: flex;
      align-self: flex-end;
      justify-content: space-between;
      width: 70%;
      max-width: 560px;
      & > button {
        flex: 1;
        font: ${({ theme }) => theme.fonts.header4};
        margin-left: 8px;
        padding: 8px 16px;
      }
    }
  }
`;

export default BroadcastVoteModal;
