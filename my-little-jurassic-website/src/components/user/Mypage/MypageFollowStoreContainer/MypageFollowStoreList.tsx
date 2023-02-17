import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getLikeStores } from "../../../../api";
import { FreeModeSwiper } from "../../../common/swiper";
import MypageFollowStoreItem from "./MypageFollowStoreItem";

export interface IStore {
  animalStoreId: number;
  storeName: string;
  id: number;
  tel: string;
  address: string;
  img: string;
}

const MypageFollowStoreList = () => {
  const [followStoreList, setFollowStoreList] = useState<IStore[]>([]);
  const params = useParams();

  // 서버로부터 팔로우 가게 정보를 가져옵니다
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
