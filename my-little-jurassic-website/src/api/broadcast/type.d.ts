/**
 * 뱃지 획득 관련 현황
 */
export interface IModifyUserBadgeInfoData {
  userId: number | string;
  effectCount: number;
  feedCount: number;
  watchTime: number;
}

export interface IPostBroadcastInfo {
  animalStoreId: string;
  title: string;
  description: string;
  thumbnail: Blob | null;
  animalIdList: string[];
}

export interface IPostBroadcastInfoRes {
  broadcastId: number;
  sessionId: string;
  connectionToken: string;
}

export interface IPostBroadcastFeeds {
  animalIdList: number[];
}

export interface IPostBroadcastBadge {
  userIdList: number[];
  badgeId: number;
}

export interface IVoteTarget {
  feedId: string;
  count: number;
}

export interface IPostBroadcastEnd {
  title: string;
  result: IVoteTarget[];
}
