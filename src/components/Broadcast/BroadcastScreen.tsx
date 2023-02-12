import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  TbHandStop,
  TbHeart,
  TbFlame,
  TbMaximize,
  TbMinimize,
  TbUsers,
  TbThumbUp,
} from "react-icons/tb";

import { GreenBtn, ReactionBtn } from "../common/button";
import VoteModal from "./VoteModal";
import BroadcastCombo from "./BroadcastCombo";
import { useAppDispatch, useAppSelector } from "../../store";
import { broadcastActions } from "../../store/broadcastSlice";
import BroadcastHeart from "./BroadcastHeart";
import { OpenVidu } from "openvidu-browser";
import { useParams } from "react-router-dom";
import { openModal, setContent } from "../../store/modalSlice";
import BroadcastStreamVideo from "./BroadcastStreamVideo";
import { getBroadcastInfo, modifyUserBadgeInfo } from "../../api";

interface IProps {
  title: string;
}

const BroadcastScreen = function (props: IProps) {
  const [isBtnShown, setIsBtnShown] = useState<boolean>(false);
  const [isVoteModalOpened, setIsVoteModalOpened] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [playingReaction, setPlayingReaction] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<number[]>([0, 0]);

  const isMaximized = useAppSelector((state) => state.broadcast.isMaximized);
  const isVoted = useAppSelector((state) => state.broadcast.isVoted);
  const isVoting = useAppSelector((state) => state.broadcast.isVoting);
  const numberOfViewers = useAppSelector((state) => state.broadcast.numberOfViewers);
  const numberOfLikes = useAppSelector((state) => state.broadcast.numberOfLikes);

  // OpenVidu STATUS
  const params = useParams();
  const dispatch = useAppDispatch();
  const pk = 1;
  const OV = useMemo(() => new OpenVidu(), [params.broadcast_id]);
  const session = useAppSelector((state) => state.broadcast.session);
  const streamRef = useRef<HTMLVideoElement>(null);
  const startTime = useRef(Date.now());
  const effectCnt = useRef(0);
  const isVotedRef = useRef(false);

  useEffect(() => {
    if (OV) dispatch(broadcastActions.makeSession(OV));
  }, [OV]);

  useEffect(() => {
    isVotedRef.current = isVoted;
  }, [isVoted]);

  useEffect(() => {
    // Session 생성
    if (session) createToken().then(joinRoom);
    // 방 퇴장
    return () => {
      if (!session || !pk) return;

      modifyUserBadgeInfo({
        userId: pk,
        effectCount: effectCnt.current,
        feedCount: isVotedRef.current ? 1 : 0,
        watchTime: Math.floor((Date.now() - startTime.current) / 3600000),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // axios({
      //   method: "put",
      //   url: `/api/user/users/watchEnd`,
      //   data: {
      //     userId: pk,
      //     effectCount: effectCnt.current,
      //     feedCount: isVotedRef.current ? 1 : 0,
      //     watchTime: Math.floor((Date.now() - startTime.current) / 3600000),
      //   },
      // })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      dispatch(broadcastActions.resetRoom());
    };
  }, [session]);

  // 세션 참가
  const joinRoom = async (token: string) => {
    if (session === null) {
      return;
    }

    await session.connect(token);

    // 방장과 주고받는 시그널
    session.on("signal:welcome", async (e) => {
      if (e.from) {
        dispatch(broadcastActions.connectOwner(e.from));
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
      if (streamRef.current && e.from?.stream) {
        const subscriber = await session.subscribeAsync(e.from.stream, "subscriber");
        subscriber.addVideoElement(streamRef.current);
      }
    });
    session.on("signal:roomInfo", (e) => {
      if (e.data) {
        const roomInfo = JSON.parse(e.data);
        dispatch(broadcastActions.changeRoomInfo(roomInfo));
      }
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
    if (!params.broadcast_id || !params.session_id) {
      return;
    }
    const response = await getBroadcastInfo(params.broadcast_id, params.session_id);
    return response.data.connectionToken;
  };

  // 마우스 움직이면 버튼들 나오도록
  const showBtns = function () {
    if (isMouseOver || (!isBtnShown && !isVoteModalOpened)) {
      setIsBtnShown(true);
    }
  };
  // 콤보 끝나면 이펙트 종료
  const finishEffect = function () {
    if (playingReaction === null) {
      return;
    }
    effectCnt.current += 1;
    setPlayingReaction(null);
  };

  // 클릭한 곳에서 리액션하도록 마우스 좌표 기억
  useEffect(() => {
    const ChangeMousePosition = function (event: MouseEvent) {
      setMousePosition([event.offsetX, event.offsetY]);
    };

    document.addEventListener("mousedown", ChangeMousePosition);
    return () => {
      document.removeEventListener("mousedown", ChangeMousePosition);
    };
  }, []);

  // 마우스 멈추면 버튼들 사라지게
  useEffect(() => {
    if (isMouseOver) {
      return;
    }
    const timeout = setTimeout(() => {
      setIsBtnShown(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isBtnShown, isMouseOver]);

  // 5초 지나면 이펙트 종료
  useEffect(() => {
    if (playingReaction === null || playingReaction === "응원하기") {
      return;
    }
    setTimeout(() => {
      setPlayingReaction(null);
      setIsMouseOver(false);
      effectCnt.current += 1;
    }, 5000);
  }, [playingReaction]);

  return (
    <StyledContainer
      onMouseMove={showBtns}
      isMaximized={isMaximized}
      isBtnShown={isBtnShown}
      isVoteModalOpened={isVoteModalOpened}
      playingReaction={playingReaction}
    >
      {/* {playingReaction === "쓰다듬기" && (
        <SytledIframe
          src="https://embed.lottiefiles.com/animation/97180"
          clientX={mousePosition[0]}
          clientY={mousePosition[1]}
        />
      )} */}
      {playingReaction === "예뻐하기" && (
        <BroadcastHeart clientX={mousePosition[0]} clientY={mousePosition[1]} />
        // <SytledIframe
        //   src="https://embed.lottiefiles.com/animation/42243"
        //   clientX={mousePosition[0]}
        //   clientY={mousePosition[1]}
        // />
      )}
      {playingReaction === "응원하기" && (
        <>
          {/* <SytledIframe
            src="https://embed.lottiefiles.com/animation/35139"
            clientX={mousePosition[0]}
            clientY={mousePosition[1]}
          /> */}
          <BroadcastCombo finishEffect={finishEffect} />
        </>
      )}
      {playingReaction && (
        <StyledReactionCancleContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
        >
          <TbMaximize size={30} />
        </StyledReactionCancleContainer>
      )}
      <BroadcastStreamVideo ref={streamRef} />
      {isMaximized && !playingReaction && (
        <StyledHeader isBtnShown={isBtnShown}>
          <StyledTopShadow />
          <StyledTitle>{props.title}</StyledTitle>
          <StyledCountInfoContainer>
            <TbUsers size={20} />
            <StyledSpan>{numberOfViewers} 명</StyledSpan>
            <TbThumbUp size={20} />
            <StyledSpan>{numberOfLikes} 회</StyledSpan>
          </StyledCountInfoContainer>
        </StyledHeader>
      )}

      {!playingReaction && (
        <StyledReactionContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
          isMaximized={isMaximized}
        >
          <ReactionBtn
            label="쓰다듬기"
            icon={TbHandStop}
            color="#F1A604"
            onClick={() => setPlayingReaction("쓰다듬기")}
          />
          <ReactionBtn
            label="예뻐하기"
            icon={TbHeart}
            color="#ff38a4"
            onClick={() => setPlayingReaction("예뻐하기")}
          />
          <ReactionBtn
            label="응원하기"
            icon={TbFlame}
            color="#f33041"
            onClick={() => setPlayingReaction("응원하기")}
          />
        </StyledReactionContainer>
      )}

      {isMaximized && (
        <StyledBtnContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
        >
          {isVoting === "proceeding" && (
            <>
              {isVoted ? (
                <GreenBtn label="투표하기" type={0} isDisable={true} />
              ) : (
                <GreenBtn
                  label="투표하기"
                  type={0}
                  isDisable={false}
                  onClick={() => setIsVoteModalOpened(true)}
                />
              )}
            </>
          )}
        </StyledBtnContainer>
      )}
      {isVoteModalOpened && <VoteModal closeModal={() => setIsVoteModalOpened(false)} />}
      {!isMaximized && !playingReaction && (
        <StyledModeChangeIconContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
          onClick={() => {
            document.documentElement.requestFullscreen();
            dispatch(broadcastActions.maximize());
            setIsMouseOver(false);
          }}
        >
          <TbMaximize size={30} />
        </StyledModeChangeIconContainer>
      )}
      {isMaximized && !playingReaction && (
        <StyledModeChangeIconContainer
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          isBtnShown={isBtnShown}
          onClick={() => {
            document.exitFullscreen();
            dispatch(broadcastActions.maximize());
            setIsMouseOver(false);
          }}
        >
          <TbMinimize size={30} />
        </StyledModeChangeIconContainer>
      )}
    </StyledContainer>
  );
};

export default BroadcastScreen;

const StyledContainer = styled.div<{
  isMaximized: boolean;
  isBtnShown: boolean;
  isVoteModalOpened: boolean;
  playingReaction: string | null;
}>`
  width: 100%;
  aspect-ratio: 1654 / 1000;
  border-radius: 32px;
  filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
  overflow: hidden;
  position: relative;
  ${(props) =>
    props.isMaximized
      ? "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; border-radius: 0; z-index:100;"
      : ""}
  ${(props) =>
    props.isMaximized && !props.isBtnShown && !props.isVoteModalOpened ? "cursor: none;" : ""}
  ${(props) =>
    !props.isVoteModalOpened &&
    props.playingReaction === "쓰다듬기" &&
    `cursor: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNzcgMjg3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTEzNF8xNDQ4KSI+CjxwYXRoIGQ9Ik05Mi4zMzM1IDE1NS40NThWNjUuNzcxQzkyLjMzMzUgNjEuMDEzNyA5NC4xNTc1IDU2LjQ1MTIgOTcuNDA0MiA1My4wODczQzEwMC42NTEgNDkuNzIzMyAxMDUuMDU0IDQ3LjgzMzUgMTA5LjY0NiA0Ny44MzM1QzExNC4yMzggNDcuODMzNSAxMTguNjQxIDQ5LjcyMzMgMTIxLjg4OCA1My4wODczQzEyNS4xMzUgNTYuNDUxMiAxMjYuOTU4IDYxLjAxMzcgMTI2Ljk1OCA2NS43NzFWMTQzLjUiIGZpbGw9IiNGMUE2MDQiLz4KPHBhdGggZD0iTTkyLjMzMzUgMTU1LjQ1OFY2NS43NzFDOTIuMzMzNSA2MS4wMTM3IDk0LjE1NzUgNTYuNDUxMiA5Ny40MDQyIDUzLjA4NzNDMTAwLjY1MSA0OS43MjMzIDEwNS4wNTQgNDcuODMzNSAxMDkuNjQ2IDQ3LjgzMzVDMTE0LjIzOCA0Ny44MzM1IDExOC42NDEgNDkuNzIzMyAxMjEuODg4IDUzLjA4NzNDMTI1LjEzNSA1Ni40NTEyIDEyNi45NTggNjEuMDEzNyAxMjYuOTU4IDY1Ljc3MVYxNDMuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEyNi45NTggNjUuNzcwN1Y0MS44NTRDMTI2Ljk1OCAzOS40OTg0IDEyNy40MDYgMzcuMTY1OSAxMjguMjc2IDM0Ljk4OTZDMTI5LjE0NiAzMi44MTMzIDEzMC40MjIgMzAuODM1OSAxMzIuMDI5IDI5LjE3MDNDMTMzLjYzNyAyNy41MDQ2IDEzNS41NDUgMjYuMTgzNCAxMzcuNjQ2IDI1LjI4MTlDMTM5Ljc0NiAyNC4zODA1IDE0MS45OTcgMjMuOTE2NSAxNDQuMjcxIDIzLjkxNjVDMTQ2LjU0NSAyMy45MTY1IDE0OC43OTYgMjQuMzgwNSAxNTAuODk2IDI1LjI4MTlDMTUyLjk5NyAyNi4xODM0IDE1NC45MDUgMjcuNTA0NiAxNTYuNTEzIDI5LjE3MDNDMTU4LjEyIDMwLjgzNTkgMTU5LjM5NiAzMi44MTMzIDE2MC4yNjYgMzQuOTg5NkMxNjEuMTM2IDM3LjE2NTkgMTYxLjU4MyAzOS40OTg0IDE2MS41ODMgNDEuODU0VjE0My41IiBmaWxsPSIjRjFBNjA0Ii8+CjxwYXRoIGQ9Ik0xMjYuOTU4IDY1Ljc3MDdWNDEuODU0QzEyNi45NTggMzkuNDk4NCAxMjcuNDA2IDM3LjE2NTkgMTI4LjI3NiAzNC45ODk2QzEyOS4xNDYgMzIuODEzMyAxMzAuNDIyIDMwLjgzNTkgMTMyLjAyOSAyOS4xNzAzQzEzMy42MzcgMjcuNTA0NiAxMzUuNTQ1IDI2LjE4MzQgMTM3LjY0NiAyNS4yODE5QzEzOS43NDYgMjQuMzgwNSAxNDEuOTk3IDIzLjkxNjUgMTQ0LjI3MSAyMy45MTY1QzE0Ni41NDUgMjMuOTE2NSAxNDguNzk2IDI0LjM4MDUgMTUwLjg5NiAyNS4yODE5QzE1Mi45OTcgMjYuMTgzNCAxNTQuOTA1IDI3LjUwNDYgMTU2LjUxMyAyOS4xNzAzQzE1OC4xMiAzMC44MzU5IDE1OS4zOTYgMzIuODEzMyAxNjAuMjY2IDM0Ljk4OTZDMTYxLjEzNiAzNy4xNjU5IDE2MS41ODMgMzkuNDk4NCAxNjEuNTgzIDQxLjg1NFYxNDMuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEyNyAxNDNWNDMuODMzM0MxMjcgMzguNTczMiAxMjguODQ0IDMzLjUyODUgMTMyLjEyNiAyOS44MDlDMTM1LjQwOCAyNi4wODk2IDEzOS44NTkgMjQgMTQ0LjUgMjRDMTQ5LjE0MSAyNCAxNTMuNTkyIDI2LjA4OTYgMTU2Ljg3NCAyOS44MDlDMTYwLjE1NiAzMy41Mjg1IDE2MiAzOC41NzMyIDE2MiA0My44MzMzVjEyOS43NzgiIGZpbGw9IiNGMUE2MDQiLz4KPHBhdGggZD0iTTEyNyAxNDNWNDMuODMzM0MxMjcgMzguNTczMiAxMjguODQ0IDMzLjUyODUgMTMyLjEyNiAyOS44MDlDMTM1LjQwOCAyNi4wODk2IDEzOS44NTkgMjQgMTQ0LjUgMjRDMTQ5LjE0MSAyNCAxNTMuNTkyIDI2LjA4OTYgMTU2Ljg3NCAyOS44MDlDMTYwLjE1NiAzMy41Mjg1IDE2MiAzOC41NzMyIDE2MiA0My44MzMzVjEyOS43NzgiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xODkuNzc3IDg5LjkwNjJDMTg5Ljc3NyA4NS4xNTcyIDE5MS40NzQgODAuNjAyNyAxOTQuNDk2IDc3LjI0NDZDMTk3LjUxNyA3My44ODY1IDIwMS42MTUgNzIgMjA1Ljg4OCA3MkMyMTAuMTYxIDcyIDIxNC4yNTkgNzMuODg2NSAyMTcuMjgxIDc3LjI0NDZDMjIwLjMwMyA4MC42MDI3IDIyMiA4NS4xNTcyIDIyMiA4OS45MDYyVjE5MS4zNzVDMjIyIDIxMC4zNzEgMjE1LjIxIDIyOC41ODkgMjAzLjEyNCAyNDIuMDIyQzE5MS4wMzggMjU1LjQ1NCAxNzQuNjQ2IDI2MyAxNTcuNTUzIDI2M0gxMzYuMDcxSDEzOC4zMDVDMTI3LjYzMiAyNjMuMDAyIDExNy4xMjYgMjYwLjA1OCAxMDcuNzI5IDI1NC40MzJDOTguMzMyOCAyNDguODA3IDkwLjM0MDcgMjQwLjY3NSA4NC40NzA1IDIzMC43NjlDODMuNzY1OSAyMjkuNTc3IDgzLjA2NDIgMjI4LjM4MyA4Mi4zNjUyIDIyNy4xODhDNzkuMDE0IDIyMS40NjkgNjcuMjUyNCAxOTguNjgxIDQ3LjA2OTggMTU4LjgxQzQ1LjAxMjMgMTU0Ljc0NSA0NC40NjI4IDE0OS45NDkgNDUuNTM3OSAxNDUuNDQxQzQ2LjYxMzEgMTQwLjkzNCA0OS4yMjgyIDEzNy4wNyA1Mi44MjcxIDEzNC42NzJDNTYuNjYwMyAxMzIuMTE2IDYxLjE1MjIgMTMxLjA1NiA2NS41ODkyIDEzMS42NjJDNzAuMDI2MyAxMzIuMjY3IDc0LjE1NCAxMzQuNTAzIDc3LjMxNjkgMTM4LjAxNEw5My4xMDYzIDE1NS41NjIiIGZpbGw9IiNGMUE2MDQiLz4KPHBhdGggZD0iTTE4OS43NzcgODkuOTA2MkMxODkuNzc3IDg1LjE1NzIgMTkxLjQ3NCA4MC42MDI3IDE5NC40OTYgNzcuMjQ0NkMxOTcuNTE3IDczLjg4NjUgMjAxLjYxNSA3MiAyMDUuODg4IDcyQzIxMC4xNjEgNzIgMjE0LjI1OSA3My44ODY1IDIxNy4yODEgNzcuMjQ0NkMyMjAuMzAzIDgwLjYwMjcgMjIyIDg1LjE1NzIgMjIyIDg5LjkwNjJWMTkxLjM3NUMyMjIgMjEwLjM3MSAyMTUuMjEgMjI4LjU4OSAyMDMuMTI0IDI0Mi4wMjJDMTkxLjAzOCAyNTUuNDU0IDE3NC42NDYgMjYzIDE1Ny41NTMgMjYzSDEzNi4wNzFIMTM4LjMwNUMxMjcuNjMyIDI2My4wMDIgMTE3LjEyNiAyNjAuMDU4IDEwNy43MjkgMjU0LjQzMkM5OC4zMzI4IDI0OC44MDcgOTAuMzQwNyAyNDAuNjc1IDg0LjQ3MDUgMjMwLjc2OUM4My43NjU5IDIyOS41NzcgODMuMDY0MiAyMjguMzgzIDgyLjM2NTIgMjI3LjE4OEM3OS4wMTQgMjIxLjQ2OSA2Ny4yNTI0IDE5OC42ODEgNDcuMDY5OCAxNTguODFDNDUuMDEyMyAxNTQuNzQ1IDQ0LjQ2MjggMTQ5Ljk0OSA0NS41Mzc5IDE0NS40NDFDNDYuNjEzMSAxNDAuOTM0IDQ5LjIyODIgMTM3LjA3IDUyLjgyNzEgMTM0LjY3MkM1Ni42NjAzIDEzMi4xMTYgNjEuMTUyMiAxMzEuMDU2IDY1LjU4OTIgMTMxLjY2MkM3MC4wMjYzIDEzMi4yNjcgNzQuMTU0IDEzNC41MDMgNzcuMzE2OSAxMzguMDE0TDkzLjEwNjMgMTU1LjU2MiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE2MiA1Ny4yNUMxNjIgNTMuNDcwNyAxNjMuNTI4IDQ5Ljg0NjEgMTY2LjI0NyA0Ny4xNzM3QzE2OC45NjYgNDQuNTAxMyAxNzIuNjU0IDQzIDE3Ni41IDQzQzE4MC4zNDYgNDMgMTg0LjAzNCA0NC41MDEzIDE4Ni43NTMgNDcuMTczN0MxODkuNDcyIDQ5Ljg0NjEgMTkxIDUzLjQ3MDcgMTkxIDU3LjI1VjExOSIgZmlsbD0iI0YxQTYwNCIvPgo8cGF0aCBkPSJNMTYyIDU3LjI1QzE2MiA1My40NzA3IDE2My41MjggNDkuODQ2MSAxNjYuMjQ3IDQ3LjE3MzdDMTY4Ljk2NiA0NC41MDEzIDE3Mi42NTQgNDMgMTc2LjUgNDNDMTgwLjM0NiA0MyAxODQuMDM0IDQ0LjUwMTMgMTg2Ljc1MyA0Ny4xNzM3QzE4OS40NzIgNDkuODQ2MSAxOTEgNTMuNDcwNyAxOTEgNTcuMjVWMTE5IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8bGluZSB4MT0iMTYzLjUiIHkxPSI1MCIgeDI9IjE2My41IiB5Mj0iMTA0IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjUiLz4KPHBhdGggZD0iTTE2Mi43MzggNzlMMTYyLjczOSAxMjcuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI2LjUiLz4KPHJlY3QgeD0iMTY2IiB5PSI2NCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjQ2IiBmaWxsPSIjRjFBNjA0Ii8+CjxyZWN0IHg9IjE5Ny4yMTMiIHk9IjExNCIgd2lkdGg9IjguNzI1MzUiIGhlaWdodD0iMTEuMDE5NiIgdHJhbnNmb3JtPSJyb3RhdGUoNTYuNzI2NyAxOTcuMjEzIDExNCkiIGZpbGw9IiNGMUE2MDQiLz4KPHJlY3QgeD0iMTY2LjIxMyIgeT0iMTIzIiB3aWR0aD0iOC43MjUzNSIgaGVpZ2h0PSIxMS4wMTk2IiB0cmFuc2Zvcm09InJvdGF0ZSg1Ni43MjY3IDE2Ni4yMTMgMTIzKSIgZmlsbD0iI0YxQTYwNCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzExMzRfMTQ0OCI+CjxyZWN0IHdpZHRoPSIyNzciIGhlaWdodD0iMjg3IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=) 30 25, none`}
  
  ${(props) =>
    !props.isVoteModalOpened &&
    props.playingReaction === "응원하기" &&
    `cursor: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWZsYW1lIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iI2YzMzA0MSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4NCiAgPHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQogIDxwYXRoIGQ9Ik0xMiAxMmMyIC0yLjk2IDAgLTcgLTEgLThjMCAzLjAzOCAtMS43NzMgNC43NDEgLTMgNmMtMS4yMjYgMS4yNiAtMiAzLjI0IC0yIDVhNiA2IDAgMSAwIDEyIDBjMCAtMS41MzIgLTEuMDU2IC0zLjk0IC0yIC01Yy0xLjc4NiAzIC0yLjc5MSAzIC00IDJ6IiAvPg0KPC9zdmc+DQoNCg0K) 30 30, none`}
`;
// ${(props) => (props.waitingReaction !== null ? "cursor: pointer;" : "")}

const StyledHeader = styled.div<{ isBtnShown: boolean }>`
  opacity: ${(props) => (props.isBtnShown ? " 1" : "0")};
  transition: all 0.5s;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledTopShadow = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
`;

const StyledTitle = styled.span`
  z-index: 2;
  position: fixed;
  top: 48px;
  left: 48px;
  font: ${(props) => props.theme.fonts.header1};
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
`;

const StyledReactionContainer = styled.div<{ isBtnShown: boolean; isMaximized: boolean }>`
  position: absolute;
  bottom: 24px;
  left: ${(props) => (props.isBtnShown ? "24px" : "-60px")};
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.5s;
`;

const StyledBtnContainer = styled.div<{ isBtnShown: boolean }>`
  position: fixed;
  bottom: ${(props) => (props.isBtnShown ? "24px" : "-60px")};
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.5s;
`;

const StyledReactionCancleContainer = styled.div<{ isBtnShown: boolean }>`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  border-radius: 32px;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isBtnShown ? "1" : "0")};
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateX(-50%) scale(1.02);
  }
  &:active {
    transform: translateX(-50%) scale(1);
    filter: brightness(0.8);
  }
`;

const StyledModeChangeIconContainer = styled.div<{ isBtnShown: boolean }>`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 32px;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isBtnShown ? "1" : "0")};
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    filter: brightness(0.8);
  }
`;

const StyledCountInfoContainer = styled.div`
  position: fixed;
  top: 108px;
  left: 48px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.colors.brandColors.basaltGray["50"]};
`;

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.paragraph};
`;

const SytledIframe = styled.iframe<{
  clientX: number | null;
  clientY: number | null;
}>`
  position: absolute;
  top: ${(props) => `${props.clientY}px`};
  left: ${(props) => `${props.clientX}px`};
  transform: translate(-50%, -50%);
  width: 30%;
  height: 30%;
  pointer-events: none;
  z-index: 4;
`;
