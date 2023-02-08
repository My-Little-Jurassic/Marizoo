import React from "react";
import styled from "styled-components";

import { Grid } from "@mui/material";

import { CardLabelLarge } from "../common/card";

interface IProps {
  broadcastList: IBroadcast[];
}

function HomeLiveGrid(props: IProps) {
  // 모든 방송 정보(/broadcasts)에서는 title, thumbnail, classificationsImgs 받아옴
  // 방송 검색(/broadcasts/search)에서는 id, title, thumbnail 받아옴
  // 건의 사항 1. key 값을 위해 모든 방송 정보에서도 id가 필요
  //          2. 방송 검색에도 classificationsImgs가 필요
  const itemList: React.ReactNode[] = props.broadcastList.map((broadcast) => {
    return (
      <Grid key={broadcast.id} item xs={12} sm={6} md={4}>
        <CardLabelLarge
          title={broadcast.title}
          thumbnailSrc={broadcast.thumbnail}
          classficationImgList={broadcast.classificationImgs}
        ></CardLabelLarge>
      </Grid>
    );
  });

  return (
    <StyledHomeLiveGrid>
      {itemList.length === 0 && <StyledSpan>해당 조건의 방송이 없어요...</StyledSpan>}
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

const StyledSpan = styled.span`
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.primaryText};
`;
