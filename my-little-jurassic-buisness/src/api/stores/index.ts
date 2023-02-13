import { instance } from "..";

/**
 * 가게 동물 목록
 */
export function getStoreAnimal(animalStoreId: string | number) {
  return instance.get(`/stores/${animalStoreId}/animals`);
}
