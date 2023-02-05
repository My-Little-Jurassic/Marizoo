import React from "react";
import styled from "styled-components";
import SideBgLeft from "./SideBgLeft";
import SideBgRight from "./SideBgRight";

function SideBg() {
  return (
    <StyledSideBg>
      <SideBgLeft></SideBgLeft>
      <SideBgRight></SideBgRight>
    </StyledSideBg>
  );
}

export default React.memo(SideBg);

const StyledSideBg = styled.div`
  position: fixed;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.primaryBg};
`;
