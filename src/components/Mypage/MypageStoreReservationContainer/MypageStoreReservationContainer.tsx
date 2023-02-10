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

const StyledDiv = styled.div``;

export default MypageStoreReservationContainer;
