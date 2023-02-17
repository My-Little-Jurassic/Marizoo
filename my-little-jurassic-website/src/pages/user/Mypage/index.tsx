import React from "react";
import styled from "styled-components";
import {
  MypageBadgeContainer,
  MypageFollowStoreContainer,
  MypageFooter,
  MypageHeader,
  MypageStoreReservationContainer,
} from "../../../components/user/Mypage";

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
  height: auto;
  margin: auto;
  padding: 60px 16px;
  color: ${({ theme }) => theme.colors.primaryText};

  & h1 {
    color: ${({ theme }) => theme.colors.primaryText};
    font: ${({ theme }) => theme.fonts.header1};
  }
  & h2 {
    color: ${({ theme }) => theme.colors.primaryText};
    font: ${({ theme }) => theme.fonts.header2};
    margin: 56px 0 24px;
  }
  &::before {
    position: fixed;
    content: "";
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  }
`;

export default Mypage;
