import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { HomeNav } from "../../components/common/navbar";
import { CafeList, CafeMap } from "../../components/Cafe";

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
  position: relative;
  width: 100%;
  height: calc(100vh - 142px);
  background-color: black;
`;
