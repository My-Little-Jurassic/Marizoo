import { instance } from "..";
import { IPostOpenViduSessionBody } from "./types";

const SECRET = "MY_SECRET";

/**
 * OpenVidu 세션 생성 함수
 * @param {IPostOpenViduSessionBody} body 커스텀세션 정보
 * @returns sessionId
 */
export function postOpenViduSession(body: IPostOpenViduSessionBody): Promise<string> {
  return instance.post("/api/sessions", body, {
    headers: {
      Authorization: "Basic " + Buffer.from("OPENVIDUAPP:" + SECRET, "base64"),
    },
  });
}

/**
 * OpenVidu 토큰 생성 함수
 * @param sessionId 세션 id
 * @returns token
 */
export function postOpenViduToken(sessionId: string): Promise<string> {
  return instance.post(
    `/api/sessions/${sessionId}/connections`,
    {},
    {
      headers: {
        Authorization: "Basic " + Buffer.from("OPENVIDUAPP:" + SECRET, "base64"),
      },
    },
  );
}
