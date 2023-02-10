import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { ovActions } from "../../store/ovSlice";
import { broadcastActions } from "../../store/broadcastSlice";
import { openModal, setContent } from "../../store/modalSlice";

function BroadcastVideo() {
  const dispatch = useDispatch();
  const params = useParams();

  const { pk, uid } = useAppSelector((state) => state.user);
  const { mySessionId, myUserName, session, subscriber } = useAppSelector((state) => state.ov);
  const startTime = useState<number>(Date.now())[0];
  const effectCnt = useAppSelector((state) => state.broadcast.effectCnt);
  const isVoted = useAppSelector((state) => state.broadcast.isVoted);

  useEffect(() => {
    // Session 생성
    console.log("room");
    dispatch(ovActions.createOpenvidu({ nickname: uid, roomId: params.session_id }));
  }, []);

  const joinRoom = function () {
    if (session) {
      dispatch(broadcastActions.resetRoom());
    }
    dispatch(ovActions.createOpenvidu({ nickname: uid, roomId: params.session_id }));
  };

  // 토큰 생성
  const createToken = async function (sessionId: string) {
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

  // 방송 화면 출력
  const streamRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (subscriber && streamRef.current) {
      subscriber.addVideoElement(streamRef.current);
    }
  }, [subscriber]);

  // 토큰 생성 및 비디오 연결
  useEffect(() => {
    if (session && mySessionId) {
      createToken(mySessionId)
        .then((token: string) => {
          return session.connect(token, { clientData: myUserName });
        })
        .then(() => {
          // 방장 비디오 연결
          session?.on("streamCreated", (event) => {
            if (streamRef.current !== null) {
              dispatch(ovActions.subscribeVideo(event.stream));
            }
          });

          // 방장과 주고받는 시그널
          session?.on("signal", (event) => {
            if (event.type === "signal:welcome") {
              if (event.from) {
                session?.signal({
                  data: String(pk),
                  to: [event.from],
                  type: "thankYou",
                });
              }
              dispatch(ovActions.connectOwner(event.from));
              if (event.data === undefined) {
                return;
              }
              const roomInfo = JSON.parse(event.data);
              if (roomInfo.voteStatus === "proceeding") {
                dispatch(broadcastActions.startVote(roomInfo.feedList));
              } else if (roomInfo.voteStatus === "finish") {
                dispatch(broadcastActions.finishVote(roomInfo.winnerFeedId));
              }
            }

            if (event.type === "signal:roomInfo") {
              if (event.data !== undefined) {
                dispatch(broadcastActions.changeRoomInfo(event.data));
              }
            }

            if (event.type === "signal:voteStart") {
              if (event.data === undefined) {
                return;
              }
              const feedList = JSON.parse(event.data);
              dispatch(broadcastActions.startVote(feedList));
            }

            if (event.type === "signal:voteFinish") {
              if (event.data != undefined) {
                dispatch(broadcastActions.finishVote(event.data));
              }
            }

            if (event.type === "signal:badge") {
              console.log("배지 받았다");
            }

            if (event.type === "signal:finish") {
              dispatch(broadcastActions.resetRoom());
              dispatch(ovActions.leaveSession());
              dispatch(setContent("BroadcastFinish"));
              dispatch(openModal());
            }
          });
        });
    }
  }, [session]);

  return (
    <StyledContainer>
      <button onClick={joinRoom}>설마?</button>
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
