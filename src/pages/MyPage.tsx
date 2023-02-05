import React from "react";
import styled from "styled-components";

import { MyPageFollowingStore } from "../components/MyPage";

const MyPage = function () {
  return (
    <StyledContainer>
      <MyPageFollowingStore />
    </StyledContainer>
  );
};

export default MyPage;

const StyledContainer = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 96px 8.75vw 32px;
  background-color: ${(props) => props.theme.colors.primaryBg};
  display: flex;
  flex-direction: column;
  gap: 64px;
  @media screen and (max-width: 440px) {
    padding: 96px 2vw 32px;
  }
`;
