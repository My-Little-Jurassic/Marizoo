import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CafeBg from "../../components/CafeDetail/CafeBg";
import CafeDetailMain from "../../components/CafeDetail/CafeDetailMain";

import CafeDetailProfile from "../../components/CafeDetail/CafeDetailProfile";

const data = {
  store_name: "마리쥬 파충파충카페",
  description:
    "없으면, 얼마나 이것이야말로 인도하겠다는 만천하의 봄바람이다. 그러므로 그와 청춘의 얼마나 것은 듣는다. 생명을 청춘이 피고 그와 같으며, 끓는 풀밭에 것이다.",
  address: "서울 종로구 인사동길 23",
  opening_hours: "15:00",
  tel: "010-215-5512",
  email: "asdf@gmail.com",
  prifile_img: "https://picsum.photos/200/300",
  lat: 37.5512,
  lng: 127.1523,
};

function CafeDetail() {
  return (
    <StyledCafeDetail>
      <StyledCafeBg>
        <CafeBg lat={data.lat} lng={data.lng}></CafeBg>
      </StyledCafeBg>
      <StyledCafeDetailGrid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <CafeDetailProfile data={data}></CafeDetailProfile>
          </Grid>
          <Grid item xs={12} md={8}>
            <CafeDetailMain data={data}></CafeDetailMain>
          </Grid>
        </Grid>
      </StyledCafeDetailGrid>
    </StyledCafeDetail>
  );
}

export default CafeDetail;

const StyledCafeDetail = styled.main`
  z-index: -99;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryBg};
`;

const StyledCafeBg = styled.div`
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 280px;
  margin-top: 60px;
`;

const StyledCafeDetailGrid = styled.div`
  margin-top: 160px;
  width: calc(100% - 32px);
  max-width: 1056px;
`;
