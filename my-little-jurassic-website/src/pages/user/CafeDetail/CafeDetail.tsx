import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { getStoreDetail } from "../../../api";
import CafeBg from "../../../components/user/CafeDetail/CafeBg";
import CafeDetailMain from "../../../components/user/CafeDetail/CafeDetailMain";
import CafeDetailProfile from "../../../components/user/CafeDetail/CafeDetailProfile";
import { GrayBtn } from "../../../components/common/button";
import { useAppSelector } from "../../../store";

interface ICafeInfo {
  storeId: number;
  storename: string;
  description: string;
  address: string;
  openingHours: string;
  tel: string;
  email: string;
  profileImg: string;
  lat: number;
  lng: number;
  following: boolean;
}

function CafeDetail() {
  const [cafeInfo, setCafeInfo] = useState<ICafeInfo>();
  const pk = useAppSelector((state) => state.user.pk);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if (params.cafe_id) {
      getStoreDetail(params.cafe_id, pk)
        .then((res) => {
          console.log("================");
          setCafeInfo(res.data);
        })
        .catch((e) => {
          console.log("카페 상세 정보 요청 실패", e);
          navigate("/404");
        });
    }
  }, [params.cafe_id, pk]);

  return (
    <StyledCafeDetail>
      <StyledCafeBg>
        {cafeInfo && <CafeBg lat={cafeInfo.lat} lng={cafeInfo.lng}></CafeBg>}
      </StyledCafeBg>
      <StyledCafeDetailGrid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <GrayBtn
              label="뒤로가기"
              type={2}
              isDisable={false}
              onClick={() => navigate(-1)}
            ></GrayBtn>
            {cafeInfo && <CafeDetailProfile cafeInfo={cafeInfo}></CafeDetailProfile>}
          </Grid>
          <Grid item xs={12} md={8}>
            {cafeInfo && <CafeDetailMain cafeInfo={cafeInfo}></CafeDetailMain>}
          </Grid>
        </Grid>
      </StyledCafeDetailGrid>
    </StyledCafeDetail>
  );
}

export default React.memo(CafeDetail);

const StyledCafeDetail = styled.main`
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
  height: 340px;
`;

const StyledCafeDetailGrid = styled.div`
  margin-top: 60px;
  width: 100%;
  max-width: 1056px;
  & button {
    margin: 16px;
    margin-bottom: 64px;
  }
`;
