import instance from "..";

/**
 * GET: 예약 정보
 */
export async function getReservationDetail(cafe_id: string, play_id: string) {
  return instance.get(`/stores/${cafe_id}/plays/${play_id}`);
}

/**
 * POST: 예약하기
 */
export async function makeReservation(uid: string, playId: string, totalVisitor: number) {
  return instance.post(`/stores/books`, { uid, playId, totalVisitor });
}
