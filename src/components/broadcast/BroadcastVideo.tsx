import React, { useEffect, useMemo, useRef, useState } from "react";
import { Connection, OpenVidu, Session } from "openvidu-browser";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

interface IProps {
  selectedFeed: string | null;
  isLiked: boolean | string;
  onClick: () => void;
  changeNumberOfViewers: (viewers: number) => void;
  changeNumberOfLikes: (likes: number) => void;
  isVoted: boolean;
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
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [ownerConnection, setOwnerConnection] = useState<Connection | undefined>(undefined);
  const startTime = useState<number>(Date.now())[0];

  const OV = useMemo(() => new OpenVidu(), []);
  const APPLICATION_SERVER_URL = "http://localhost:5000/";

  const params = useParams();

  const mySessionId = String(params.id);
  const myUserName = "myUserName1";

  // useEffect(() => {
  //   setSession(OV.initSession());
  // }, [OV]);

  // 스트리밍 화면 출력
  const streamRef = useRef<HTMLVideoElement>(null);

  // 세션 생성
  useEffect(() => {
    const newSession = OV.initSession();
    newSession.on("streamCreated", (event) => {
      if (streamRef.current !== null) {
        const ownerStream = newSession.subscribe(event.stream, streamRef.current);
        ownerStream?.addVideoElement(streamRef.current);
      }
    });
    // 메세지 받기
    newSession.on("signal", (event) => {
      if (event.type === "signal:welcome") {
        setOwnerConnection(event.from);
      }
      if (event.type === "signal:badge") {
        console.log("뱃지 받았다");
      }
      if (event.type === "signal:numberOfLikes") {
        if (event.data !== undefined) {
          props.changeNumberOfLikes(Number(event.data));
        }
      }
    });
    setSession(newSession);
  }, [params.id]);

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

  // 토큰 가져오기
  // const getToken = async function () {
  //   return await createToken(mySessionId);
  // };

  // 방 입장
  useEffect(() => {
    if (session !== undefined) {
      createToken(mySessionId).then((token: string) => {
        session.connect(token, { clientData: myUserName });
      });

      // 방 퇴장
      return () => {
        session.disconnect();
        const totalTime = Date.now() - startTime;
        let effectCnt: number;
        if (localStorage.getItem("effectCnt") === null) {
          effectCnt = 0;
        } else {
          effectCnt = Number(localStorage.getItem("effectCnt"));
        }
        let feedCount: number;
        if (localStorage.getItem("isVoted") === null) {
          feedCount = 0;
        } else {
          feedCount = 1;
        }

        localStorage.removeItem("effectCnt");
        localStorage.removeItem("isVoted");
        // totalTime, effectCnt, feedCount
      };
    }
  }, [session]);

  // 세션 입장
  // const joinRoom = function () {
  //   getToken().then((token: string) => {
  //     if (session === undefined) {
  //       return;
  //     }
  //     session.connect(token, { clientData: myUserName });
  //   });
  // };

  // 투표하기
  useEffect(() => {
    if (props.selectedFeed === null || ownerConnection === undefined) {
      return;
    }
    session?.signal({
      data: props.selectedFeed,
      to: [ownerConnection],
      type: "vote",
    });
  }, [props.selectedFeed, ownerConnection]);

  // 좋아요 및 좋아요 취소
  useEffect(() => {
    if (ownerConnection === undefined || props.isLiked === "neverClicked") {
      return;
    }
    if (props.isLiked === false) {
      session?.signal({
        data: "",
        to: [ownerConnection],
        type: "dislike",
      });
    } else {
      session?.signal({
        data: "",
        to: [ownerConnection],
        type: "like",
      });
    }
  }, [props.isLiked]);

  // 시청자 수 4초마다 갱신
  useInterval(() => {
    if (session !== undefined) {
      props.changeNumberOfViewers(session?.remoteConnections.size);
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
