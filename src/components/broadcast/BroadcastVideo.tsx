import React, { useEffect, useMemo, useRef, useState } from "react";
import { Connection, OpenVidu, Session } from "openvidu-browser";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { ovActions } from "../../store/ovSlice";
import { broadcastActions } from "../../store/broadcastSlice";

interface IProps {
  // selectedFeed: string | null;
  // isLiked: boolean | string;
  // changeNumberOfViewers: (viewers: number) => void;
  // changeNumberOfLikes: (likes: number) => void;
  onClick: () => void;
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
    if (delay !== null) {
      // 만약 delay가 null이 아니라면
      const id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
    }
  }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
}

function BroadcastVideo(props: IProps) {
  const startTime = useState<number>(Date.now())[0];
  const selectedFeed = useAppSelector((state) => state.broadcast.selectedFeed);

  const dispatch = useDispatch();
  const ownerConnection = useAppSelector((state) => state.ov.ownerConnection);
  const params = useParams();

  const { OV, mySessionId, myUserName, session, subscriber } = useAppSelector((state) => state.ov);
  const APPLICATION_SERVER_URL = "http://localhost:5000/";

  useEffect(() => {
    if (session) {
      session.on("streamCreated", (event) => {
        if (streamRef.current !== null) {
          dispatch(ovActions.subscribeVideo(event.stream));
        }
      });
      session.on("signal", (event) => {
        if (event.type === "signal:welcome") {
          dispatch(ovActions.connectOwner(event.from));
        }
        if (event.type === "signal:badge") {
          console.log("뱃지 받았다");
        }
        if (event.type === "signal:numberOfLikes") {
          if (event.data !== undefined) {
            dispatch(broadcastActions.changeNumberOfLikes(Number(event.data)));
          }
        }
      });
    }
  }, [session]);

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
      url: APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      data: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  // 방 입장
  useEffect(() => {
    if (session && mySessionId) {
      createToken(mySessionId).then((token: string) => {
        session.connect(token, { clientData: myUserName });
      });

      // 방 퇴장
      return () => {
        dispatch(ovActions.leaveSession());
        const totalTime = Date.now() - startTime;
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
    }
  }, [session]);

  // 투표하기
  useEffect(() => {
    if (selectedFeed === null || ownerConnection === undefined) {
      return;
    }
    session?.signal({
      data: selectedFeed,
      to: [ownerConnection],
      type: "vote",
    });
  }, [selectedFeed, ownerConnection]);

  // 좋아요 및 좋아요 취소
  // useEffect(() => {
  //   if (ownerConnection === undefined || isLiked === "neverClicked") {
  //     return;
  //   }
  //   if (isLiked === false) {
  //     session?.signal({
  //       data: "",
  //       to: [ownerConnection],
  //       type: "dislike",
  //     });
  //   } else {
  //     session?.signal({
  //       data: "",
  //       to: [ownerConnection],
  //       type: "like",
  //     });
  //   }
  // }, [isLiked]);

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
