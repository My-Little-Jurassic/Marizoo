import userInstance from "..";
// import * as type from "./type";

/**
 * get: 종 목록
 */
export async function getSpeciesList() {
  return userInstance.get("/species");
}

/**
 * get: 종 목록
 */
export async function getSpeciesAnimalList(id?: number) {
  return userInstance.get(`/species/${id}`);
}

/**
 * get: 종 목록
 */
export async function getSpeciesInfo(id?: number) {
  return userInstance.get(`/stores/${id}/species_detail`);
}
