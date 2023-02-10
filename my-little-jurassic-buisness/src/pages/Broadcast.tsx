import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import {
  BroadcastSettingContainer,
  BroadcastStatusViewer,
  BroadcastVoteContainer,
} from "../components/Broadcast";
import { IBroadcastSetting } from "../types";
import { IBroadcastStatus, IVote, TConnectionId, TUserId } from "../types/Broadcast";
import { postBroadcast } from "../api";
import BroadcastVoteModal from "../components/Broadcast/BroadcastVoteModal";
import { ConnectionEvent, OpenVidu } from "openvidu-browser";
import { postOpenViduToken } from "../api/openvidu";

const Broadcast = () => {
  // 방송설정 STATE
  const [broadcastSetting, setBroadcastSetting] = useState<IBroadcastSetting>({
    id: "1",
    title: "",
    description: "",
    thumbnail: null,
    animalIdList: [],
    videoDevice: undefined,
    audioDevice: undefined,
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
  const { sessionId, viewers, likes, status, vote } = broadcastStatus;

  // OpenVidu를 위한 값
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewerRef = useRef<number>(0);
  const likeRef = useRef<number>(0);
  const viewerMap = useRef<Map<TUserId, TConnectionId>>(new Map());
  const connectionMap = useRef<Map<TConnectionId, TUserId>>(new Map());
  const OV = useMemo(() => new OpenVidu(), []);
  const session = useMemo(() => OV.initSession(), [OV]);

  // 세션 입장 함수
  const joinSession = async () => {
    const token = await postOpenViduToken(sessionId);
    await session.connect(token);
    const { videoDevice } = broadcastSetting;
    const newPublisher = await OV.initPublisherAsync(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: videoDevice, // The source of video. If undefined default webcam
      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: "640x480", // The resolution of your video
      frameRate: 60, // The frame rate of your video
      insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    });

    session.publish(newPublisher);
    newPublisher.addVideoElement(videoRef.current!);
  };
  // 세션 퇴장 함수
  const leaveSession = () => {
    session.disconnect();
  };

  // btn events
  // 방송시작 함수
  const startBroadcast = (setting: IBroadcastSetting) => {
    setBroadcastSetting(setting);

    // 요청을 위한 데이터 폼을 생성
    // TODO: 유효한 데이터 삽입중인지 확인 필요
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

    postBroadcast(formData).then((res) => {
      // 요청에 대한 응답처리 부분
      // TODO: 응답 확인 후 sessionId, pk 할당
      setBroadcastStatus({ ...broadcastStatus, sessionId: "123", pk: 1, status: "ONAIR" });
    });
  };
  // 방송종료 함수
  const endBroadcast = () => {
    // setBroadcastStatus({ ...broadcastStatus, status: "FINISH" });
    setBroadcastStatus({ ...broadcastStatus, status: "DEFAULT" });

    session.signal({
      data: undefined,
      to: [],
      type: "finish",
    });
  };
  // 투표 시작 함수
  const startVote = (vote: IVote) => {
    console.log(vote);
    setBroadcastStatus({ ...broadcastStatus, vote });

    const { options } = vote;
    session.signal({
      data: JSON.stringify(options),
      to: [],
      type: "voteStart",
    });
  };
  // 투표 종료 함수
  const finishVote = () => {
    const vote = broadcastStatus.vote;
    if (vote === null) return;
    vote.winnerFeed = vote.options.sort((a, b) => b.numberOfVotes - a.numberOfVotes)[0].id;
    vote.voteStatus = "finish";
    setBroadcastStatus({ ...broadcastStatus, vote });

    // 투표 결과 반환
    session.signal({
      data: String(vote.winnerFeed),
      to: [],
      type: "voteFinish",
    });
  };

  // **openvidu signal events**
  //  새로운 세션 연결 시 welcome SIGNAL 호출
  session.on("connectionCreated", (e) => {
    const { options, winnerFeed, voteStatus } = vote;
    session.signal({
      data: JSON.stringify({
        feedList: options,
        winnerFeed,
        voteStatus,
      }),
      to: [e.connection],
      type: "welcome",
    });
  });
  // 유저가 나가면 해당 유저 정보 삭제
  session.on("connectionDestroyed", (e) => {
    const connectionId = e.connection!.connectionId;
    const userId = connectionMap.current.get(connectionId);
    connectionMap.current.delete(connectionId);
    viewerMap.current.delete(userId!);
  });
  // thankYou SIGNAL 감지시 해당 유저 정보 저장
  session.on("signal:thankYou", (e) => {
    if (e.data && e.from) {
      const connectionId = e.from.connectionId;
      const userId = e.data;

      if (!viewerMap.current.get(e.data)) {
        viewerRef.current++;
        connectionMap.current.set(connectionId, userId);
        viewerMap.current.set(userId, connectionId);
      }
    }
  });
  // like SIGNAL 감지시 좋아요 수 변경
  session.on("signal:like", (e) => {
    if (e.data) likeRef.current++;
    else likeRef.current--;
  });
  // vote SIGNAL 감지시 투표수 반영
  session.on("signal:vote", (e) => {
    console.log("signal: vote |", e.data);
  });

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
