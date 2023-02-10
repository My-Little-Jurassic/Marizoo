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

export type TVoteStatus = "default" | "proceeding" | "finish";
export type TStatus = "DEFAULT" | "RESERVE" | "ONAIR" | "FINISH";

export interface IVote {
  winnerFeed: number;
  voteStatus: TVoteStatus;
  options: IFeed[];
}

export interface IBroadcastVariable {
  viewers: number;
  likes: number;
  vote: IVote;
}

export interface IBroadcastStatus extends IBroadcastVariable {
  sessionId: string;
  pk: number;
}

export interface IBroadcastSetting {
  id: string;
  status: TStatus;
  title: string;
  description: string;
  thumbnail: Blob | null;
  animalIdList: number[];
  videoDevice: string | undefined;
  audioDevice: undefined;
}

export type TUserId = string;
export type TConnectionId = string;
