import React from "react";
import styled from "styled-components";

import { Grid } from "@mui/material";

import { CardLabelLarge } from "../common/card";

const itemList: JSX.Element[] = [];
for (let i = 0; i < 10; i++) {
  itemList.push(
    <Grid key={`item-${i}`} item xs={12} sm={6} md={4}>
      <CardLabelLarge
        title={"제목"}
        thumbnailSrc={"https://picsum.photos/200/300"}
        classficationImgList={["https://picsum.photos/200/300"]}
      ></CardLabelLarge>
    </Grid>,
  );
}

function HomeLiveGrid() {
  return (
    <StyledHomeLiveGrid>
      <Grid container columnSpacing={4}>
        {itemList}
      </Grid>
    </StyledHomeLiveGrid>
  );
}

export default HomeLiveGrid;

const StyledHomeLiveGrid = styled.div`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  max-width: 927px;
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
`;
