import React from "react";
import styled from "styled-components";

import { HomeNav } from "../../components/common/navbar";
import { LiveGrid } from "../../components/Home";

function Home() {
  return (
    <StyledMain>
      <HomeNav></HomeNav>
      <div>search</div>
      <div>filter</div>
      <LiveGrid></LiveGrid>
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
