import { userInstance } from "..";
// import * as type from "./type";

/**
 * GET: 동물 정보
 */
export async function getAnimalDetail(animalId: string) {
  return userInstance.get(`/stores/${animalId}/animal_detail`);
}

/**
 * GET: 동일 가게 동물 리스트
 */
export async function getSameStoreAnimals(storeId: number) {
  return userInstance.get(`stores/${storeId}/animals`);
}

/**
 * GET: 동일 종 동물 리스트
 */
export async function getSameSpeciesAnimals(speciesId: number) {
  return userInstance.get(`/species/${speciesId}`);
}
