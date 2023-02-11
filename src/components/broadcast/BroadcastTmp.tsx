import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { broadcastActions } from "../../store/broadcastSlice";
import { openModal, setContent } from "../../store/modalSlice";
import { OpenVidu, Publisher, Subscriber } from "openvidu-browser";

function BroadcastVideo() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [subscriber, setSubscriber] = useState<Subscriber>();

  const { pk, uid } = useAppSelector((state) => state.user);
  const OV = useMemo(() => new OpenVidu(), []);
  const session = useMemo(() => OV.initSession(), [OV]);

  // 방송 화면 출력
  const streamRef = useRef<HTMLVideoElement>(null);
  const startTime = useState<number>(Date.now())[0];
  const effectCnt = useAppSelector((state) => state.broadcast.effectCnt);
  const isVoted = useAppSelector((state) => state.broadcast.isVoted);

  useEffect(() => {
    // Session 생성
    if (session) createToken().then(joinRoom);
  }, [session]);

  useEffect(() => {
    if (subscriber && streamRef.current) {
      subscriber.addVideoElement(streamRef.current);
    }
  }, [subscriber]);

  // 세션 참가
  const joinRoom = async (token: string) => {
    await session.connect(token);
    // 방장 비디오 연결
    // session.on("streamCreated", (e) => {
    //   console.log("streamCreated");
    //   if (streamRef.current) {
    //     const subscriber: Subscriber = session.subscribe(e.stream, undefined);
    //     subscriber.addVideoElement(streamRef.current);
    //   }
    // });

    // 방장과 주고받는 시그널
    session.on("signal:welcome", (e) => {
      console.dir(e.from);
      if (e.from) {
        session.signal({
          data: String(pk),
          to: [e.from],
          type: "thankYou",
        });
      }
      if (e.data) {
        const roomInfo = JSON.parse(e.data);
        if (roomInfo.voteStatus === "proceeding") {
          dispatch(broadcastActions.startVote(roomInfo.feedList));
        } else if (roomInfo.voteStatus === "finish") {
          dispatch(broadcastActions.finishVote(roomInfo.winnerFeedId));
        }
      }
      if (e.from?.stream) {
        setSubscriber(session.subscribe(e.from.stream, undefined));
      }
    });
    session.on("signal:roomInfo", (e) => {
      dispatch(broadcastActions.changeRoomInfo(e.data));
    });
    session.on("signal:voteStart", (e) => {
      if (e.data) {
        const feedList = JSON.parse(e.data);
        dispatch(broadcastActions.startVote(feedList));
      }
    });
    session.on("signal:voteFinish", (e) => {
      dispatch(broadcastActions.finishVote(e.data));
    });
    session.on("signal:badge", () => {
      console.log("배지 받았다");
    });
    session.on("signal:finish", () => {
      dispatch(broadcastActions.resetRoom());
      session.disconnect();
      dispatch(setContent("BroadcastFinish"));
      dispatch(openModal());
    });
  };

  // 토큰 생성
  const createToken = async function () {
    const response = await axios({
      method: "post",
      url: `/api/user/broadcasts/${params.broadcast_id}/${params.session_id}`,
      data: JSON.stringify({}),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("OPENVIDUAPP:MY_SECRET"),
      },
    });
    return response.data.connectionToken;
  };

  // useEffect(() => {
  //   if (subscriber && streamRef.current) {
  //     subscriber.addVideoElement(streamRef.current);
  //   }
  // }, [subscriber]);

  return (
    <StyledContainer>
      <StyledVideo autoPlay={true} ref={streamRef} />
    </StyledContainer>
  );
}

export default BroadcastVideo;

const StyledContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
`;

const StyledVideo = styled.video`
  width: 100%;
`;
