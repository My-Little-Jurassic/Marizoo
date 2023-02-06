import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { CardLabelLarge } from "../common/card";
import { FreeModeSwiper } from "../common/swiper";

const dataList = [
  {
    title: "방송 제asdfasdfasdfasdfasfasdafsf목",
    thumbnail: "https://picsum.photos/200/300",
    classificationsImgs: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
  {
    title: "방송 제목",
    thumbnail: "https://picsum.photos/200/300",
    classificationsImgs: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
  {
    title: "방송 제목",
    thumbnail: "https://picsum.photos/200/300",
    classificationsImgs: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
];

function CafeDetailOnairs() {
  const onairSwiper = dataList.map((data, index) => (
    <Link to={"/"} key={`data-${index}`} style={{ textDecoration: "none" }}>
      <CardLabelLarge
        title={data.title}
        thumbnailSrc={data.thumbnail}
        classficationImgList={data.classificationsImgs}
      ></CardLabelLarge>
    </Link>
  ));

  return (
    <FreeModeSwiper
      elementList={onairSwiper}
      slidesPerView={window.innerWidth > 600 ? 2.5 : 1.5}
      spaceBetween={16}
    ></FreeModeSwiper>
  );
}

export default CafeDetailOnairs;
