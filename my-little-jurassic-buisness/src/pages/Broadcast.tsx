import React from "react";
import styled from "styled-components";
import {
  BroadcastSettingContainer,
  BroadcastStatusViewer,
  BroadcastVoteContainer,
} from "../components/Broadcast";

const Broadcast = () => {
  return (
    <StyledDiv className="Broadcast">
      <div>
        <BroadcastStatusViewer />
        <BroadcastVoteContainer />
      </div>
      <div>
        <BroadcastSettingContainer />
      </div>
      <div className="btn-area">
        <button>방송시작</button>
        <button>방송종료</button>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  width: calc(100vw - 32px);
  min-height: calc(100vh - 40px);

  & > div {
    flex: 1 1 50%;
  }
  & > .btn-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 60px;

    & > button {
      margin: 0 8px;
      width: 240px;
      max-width: 50%;
      margin-bottom: 16px;
      font: ${({ theme }) => theme.fonts.header4};
    }
  }

  @media screen and (max-width: 1000px) {
    & > div {
      flex: 1 1 100%;
    }
    overflow: auto;
    padding: 0;
    width: 100vw;
    height: 100vh;
    margin-bottom: 60px;
  }
`;

export default Broadcast;
