import instance from "..";
import * as type from "./type";

/**
 * POST: 회원가입
 */
export async function postRegist(body: type.IRegistBody) {
  return instance.post("/users", body);
}

/**
 * GET: 유저 아이디 중복 체크
 */
export async function getCheckUid(params: type.ICheckUidParams) {
  return instance.get("/users/check-uid", { params });
}

/**
 * GET: 닉네임 중복 체크
 */
export async function getCheckNickname(params: type.ICheckNicknameParams) {
  return instance.get("/users/check-nickname", { params });
}

/**
 * POST: 로그인
 */
export async function postLogin(body: type.ILoginBody) {
  return instance.post("/login", body);
}

/**
 * GET: 토큰 재발급
 */
export async function getRefresh() {
  return instance.get("/refresh");
}

/**
 * GET: 유저 아이디 찾기
 */
export async function getFindUid(params: type.IFindUidParams) {
  return instance.get("/user/find-uid", { params });
}

/**
 * GET: 유저 비밀번호 찾기
 */
export async function getFinedPwd(params: type.IFindPwdParams) {
  return instance.get("/user/find-pwd", { params });
}

/**
 * POST: 비밀번호 확인
 */
export async function postPwd(uid: string, body: type.IGetUserBody, token: string) {
  return instance.post(`/user/${uid}`, body, { headers: { "access-token": token } });
}

/**
 * PUT: 유저 정보 수정
 */
export async function modifyUser(uid: string, body: type.IModifyUserBody, token: string) {
  return instance.put(`/user/${uid}`, body, { headers: { "access-token": token } });
}

/**
 * DELETE: 유저 탈퇴
 */
export async function withdrawUser(uid: string, token: string) {
  return instance.delete(`/user/${uid}`, { headers: { "access-token": token } });
}

/**
 * PUT: 유저 비밀번호 수정
 */
export async function modifyUserPwd(uid: string, body: type.IModifyUserPwdBody, token: string) {
  return instance.put(`user/${uid}/change-pwd`, body, { headers: { "access-token": token } });
}

/**
 * GET: 배지 정보
 */
export async function getBadges(uid: string) {
  return instance.get(`user/${uid}/badges`);
}

/**
 * GET: 팔로우 가게 정보
 */
export async function getLikeStores(uid: string) {
  return instance.get(`user/${uid}/stores`);
}
