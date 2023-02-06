import React from "react";
import styled from "styled-components";
import { PediaContainer } from "../../components/Pedia";

const Pedia = (): JSX.Element => {
  return (
    <StyledPedia>
      <PediaContainer></PediaContainer>
    </StyledPedia>
  );
};

export default Pedia;
const StyledPedia = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primaryBg};
`;
