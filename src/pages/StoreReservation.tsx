import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  StoreReservationProfile,
  StoreReservationInfo,
  StoreReservationNotice,
  StoreReservationCompleteModal,
} from "../components/StoreReservation";
import { IPlayInfo, IStoreInfo } from "../components/StoreReservation/type";

const StoreReservation = function () {
  const params = useParams();

  const [playInfo, setPlayInfo] = useState<IPlayInfo | null>(null);
  const [storeInfo, setStoreInfo] = useState<IStoreInfo | null>(null);

  // playInfo에 description 담아져서 오는게 맞는지?
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/stores/${params.cafe_id}/plays/${params.play_id}`,
    })
      .then((res) => {
        const tmpPlayInfo = res.data.playInfo;
        const dateTime = tmpPlayInfo.playDateTime;
        tmpPlayInfo.playDateTime = dateTime.slice(0, 10) + " " + dateTime.slice(11, 16);
        setPlayInfo(tmpPlayInfo);
        setStoreInfo(res.data.storeInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  const [numberOfVisitor, setNumberOfVisitor] = useState<number | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);

  return (
    <StyledContainer>
      {playInfo && storeInfo && (
        <>
          {isCompleteModalOpen && (
            <StoreReservationCompleteModal playInfo={playInfo} numberOfVisitor={numberOfVisitor} />
          )}
          <StyledLeftSide>
            <StoreReservationProfile storeInfo={storeInfo} />
            <StoreReservationInfo
              playInfo={playInfo}
              changeNumberOfVisitor={(newNumberOfVisitor) => setNumberOfVisitor(newNumberOfVisitor)}
            />
          </StyledLeftSide>
          <StyledRightSide>
            <StoreReservationNotice
              playInfo={playInfo}
              numberOfVisitor={numberOfVisitor}
              openCompleteModal={() => setIsCompleteModalOpen(true)}
            />
          </StyledRightSide>
        </>
      )}
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
