import { Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { CardLabelMedium } from "../common/card";
import { IRelatedBroadcastInfo } from "./type";

const BroadcastRecommendations = function () {
  const [relatedBroadcastList, setRelatedBroadcastList] = useState<React.ReactNode[] | null>(null);

  const params = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/broadcasts/${params.broadcast_id}/related`,
    })
      .then((res) => {
        const sampleRelatedBroadcastList = res.data.onAir.map(
          (broadcast: IRelatedBroadcastInfo) => {
            if (broadcast.id === Number(params.broadcast_id)) {
              return;
            }
            return (
              <Grid key={broadcast.id} item xs={12} sm={6} md={12}>
                <NavLink to={"/broadcast/" + broadcast.id} style={{ textDecoration: "none" }}>
                  <CardLabelMedium
                    key={broadcast.id}
                    title={broadcast.title}
                    imgSrc={broadcast.thumbnail}
                  />
                </NavLink>
              </Grid>
            );
          },
        );
        setRelatedBroadcastList(sampleRelatedBroadcastList);
      })
      .catch((err) => console.log(err));
  }, [params.broadcast_id]);

  return (
    <StyledContainer>
      {relatedBroadcastList && (
        <>
          <StyledHeader3>추천 방송</StyledHeader3>
          <Grid container columnSpacing={4}>
            {relatedBroadcastList}
          </Grid>
        </>
      )}
    </StyledContainer>
  );
};

export default BroadcastRecommendations;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledHeader3 = styled.div`
  font: ${(props) => props.theme.fonts.header3};
  color: ${(props) => props.theme.colors.primaryText};
`;
