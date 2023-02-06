import React, { useState } from "react";
import styled from "styled-components";

interface IFeed {
  id: number;
  name: string;
  img: string;
  numberOfVotes: number;
}

interface IVote {
  title: string;
  result: string;
  status: "DEFAULT" | "RESERVE" | "ONAIR" | "FINISH";
  options: IFeed[];
}

const BroadcastVoteContainer = () => {
  const [vote, setVote] = useState<IVote>({
    title: "",
    result: "귀뚜라미",
    status: "DEFAULT",
    options: [],
  });
  return (
    <StyledDiv className="BroadcastVoteContainer">
      <h4>
        투표 결과 <span>{vote.result}</span>
      </h4>
      <button>투표 생성</button>
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

export default BroadcastVoteContainer;
