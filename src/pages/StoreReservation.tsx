import React, { useState } from "react";
import styled from "styled-components";
import {
  StoreReservationProfile,
  StoreReservationInfo,
  StoreReservationNotice,
  StoreReservationCompleteModal,
} from "../components/StoreReservation";

// /stores/{store_id}/plays/{play_id}
const sampleStorePlayInfo = {
  playInfo: {
    playDateTime: "2023-02-03 09:00",
    title: "도마뱀 밥주기 체험",
    runningTime: 4,
    notice:
      "방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사 항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항 방문 유의사항",
  },
  storeInfo: {
    id: 1,
    storename: "마리쥬 파충류 카페",
    address: "서울 종로구 인사동길 23",
    tel: "02-783-4383",
  },
};

const StoreReservation = function () {
  const [numberOfVisitor, setNumberOfVisitor] = useState<number | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);

  return (
    <StyledContainer>
      {isCompleteModalOpen && (
        <StoreReservationCompleteModal
          storeId={sampleStorePlayInfo.storeInfo.id}
          playInfo={sampleStorePlayInfo.playInfo}
          numberOfVisitor={numberOfVisitor}
        />
      )}
      <StyledLeftSide>
        <StoreReservationProfile storeInfo={sampleStorePlayInfo.storeInfo} />
        <StoreReservationInfo
          playInfo={sampleStorePlayInfo.playInfo}
          changeNumberOfVisitor={(newNumberOfVisitor) => setNumberOfVisitor(newNumberOfVisitor)}
        />
      </StyledLeftSide>
      <StyledRightSide>
        <StoreReservationNotice
          playInfo={sampleStorePlayInfo.playInfo}
          numberOfVisitor={numberOfVisitor}
          openCompleteModal={() => setIsCompleteModalOpen(true)}
        />
      </StyledRightSide>
    </StyledContainer>
  );
};

export default StoreReservation;

const StyledContainer = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 96px 8.25vw;
  display: flex;
  gap: 32px;
  background: ${(props) => props.theme.colors.primaryBg};
  @media screen and (max-width: 1200px) {
    padding: 96px 2vw;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    height: 100%;
    padding: 96px 2vw 32px;
  }
`;

const StyledLeftSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 360px;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const StyledRightSide = styled.div`
  width: 50%;
  min-width: 360px;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;
