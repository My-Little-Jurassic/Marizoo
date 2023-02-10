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

const StyledDiv = styled.div``;

export default MypageFollowStoreContainer;
