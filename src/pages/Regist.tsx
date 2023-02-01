import React from "react";
import styled from "styled-components";
import { Side, RegistContainer } from "../components/Regist";

const StyledMain = styled.main``;

const Regist = () => {
  return (
    <StyledMain>
      <Side />
      <RegistContainer />
    </StyledMain>
  );
};

export default Regist;
