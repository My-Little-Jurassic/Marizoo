import React from "react";
import styled from "styled-components";
import MypageStoreReservationList from "./MypageStoreReservationList";

const MypageStoreReservationContainer = () => {
  return (
    <StyledDiv>
      <h2>예약 목록</h2>
      <MypageStoreReservationList />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  margin-top: 312px;
  /* position: absolute; */
  padding-bottom: 16px;
  box-sizing: border-box;
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > h2 {
    box-sizing: border-box;
    max-width: 1088px;
    width: 100%;
    padding: 0 16px;
  }
  & > div {
    overflow: visible;
    box-sizing: border-box;
    padding: 0 16px;
    width: 100%;
    max-width: 1088px;
  }
  & .swiper-wrapper {
    flex-wrap: wrap;
    width: max-content;
    & > div {
      flex: 1;
      min-width: 320px;
    }
  }
`;

export default MypageStoreReservationContainer;
