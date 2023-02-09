import { instance } from "..";

export function getStoreAnimal(animalStoreId: string | number) {
  return instance.get(`/stores/${animalStoreId}/animals`);
}
