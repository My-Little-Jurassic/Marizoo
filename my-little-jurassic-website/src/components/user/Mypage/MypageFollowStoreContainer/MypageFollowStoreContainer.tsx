import React from "react";
import styled from "styled-components";
import MypageFollowStoreList from "./MypageFollowStoreList";

const MypageFollowStoreContainer = () => {
  return (
    <StyledDiv>
      <h2>팔로우중인 가게</h2>
      <MypageFollowStoreList />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: absolute;
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
    margin: 0;
    flex-wrap: wrap;
    width: max-content;
    & > div {
      flex: 1;
      min-width: 320px;
    }
  }
`;

export default MypageFollowStoreContainer;
