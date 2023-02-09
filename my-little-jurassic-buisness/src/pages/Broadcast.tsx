import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import {
  BroadcastSettingContainer,
  BroadcastStatusViewer,
  BroadcastVoteContainer,
} from "../components/Broadcast";
import { IBroadcastSetting } from "../types";
import { IBroadcastStatus, IVote } from "../types/Broadcast";
import { postBroadcast } from "../api";
import BroadcastVoteModal from "../components/Broadcast/BroadcastVoteModal";

const Broadcast = () => {
  // 방송설정 STATE
  const [broadcastSetting, setBroadcastSetting] = useState<IBroadcastSetting>({
    id: "1",
    title: "",
    description: "",
    thumbnail: null,
    animalIdList: [],
    videoDevice: null,
    audioDevice: null,
  });
  // 방송상태 STATE
  const [broadcastStatus, setBroadcastStatus] = useState<IBroadcastStatus>({
    sessionId: "",
    pk: 0,
    viewers: 0,
    likes: 0,
    vote: { options: [], voteStatus: "default", winnerFeed: 0 },
    status: "DEFAULT",
  });
  const { animalIdList } = broadcastSetting;
  const { viewers, likes, status, vote } = broadcastStatus;
  const videoRef = useRef<HTMLVideoElement>(null);

  // 방송시작 함수
  const startBroadcast = (setting: IBroadcastSetting) => {
    const { id, title, description, animalIdList, thumbnail } = setting;

    const formData = new FormData();
    const broadcastInfo = JSON.stringify({
      title,
      description,
      animalIdList,
      animalStoreId: id,
    });
    formData.append("broadcastInfo", new Blob([broadcastInfo], { type: "application/json" }));
    if (thumbnail) formData.append("img", thumbnail);

    console.dir("formData:", formData);
    postBroadcast(formData).then((res) => {
      console.log("res:", res);
      setBroadcastStatus({ ...broadcastStatus, sessionId: "123", pk: 1, status: "ONAIR" });
      setBroadcastSetting(setting);
    });
    setBroadcastStatus({ ...broadcastStatus, status: "ONAIR" });
  };
  // 방송종료 함수
  const endBroadcast = () => {
    // setBroadcastStatus({ ...broadcastStatus, status: "FINISH" });
    setBroadcastStatus({ ...broadcastStatus, status: "DEFAULT" });
  };
  // 투표 시작 함수
  const startVote = (vote: IVote) => {
    console.log(vote);
    setBroadcastStatus({ ...broadcastStatus, vote });
  };
  // 투표 종료 함수
  const finishVote = () => {
    const vote = broadcastStatus.vote;
    if (vote === null) return;
    vote.voteStatus = "finish";
    setBroadcastStatus({ ...broadcastStatus, vote });
  };

  return (
    <StyledDiv className="Broadcast">
      <div>
        <BroadcastStatusViewer ref={videoRef} status={status} viewers={viewers} likes={likes} />
        <BroadcastVoteContainer vote={vote} status={status} finishVote={finishVote} />
      </div>
      <div>
        <BroadcastSettingContainer
          initSetting={broadcastSetting}
          startBroadcast={startBroadcast}
          endBroadcast={endBroadcast}
          status={status}
        />
      </div>
      <BroadcastVoteModal startVote={startVote} animalIdList={animalIdList} />
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
