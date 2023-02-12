import instance from "..";

/**
 * GET : 전체 방송 목록
 */
export async function getBroadcastList() {
  return instance.get("/broadcasts");
}

/**
 * GET : 전체 방송 목록
 */
export async function getSearchedBroadcastList(params: { keyword: string }) {
  return instance.get("/broadcasts/search", { params });
}
