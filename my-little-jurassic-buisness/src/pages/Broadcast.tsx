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
import { postBroadcast } from "../api";

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
    viewers: 0,
    likes: 0,
    vote: null,
    status: "DEFAULT",
  });
  const { viewers, likes, status } = broadcastStatus;
  const videoRef = useRef<HTMLVideoElement>(null);

  const startBroadcast = (setting: IBroadcastSetting) => {
    const { id, title, description, animalIdList, thumbnail } = setting;

    const formData = new FormData();
    formData.append(
      "broadcastInfo",
      JSON.stringify({
        title,
        description,
        animalIdList,
        animalStoreId: id,
      }),
    );
    if (thumbnail) formData.append("img", thumbnail);

    console.dir(formData);
    postBroadcast(formData).then(() => {
      setBroadcastStatus({ ...broadcastStatus, sessionId: "123", status: "ONAIR" });
      setBroadcastSetting(setting);
    });
    setBroadcastStatus({ ...broadcastStatus, status: "ONAIR" });
  };
  const endBroadcast = () => {
    // setBroadcastStatus({ ...broadcastStatus, status: "FINISH" });
    setBroadcastStatus({ ...broadcastStatus, status: "DEFAULT" });
  };

  return (
    <StyledDiv className="Broadcast">
      <div>
        <BroadcastStatusViewer ref={videoRef} status={status} viewers={viewers} likes={likes} />
        <BroadcastVoteContainer />
      </div>
      <div>
        <BroadcastSettingContainer
          initSetting={broadcastSetting}
          startBroadcast={startBroadcast}
          endBroadcast={endBroadcast}
          status={status}
        />
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
