import React from "react";
import styled from "styled-components";
import CafeDetailAnimals from "./CafeDetailAnimals";
import CafeDetailOnairs from "./CafeDetailOnairs";
import CafeDetailPlays from "./CafeDetailPlays";
import { ICafeDetail } from "./type";

function CafeDetailMain(props: { cafeInfo: ICafeDetail }) {
  return (
    <StyledCafeDetailMain>
      <h3>{props.cafeInfo.storename} 식구들</h3>
      <CafeDetailAnimals cafeId={props.cafeInfo.storeId}></CafeDetailAnimals>
      <h3>지금 스트리밍 중!</h3>
      <CafeDetailOnairs cafeId={props.cafeInfo.storeId}></CafeDetailOnairs>
      <h3>체험 프로그램 예약</h3>
      <CafeDetailPlays cafeId={props.cafeInfo.storeId}></CafeDetailPlays>
    </StyledCafeDetailMain>
  );
}

export default React.memo(CafeDetailMain);

const StyledCafeDetailMain = styled.div`
  min-height: 100vh;
  & > h3 {
    font: ${({ theme }) => theme.fonts.header3};
    color: ${({ theme }) => theme.colors.primaryText};
    padding-inline: 16px;
  }
  & .free-mode-swiper {
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    margin-bottom: 32px;
  }
  @media screen and (min-width: 900px) {
    margin-top: 220px;
  }
`;
