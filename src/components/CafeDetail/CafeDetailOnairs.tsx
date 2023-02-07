import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { CardLabelLarge } from "../common/card";
import { FreeModeSwiper } from "../common/swiper";
import { ICafeOnair } from "./type";
import { getStoreBroadcastsList } from "../../api";

function CafeDetailOnairs(props: { cafeId: number }) {
  const [cafeOnairList, setCafeOnairList] = useState<ICafeOnair[]>();
  const [onairSwiper, setOnairSwiper] = useState<JSX.Element[]>();

  useEffect(() => {
    getStoreBroadcastsList(String(props.cafeId))
      .then((res) => {
        setCafeOnairList(res.data.onAir);
      })
      .catch((e) => {
        console.log("카페 동물 정보 요청 실패", e);
      });
  }, []);

  useEffect(() => {
    if (cafeOnairList) {
      const newOnairSwiper = cafeOnairList.map((onair, index) => (
        <Link to={"/"} key={`data-${index}`} style={{ textDecoration: "none" }}>
          <CardLabelLarge
            title={onair.title}
            thumbnailSrc={onair.thumbnail}
            classficationImgList={onair.classificationImgs}
          ></CardLabelLarge>
        </Link>
      ));
      setOnairSwiper(newOnairSwiper);
    }
  }, [cafeOnairList]);

  return (
    <div>
      {onairSwiper && (
        <FreeModeSwiper
          elementList={onairSwiper}
          slidesPerView={window.innerWidth > 600 ? 2.5 : 1.5}
          spaceBetween={16}
        ></FreeModeSwiper>
      )}
    </div>
  );
}

export default CafeDetailOnairs;
