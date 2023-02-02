import React from "react";
import styled from "styled-components";

import { CafeMap } from "../../components/Cafe";

function Cafe() {
  return (
    <StyledCafe>
      <StyledCafeMain>
        <CafeMap />
      </StyledCafeMain>
    </StyledCafe>
  );
}

export default Cafe;

const StyledCafe = styled.div`
  width: 100%
  height: 100%
`;

const StyledCafeMain = styled.main`
  position: absolute;
  width: 100%;
  height: calc(100vh - 124px);
  @media screen and (max-width: 600px) {
    top: 60px;
  }
  @media screen and (min-width: 600px) {
    top: 140px;
  }
`;
