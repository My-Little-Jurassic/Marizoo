import React from "react";
import styled from "styled-components";
import { GrayBtn } from "../../common/button";

const MypageFooter = () => {
  return (
    <StyledFooter>
      <GrayBtn label={"회원탈퇴"} type={2} isDisable={false} />
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export default MypageFooter;
