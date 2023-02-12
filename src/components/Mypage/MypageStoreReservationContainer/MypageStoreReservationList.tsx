import React from "react";
import { FreeModeSwiper } from "../../common/swiper";
import MypageStoreReservationItem from "./MypageStoreReservationItem";

type IPlayStatus = "book" | "cancel" | "finish";
export interface IStoreReservation {
  id: string; // pk
  playDateTime: string; // 방문 날짜 및 시간
  // playType: string; // 체험 유형
  title: string; // 체험 유형
  totalVisitor: number; // 총 방문자 수
  storeName: string; // 상호명, 가게명
  tel: string; // 가게 연락처
  img: string; // 체험 미리보기 이미지
  status: IPlayStatus; // 예약 상태
}

const MypageStoreReservationList = () => {
  // TODO: 예약목록 요청
  const storeReservationList: IStoreReservation[] = [
    {
      id: "1",
      playDateTime: "2023-02-13 14:00",
      title: "우파루파 밥주기",
      totalVisitor: 3,
      storeName: "마리쥬 카페",
      tel: "01012341234",
      img: "https://picsum.photos/200/300",
      status: "book",
    },
    {
      id: "2",
      playDateTime: "2023-02-13 14:00",
      title: "귀여운 뱀과 저녁식사",
      totalVisitor: 3,
      storeName: "마리쥬 카페",
      tel: "01012341234",
      img: "https://picsum.photos/200/300",
      status: "cancel",
    },
    {
      id: "3",
      playDateTime: "2023-02-13 14:00",
      title: "레오파드게코 체험",
      totalVisitor: 3,
      storeName: "마리쥬 카페",
      tel: "01012341234",
      img: "https://picsum.photos/200/300",
      status: "finish",
    },
    {
      id: "4",
      playDateTime: "2023-02-13 14:00",
      title: "아몰라좀 긴 체험이될것이다",
      totalVisitor: 3,
      storeName: "마리쥬 카페",
      tel: "01012341234",
      img: "https://picsum.photos/200/300",
      status: "finish",
    },
  ];
  return (
    <FreeModeSwiper
      elementList={storeReservationList.map((item, index) => (
        <MypageStoreReservationItem key={index} item={item} />
      ))}
      slidesPerView={4}
      spaceBetween={32}
    />
  );
};

export default MypageStoreReservationList;
