import instance from "..";
import * as type from "./type";

/**
 * POST: 방송 정보
 */
export async function getBroadcastInfo(broadcastId: string, sessionId: string) {
  return instance.post(`/broadcasts/${broadcastId}/${sessionId}`);
}

/**
 * GET: 추천 방송 목록
 */
// cors error...
export async function getRecommendedBroadcastList(broadcastId: string) {
  return instance.get(`/broadcasts/${broadcastId}/related`);
}

/**
 * PUT: 방송 종료 시 뱃지 획득 관련 현황 수정
 */
// cors error...
export async function modifyUserBadgeInfo(data: type.IModifyUserBadgeInfoData) {
  return instance.put(`/users/watchEnd`, data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
    },
  });
}
