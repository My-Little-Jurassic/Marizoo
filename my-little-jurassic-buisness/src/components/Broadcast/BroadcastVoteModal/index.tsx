import React from "react";
import styled from "styled-components";
import { IVote } from "../../../types";
import BroadcastVoteTable from "./BroadcastVoteTable";

interface IProps {
  startVote(vote: IVote): void;
  endVote(): void;
}

const BroadcastVoteModal = ({ startVote, endVote }: IProps) => {
  return (
    <StyledDiv>
      <div>
        <h1>먹이 투표 생성</h1>
        <BroadcastVoteTable />
        <div className="btn-area">
          <button>취소</button>
          <button>생성</button>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
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
