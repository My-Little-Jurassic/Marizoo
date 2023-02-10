import React from "react";
import styled from "styled-components";
import { GrayBtn } from "../common/button";

const MypageHeader = () => {
  const nickname = "nickname";
  return (
    <StyledHeader>
      <h1>{nickname}님의 마이페이지</h1>
      <GrayBtn label={"회원정보 수정"} type={2} isDisable={false} />
    </StyledHeader>
  );
};

const StyledHeader = styled.header``;

export default MypageHeader;
