import userInstance from "..";

/**
 * GET : 전체 방송 목록
 */
export async function getBroadcastList() {
  return userInstance.get("/broadcasts");
}

/**
 * GET : 전체 방송 목록
 */
export async function getSearchedBroadcastList(params: { keyword: string }) {
  return userInstance.get("/broadcasts/search", { params });
}
