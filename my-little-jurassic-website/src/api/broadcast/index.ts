import { userInstance, ownerInstance } from "..";
import * as type from "./type";

/**
 * POST: 방송 정보
 */
export async function getBroadcastInfo(broadcastId: string, sessionId: string) {
  return userInstance.post(`/broadcasts/${broadcastId}/${sessionId}`);
}

/**
 * GET: 추천 방송 목록
 */
// cors error...
export async function getRecommendedBroadcastList(broadcastId: string) {
  return userInstance.get(`/broadcasts/${broadcastId}/related`);
}

/**
 * PUT: 방송 종료 시 뱃지 획득 관련 현황 수정
 */
export async function modifyUserBadgeInfo(data: type.IModifyUserBadgeInfoData) {
  return userInstance.put(`/users/watchEnd`, data);
}

export function postBroadcast(body: FormData) {
  return ownerInstance.post<type.IPostBroadcastInfoRes>("/broadcasts", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function postBroadcastFeeds(body: type.IPostBroadcastFeeds) {
  return ownerInstance.post("/broadcasts/feeds", body);
}

export function postBroadcastBadge(body: type.IPostBroadcastBadge) {
  return ownerInstance.post("/broadcasts/badge", body);
}

export function postBroadcastEnd(body: type.IPostBroadcastEnd, broadcastId: string) {
  return ownerInstance.post(`/broadcasts/${broadcastId}`, body);
}
