import { userInstance } from "..";

/**
 * GET: 예약 정보
 */
export async function getReservationDetail(cafe_id: string, play_id: string) {
  return userInstance.get(`/stores/${cafe_id}/plays/${play_id}`);
}

/**
 * POST: 예약하기
 */
export async function makeReservation(uid: string, playId: string, totalVisitor: number) {
  return userInstance.post(`/stores/books`, { uid, playId, totalVisitor });
}
