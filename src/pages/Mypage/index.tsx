import React from "react";
import styled from "styled-components";
import {
  MypageBadgeContainer,
  MypageFollowStoreContainer,
  MypageFooter,
  MypageHeader,
  MypageStoreReservationContainer,
} from "../../components/Mypage";

const Mypage = (): JSX.Element => {
  return (
    <StyledMain>
      <MypageHeader />
      <MypageBadgeContainer />
      <MypageFollowStoreContainer />
      <MypageStoreReservationContainer />
      <MypageFooter />
    </StyledMain>
  );
};

const StyledMain = styled.main`
  width: 100vw;
  max-width: 1056px;
  height: 100vh;
  margin: auto;
  padding: 60px 16px;
`;

export default Mypage;
