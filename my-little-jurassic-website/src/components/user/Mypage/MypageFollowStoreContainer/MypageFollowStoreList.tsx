import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getLikeStores } from "../../../../api";
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
  /* 더미데이터
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
  */

  const [followStoreList, setFollowStoreList] = useState<IStore[]>([]);
  const params = useParams();
  useEffect(() => {
    if (params.user_id)
      getLikeStores(params.user_id)
        .then((val) => setFollowStoreList(val.data.stores))
        .catch((e) => console.log(e));
  }, [params.user_id]);
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
