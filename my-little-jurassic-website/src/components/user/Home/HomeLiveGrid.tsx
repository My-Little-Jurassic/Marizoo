import React from "react";
import styled from "styled-components";

import { Grid } from "@mui/material";

import { CardLabelLarge } from "../../common/card";
import { NavLink } from "react-router-dom";

interface IProps {
  broadcastList: IBroadcast[];
}

function HomeLiveGrid(props: IProps) {
  const itemList: React.ReactNode[] = props.broadcastList.map((broadcast) => {
    return (
      <Grid key={broadcast.id} item xs={12} sm={6} md={4}>
        <NavLink
          to={`/broadcast/${broadcast.id}/${broadcast.sessionId}`}
          style={{ textDecoration: "none" }}
        >
          <CardLabelLarge
            title={broadcast.title}
            thumbnailSrc={broadcast.thumbnail}
            classficationImgList={broadcast.classificationImgs}
          ></CardLabelLarge>
        </NavLink>
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
