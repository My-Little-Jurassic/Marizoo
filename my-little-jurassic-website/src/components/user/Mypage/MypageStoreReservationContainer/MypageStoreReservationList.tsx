import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserBooks } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { selectModal, setContentData } from "../../../../store/modalSlice";
import { FreeModeSwiper } from "../../../common/swiper";
import MypageStoreReservationItem from "./MypageStoreReservationItem";

export type TPlayStatus = "BOOK" | "CANCEL" | "FINISH";
export interface IStoreReservation {
  id: string; // pk
  playDateTime: string; // 방문 날짜 및 시간
  // playType: string; // 체험 유형
  title: string; // 체험 유형
  totalVisitor: number; // 총 방문자 수
  storeName: string; // 상호명, 가게명
  tel: string; // 가게 연락처
  img: string; // 체험 미리보기 이미지
  status: TPlayStatus; // 예약 상태
}

const MypageStoreReservationList = () => {
  // TODO: 예약목록 요청
  // const storeReservationList: IStoreReservation[] = [
  //   {
  //     id: "1",
  //     playDateTime: "2023-02-13 14:00",
  //     title: "우파루파 밥주기",
  //     totalVisitor: 3,
  //     storeName: "마리쥬 카페",
  //     tel: "01012341234",
  //     img: "https://picsum.photos/200/300",
  //     status: "BOOK",
  //   },
  //   {
  //     id: "2",
  //     playDateTime: "2023-02-13 14:00",
  //     title: "귀여운 뱀과 저녁식사",
  //     totalVisitor: 3,
  //     storeName: "마리쥬 카페",
  //     tel: "01012341234",
  //     img: "https://picsum.photos/200/300",
  //     status: "CANCEL",
  //   },
  //   {
  //     id: "3",
  //     playDateTime: "2023-02-13 14:00",
  //     title: "레오파드게코 체험",
  //     totalVisitor: 3,
  //     storeName: "마리쥬 카페",
  //     tel: "01012341234",
  //     img: "https://picsum.photos/200/300",
  //     status: "FINISH",
  //   },
  //   {
  //     id: "4",
  //     playDateTime: "2023-02-13 14:00",
  //     title: "아몰라좀 긴 체험이될것이다",
  //     totalVisitor: 3,
  //     storeName: "마리쥬 카페",
  //     tel: "01012341234",
  //     img: "https://picsum.photos/200/300",
  //     status: "FINISH",
  //   },
  // ];
  const [storeReservationList, setStoreReservationList] = useState<IStoreReservation[]>([]);
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectModal);
  useEffect(() => {
    dispatch(setContentData(""));
  }, []);
  useEffect(() => {
    // data는 cancelBook에서 예약 취소 성공 시 data가 비게 되므로 업데이트
    if (params.user_id && !data)
      getUserBooks(params.user_id)
        .then((val) => setStoreReservationList(val.data.books))
        .catch((e) => console.log(e));
  }, [params.user_id, data]);

  return (
    <FreeModeSwiper
      elementList={storeReservationList.map((item, index) => (
        <MypageStoreReservationItem key={index} item={item} />
      ))}
      slidesPerView={"auto"}
      spaceBetween={32}
    />
  );
};

export default MypageStoreReservationList;
