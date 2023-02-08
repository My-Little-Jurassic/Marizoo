export interface IBroadcastInfo {
  title: string;
  description: string;
}

export interface IAnimalInfo {
  id: number;
  name: string;
  gender: string;
  classification: string;
  profile: string;
}

export interface IStoreInfo {
  id: number;
  name: string;
  profile: string;
}

export interface IRelatedBroadcastInfo {
  id: number;
  title: string;
  thumbnail: string;
}

export interface IFeed {
  id: number;
  name: string;
  img: string;
}
