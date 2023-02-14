import { userInstance } from "..";
import * as type from "./type";

/**
 * GET : 전체 파충류카페 목록
 */
export async function getStoresList() {
  return userInstance.get("/stores");
}

/**
 * GET : 파충류카페 검색
 */
export async function searchStores(params: type.ISearchStores) {
  return userInstance.get("/stores/search", { params });
}

/**
 * GET : 필터 동물 종 목록
 */
export async function getSpeciesList() {
  return userInstance.get("/species");
}
