import React from "react";
import { FreeModeSwiper } from "../../../common/swiper";
import MypageFollowStoreItem from "./MypageFollowStoreItem";

export interface IStore {
  storeName: string;
  id: number;
  tel: string;
  address: string;
  img: string;
}

const MypageFollowStoreList = () => {
  const followStoreList: IStore[] = [
    {
      storeName: "마리쥬 동물샵",
      id: 1,
      tel: "010-1234-1234",
      address: "대전광역시 유성구 궁동",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 동물샵",
      id: 1,
      tel: "010-1234-1234",
      address: "대전광역시 유성구 궁동",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 동물샵",
      id: 1,
      tel: "010-1234-1234",
      address: "대전광역시 유성구 궁동",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 동물샵",
      id: 1,
      tel: "010-1234-1234",
      address: "대전광역시 유성구 궁동",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 동물샵",
      id: 1,
      tel: "010-1234-1234",
      address: "대전광역시 유성구 궁동",
      img: "https://picsum.photos/200/300",
    },
  ];
  return (
    <FreeModeSwiper
      elementList={followStoreList.map((item, index) => (
        <MypageFollowStoreItem key={index} item={item} />
      ))}
      slidesPerView={3}
      spaceBetween={32}
    />
  );
};

export default MypageFollowStoreList;
