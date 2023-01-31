import React from "react";
import styled from "styled-components";
import { HomeNav } from "../../components/common/navbar";

function Home() {
  return (
    <StyledMain>
      <HomeNav></HomeNav>
      <Box></Box>
    </StyledMain>
  );
}

export default Home;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryBg};
`;

const Box = styled.div`
  height: 4000px;
  width: 100px;
  max-width: 1056px;
  background: blue;
`;
