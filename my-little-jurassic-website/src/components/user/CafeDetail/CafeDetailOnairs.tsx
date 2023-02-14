import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CardLabelLarge } from "../../common/card";
import { FreeModeSwiper } from "../../common/swiper";
import { ICafeOnair } from "./type";
import { getStoreBroadcastsList } from "../../../api";
import styled from "styled-components";

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
        <Link
          to={`/broadcast/${onair.id}/${onair.sessionId}`}
          key={`data-${index}`}
          style={{ textDecoration: "none" }}
        >
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
    <>
      {cafeOnairList && (
        <>
          {cafeOnairList.length > 0 ? (
            <div>
              {onairSwiper && (
                <FreeModeSwiper
                  elementList={onairSwiper}
                  slidesPerView={window.innerWidth > 600 ? 2.5 : 1.5}
                  spaceBetween={16}
                ></FreeModeSwiper>
              )}
            </div>
          ) : (
            <StyledSpan>현재 스트리밍 중인 방송이 없어요</StyledSpan>
          )}
        </>
      )}
    </>
  );
}

export default React.memo(CafeDetailOnairs);

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContent};
  color: ${(props) => props.theme.colors.primaryText};
  display: inline-block;
  box-sizing: border-box;
  margin: 16px 16px 48px;
`;
