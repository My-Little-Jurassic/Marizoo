import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import {
  BroadcastSettingContainer,
  BroadcastStatusViewer,
  BroadcastVoteContainer,
} from "../components/Broadcast";
import { IBroadcastSetting } from "../types";
import {
  IBroadcastStatus,
  IBroadcastVariable,
  IVote,
  TConnectionId,
  TUserId,
} from "../types/Broadcast";
import { postBroadcast } from "../api";
import BroadcastVoteModal from "../components/Broadcast/BroadcastVoteModal";
import { OpenVidu } from "openvidu-browser";

const Broadcast = () => {
  // 방송설정 STATE
  const [broadcastSetting, setBroadcastSetting] = useState<IBroadcastSetting>({
    id: "1",
    status: "DEFAULT",
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
  });
  const { animalIdList, status } = broadcastSetting;
  const { viewers, likes, vote } = broadcastStatus;

  // OpenVidu를 위한 값
  const videoRef = useRef<HTMLVideoElement>(null);
  const variableRef = useRef<IBroadcastVariable>({
    viewers: 0,
    likes: 0,
    vote: { options: [], voteStatus: "default", winnerFeed: 0 },
  });
  const viewerMap = useRef<Map<TUserId, TConnectionId>>(new Map());
  const connectionMap = useRef<Map<TConnectionId, TUserId>>(new Map());
  const roomInfoInterval = useRef<NodeJS.Timer>();
  const OV = useMemo(() => new OpenVidu(), []);
  const session = useMemo(() => OV.initSession(), [OV]);
  useEffect(() => {
    return () => {
      if (broadcastSetting.status === "ONAIR") endBroadcast();
    };
  }, []);
  useEffect(() => {
    switch (broadcastSetting.status) {
      case "ONAIR":
        roomInfoInterval.current = setInterval(signalRoomInfo, 1000);
        return;
      case "FINISH":
        clearInterval(roomInfoInterval.current);
        return;
      case "DEFAULT":
      case "RESERVE":
      default:
        return;
    }
  }, [broadcastSetting]);

  // 세션 입장 함수
  const joinSession = async (token: string, setting: IBroadcastSetting) => {
    await session.connect(token);
    const { videoDevice } = setting;
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
    if (videoRef.current) newPublisher.addVideoElement(videoRef.current);
    // **openvidu signal events**
    //  새로운 세션 연결 시 welcome SIGNAL 호출
    session.on("connectionCreated", (e) => {
      console.log("connection created");
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
      console.log("connection destroyed");
      const connectionId = e.connection.connectionId;
      const userId = connectionMap.current.get(connectionId);
      let remove = connectionMap.current.delete(connectionId);
      if (userId) {
        remove = viewerMap.current.delete(userId) || remove;
      }
      if (remove) variableRef.current.viewers--;
    });
    // thankYou SIGNAL 감지시 해당 유저 정보 저장
    session.on("signal:thankYou", (e) => {
      console.log("signal thankYou");
      if (e.data && e.from) {
        const connectionId = e.from.connectionId;
        const userId = e.data;

        if (!viewerMap.current.get(e.data)) {
          variableRef.current.viewers++;
          connectionMap.current.set(connectionId, userId);
          viewerMap.current.set(userId, connectionId);
        }
      }
    });
    // like SIGNAL 감지시 좋아요 수 변경
    session.on("signal:like", (e) => {
      console.log("signal like");
      if (e.data) variableRef.current.likes++;
      else variableRef.current.likes--;
    });
    // vote SIGNAL 감지시 투표수 반영
    session.on("signal:vote", (e) => {
      console.log("signal vote");
      const vote = variableRef.current.vote;
      const options = vote.options;
      if (e.data) return;
      const feedId = Number(e.data);
      const feedIndex = options.findIndex((feed) => feed.id === feedId);
      options[feedIndex].numberOfVotes++;
      variableRef.current.vote = { ...vote, options };
    });
  };
  // 세션 퇴장 함수
  const leaveSession = () => {
    session.disconnect();
    setBroadcastSetting({ ...broadcastSetting, status: "FINISH" });
    // TODO: 서버에 방송 결과 전송
  };
  // 방 정보 제공 함수
  const signalRoomInfo = () => {
    session.signal({
      data: JSON.stringify({
        numberOfViewers: variableRef.current.viewers,
        numberOfLikes: variableRef.current.likes,
      }),
      to: [],
      type: "roomInfo",
    });
    setBroadcastStatus({
      ...broadcastStatus,
      ...variableRef.current,
    });
  };

  // btn events
  // 방송시작 함수
  const startBroadcast = async (setting: IBroadcastSetting) => {
    console.log("startBroadcast");
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

    const token = await postBroadcast(formData).then((res) => {
      // 요청에 대한 응답처리 부분
      const { broadcastId, sessionId, connectionToken } = res.data;
      console.log("sessionId:", sessionId);
      console.log("broadcastId:", broadcastId);
      setBroadcastStatus({ ...broadcastStatus, sessionId, pk: broadcastId });
      return connectionToken;
    });

    await joinSession(token, setting);
    setBroadcastSetting({ ...setting, status: "ONAIR" });
  };
  // 방송종료 함수
  const endBroadcast = async () => {
    console.log("endBroadcast");
    setBroadcastStatus({ ...broadcastStatus, ...variableRef.current });
    // setBroadcastStatus({ ...broadcastStatus, status: "DEFAULT" });

    // 방송 종료전 투표가 진행중이라면 투표를 종료한다.
    if (broadcastStatus.vote.voteStatus === "proceeding") await finishVote();
    await session.signal({
      data: undefined,
      to: [],
      type: "finish",
    });
    leaveSession();
  };
  // 투표 시작 함수
  const startVote = (vote: IVote) => {
    console.log("startVote");
    console.log(vote);
    variableRef.current.vote = vote;
    setBroadcastStatus({ ...broadcastStatus, vote });

    const { options } = vote;
    session.signal({
      data: JSON.stringify(options),
      to: [],
      type: "voteStart",
    });
  };
  // 투표 종료 함수
  const finishVote = async () => {
    console.log("finishVote");
    const vote = variableRef.current.vote;
    if (vote === null) return;
    vote.winnerFeed = vote.options.sort((a, b) => b.numberOfVotes - a.numberOfVotes)[0].id;
    vote.voteStatus = "finish";
    variableRef.current.vote = vote;
    setBroadcastStatus({ ...broadcastStatus, vote });

    // 투표 결과 반환
    await session.signal({
      data: String(vote.winnerFeed),
      to: [],
      type: "voteFinish",
    });
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
