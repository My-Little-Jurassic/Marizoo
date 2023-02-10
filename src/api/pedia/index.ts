import instance from "..";
// import * as type from "./type";

/**
 * get: 종 목록
 */
export async function getSpeciesList() {
  return instance.get("/species");
}

/**
 * get: 종 목록
 */
export async function getSpeciesAnimalList(id?: number) {
  return instance.get(`/species/${id}`);
}

/**
 * get: 종 목록
 */
export async function getSpeciesInfo(id?: number) {
  return instance.get(`/stores/${id}/species_detail`);
}
