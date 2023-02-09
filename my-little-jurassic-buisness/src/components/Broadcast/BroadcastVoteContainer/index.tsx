import React, { useMemo } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../store";
import { openModal } from "../../../store/ModalSlice";
import { IVote, TStatus } from "../../../types";

interface IProps {
  vote: IVote;
  status: TStatus;
  finishVote(): void;
}

const BroadcastVoteContainer = ({ vote, status, finishVote }: IProps) => {
  const { winnerFeed, voteStatus, options } = vote;
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(openModal());
  };
  const checkDisable = useMemo(() => {
    return status !== "ONAIR" || voteStatus !== "default";
  }, [status, voteStatus]);

  return (
    <StyledDiv className="BroadcastVoteContainer">
      <h4>
        투표 결과{" "}
        <span>{winnerFeed ? options.find((item) => item.id === winnerFeed)?.name : "-"}</span>
      </h4>
      <button onClick={onClick} disabled={checkDisable}>
        투표 생성
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 16px 16px;
  height: 40px;
  color: ${({ theme }) => theme.colors.primaryText};
  display: flex;
  flex-wrap: wrap;

  & > h4 {
    display: block;
    flex: 1 1 60%;
    font: ${({ theme }) => theme.fonts.header4};
    & > span {
      margin-left: 40px;
      font: ${({ theme }) => theme.fonts.header3};
    }
  }
  & > button {
    flex: 1 1 40%;
    font: ${({ theme }) => theme.fonts.header5};
  }

  @media screen and (max-width: 480px) {
    & > * {
      flex: 1 1 100%;
    }
    & > h4 > span {
      display: block;
    }
  }
`;

export default React.memo(BroadcastVoteContainer);
