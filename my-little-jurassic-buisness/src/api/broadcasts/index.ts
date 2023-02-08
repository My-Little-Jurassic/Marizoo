import { instance } from "..";

export function postBroadcast(body: FormData) {
  return instance.post("/broadcasts", body, { headers: { "Content-Type": "multipart/form-data" } });
}
