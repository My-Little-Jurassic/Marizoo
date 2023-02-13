export interface IAnimalInfo {
  age: number;
  feature: string;
  gender: string;
  img: string;
  length: number;
  name: string;
  weight: number;
}

export interface IBroadcastInfo {
  broadcastId: number;
  sessionId: number;
  onAir: boolean;
}

export interface IFeed {
  name: string;
  img: string;
}

export interface ISpeciesInfo {
  classification: string;
  classificationImg: string;
  habitat: string;
  info: string;
  lifeSpan: number;
  speciesId: number;
}

export interface IStoreInfo {
  img: string;
  storeId: number;
  storeName: string;
}

export interface IStoreAnimalInfo {
  classification: string;
  gender: string;
  id: number;
  img: string;
  name: string;
}
