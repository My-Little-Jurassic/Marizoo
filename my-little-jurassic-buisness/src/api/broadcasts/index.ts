import { instance } from "..";
import { IPostBroadcastBadge, IPostBroadcastFeeds, IPostBroadcastInfoRes } from "./types";

export function postBroadcast(body: FormData) {
  return instance.post<IPostBroadcastInfoRes>("/broadcasts", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function postBroadcastFeeds(body: IPostBroadcastFeeds) {
  return instance.post("/broadcasts/feeds", body);
}

export function postBroadcastBadge(body: IPostBroadcastBadge) {
  return instance.post("/broadcasts/badge", body);
}
