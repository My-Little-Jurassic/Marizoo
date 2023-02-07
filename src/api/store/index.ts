import instance from "..";
import * as type from "./type";

/**
 * GET : 전체 파충류카페 목록
 */
export async function getStoresList() {
  return instance.get("/stores");
}

/**
 * GET : 파충류카페 검색
 */
export async function searchStores(params: type.ISearchStores) {
  return instance.get("/stores/search", { params });
}
