import React from "react";
import styled from "styled-components";

import { Grid } from "@mui/material";

import CardLabelLarge from "../../common/card/CardLabelLarge/CardLabelLarge";

const itemList: any[] = [];
for (let i = 0; i < 10; i++) {
  itemList.push(
    <Grid item xs={12} sm={6} md={4}>
      <CardLabelLarge
        title={"label"}
        thumbnailSrc={"https://picsum.photos/200/300"}
        classficationImgList={["https://picsum.photos/200/300"]}
      ></CardLabelLarge>
    </Grid>,
  );
}

function LiveGrid() {
  return (
    <LiveGridContainer>
      <ContainerTitle>지금 진행중인 방송이에요</ContainerTitle>
      <Grid container spacing={4}>
        {itemList}
      </Grid>
    </LiveGridContainer>
  );
}

export default LiveGrid;

const LiveGridContainer = styled.div`
  width: 90%;
  max-width: 927px;
  @media screen and (max-width: 900px) {
    max-width: 620px;
  }
`;

const ContainerTitle = styled.h3`
  font: ${(props) => props.theme.fonts.header3};
  color: ${(props) => props.theme.colors.primaryText};
  margin-bottom: 16px;
`;
