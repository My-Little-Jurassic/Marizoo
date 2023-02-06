import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import {
  BroadcastSettingContainer,
  BroadcastStatusViewer,
  BroadcastVoteContainer,
} from "../components/Broadcast";
import { IBroadcastSetting } from "../types";
import { IBroadcastStatus } from "../types/Broadcast";

const Broadcast = () => {
  const [broadcastSetting, setBroadcastSetting] = useState<IBroadcastSetting>({
    id: 0,
    title: "",
    description: "",
    thumbnail: "",
    animals: [],
    videoDevice: null,
    audioDevice: null,
  });
  const [broadcastStatus, setBroadcastStatus] = useState<IBroadcastStatus>({
    sessionId: "",
    viewers: 0,
    likes: 0,
    vote: null,
    status: "DEFAULT",
  });

  const { id, title } = broadcastSetting;
  const { viewers, likes, status } = broadcastStatus;
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <StyledDiv className="Broadcast">
      <div>
        <BroadcastStatusViewer ref={videoRef} status={status} viewers={viewers} likes={likes} />
        <BroadcastVoteContainer />
      </div>
      <div>
        <BroadcastSettingContainer initSetting={broadcastSetting} />
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
    flex: 1 1 100%;
  }
  & > div:first-child {
    flex: 1 1 65%;
  }
  & > div:nth-child(2) {
    flex: 1 1 35%;
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
