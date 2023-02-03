import React from "react";
import styled from "styled-components";
import { CafeDetailProfile } from "../../components/CafeDetail";

function CafeDetail() {
  return (
    <StyledCafeDetail>
      <CafeDetailProfile></CafeDetailProfile>
    </StyledCafeDetail>
  );
}

export default CafeDetail;

const StyledCafeDetail = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
