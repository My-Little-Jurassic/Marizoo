import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { ovActions } from "../../store/ovSlice";
import { broadcastActions } from "../../store/broadcastSlice";

interface IProps {
  onClick: () => void;
}

function BroadcastVideo(props: IProps) {
  // const startTime = useState<number>(Date.now())[0];

  const dispatch = useDispatch();
  const params = useParams();

  const { pk, uid } = useAppSelector((state) => state.user);
  const { mySessionId, myUserName, session, subscriber } = useAppSelector((state) => state.ov);
  const selectedFeed = useAppSelector((state) => state.broadcast.selectedFeed);
  const APPLICATION_SERVER_URL = "http://localhost:5000/";

  useEffect(() => {
    if (session) {
      dispatch(broadcastActions.resetRoom());
    }
    dispatch(ovActions.createOpenvidu({ nickname: uid, roomId: params.broadcast_id }));

    // 방 퇴장
    return () => {
      dispatch(ovActions.leaveSession());
      dispatch(broadcastActions.resetRoom());
      // const totalTime = Date.now() - startTime;
      // let effectCnt: number;
      // if (localStorage.getItem("effectCnt") === null) {
      //   effectCnt = 0;
      // } else {
      //   effectCnt = Number(localStorage.getItem("effectCnt"));
      // }
      // let feedCount: number;
      // if (localStorage.getItem("isVoted") === null) {
      //   feedCount = 0;
      // } else {
      //   feedCount = 1;
      // }

      // localStorage.removeItem("effectCnt");
      // localStorage.removeItem("isVoted");
      // totalTime, effectCnt, feedCount
    };
  }, [params.broadcast_id]);

  // 방송 화면 출력
  const streamRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (subscriber && streamRef.current) {
      subscriber.addVideoElement(streamRef.current);
    }
  }, [subscriber]);

  // 토큰 생성
  const createToken = async function (sessionId: string) {
    const response = await axios({
      method: "post",
      url: "/sessions/" + sessionId + "/connections",
      data: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  // 토큰 생성 및 비디오 연결
  useEffect(() => {
    if (session && mySessionId) {
      createToken(mySessionId).then((token: string) => {
        session.connect(token, { clientData: myUserName });
      });
    }

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
          dispatch(broadcastActions.changeNumberOfLikes(Number(event.data)));
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
        axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/broadcasts/badges`,
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }

      if (event.type === "signal:voteFinish") {
        console.log(event.data);
      }
    });
  }, [session]);

  // 시청자 수 4초마다 갱신
  useInterval(() => {
    if (session !== undefined) {
      dispatch(broadcastActions.changeNumberOfViewers(session?.remoteConnections.size));
    }
  }, 4000);

  return (
    <StyledContainer onClick={props.onClick}>
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
