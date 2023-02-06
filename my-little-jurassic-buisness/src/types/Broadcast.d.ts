export interface IAnimal {
  id: number;
  name: string;
  select: boolean;
  classification: string;
}

export interface IFeed {
  id: number;
  name: string;
  img: string;
  numberOfVotes: number;
}

export type TStatus = "DEFAULT" | "RESERVE" | "ONAIR" | "FINISH";

export interface IVote {
  title: string;
  result: string;
  status: TStatus;
  options: IFeed[];
}

export interface IBroadcastStatus {
  sessionId: string;
  viewers: number;
  likes: number;
  vote: IVote | null;
  status: TStatus;
}

export interface IBroadcastSetting {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  animals: IAnimal[];
  videoDevice: null;
  audioDevice: null;
}
