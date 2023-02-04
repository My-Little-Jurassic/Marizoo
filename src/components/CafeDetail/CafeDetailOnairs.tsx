import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { CardLabelLarge } from "../common/card";

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
    ],
  },
];

function CafeDetailOnairs() {
  const onairSwiper = dataList.map((data, index) => (
    <Link to={"/"} key={`data-${index}`} style={{ textDecoration: "none" }}>
      <StyledCafeOnairs>
        <CardLabelLarge
          title={data.title}
          thumbnailSrc={data.thumbnail}
          classficationImgList={data.classificationsImgs}
        ></CardLabelLarge>
      </StyledCafeOnairs>
    </Link>
  ));

  return <StyledCafeDetailOnairs>{onairSwiper}</StyledCafeDetailOnairs>;
}

export default CafeDetailOnairs;

const StyledCafeDetailOnairs = styled.section`
  white-space: nowrap;
  overflow: auto;
  display: flex;
  align-items: center;
  padding-block: 16px;
`;

const StyledCafeOnairs = styled.div`
  width: 285px;
  margin: 16px;
`;
