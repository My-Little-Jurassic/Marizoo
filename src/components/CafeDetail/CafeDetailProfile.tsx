import React, { useState } from "react";
import styled from "styled-components";

import { TbMapPin, TbClock, TbPhone, TbMail } from "react-icons/tb";
import { Grid } from "@mui/material";
import { GreenBtn } from "../common/button";
import { ICafeDetail } from "./type";

function CafeDetailProfile(props: { cafeInfo: ICafeDetail }) {
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <StyledCafeDetailProfile>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={12}>
          <StyledProfileImg imgSrc={props.cafeInfo.prifileImg}>
            <p>{props.cafeInfo.storename}</p>
            <GreenBtn
              label={isFollowed ? "팔로우 취소" : "팔로우"}
              type={isFollowed ? 2 : 0}
              isDisable={false}
              onClick={() => setIsFollowed(!isFollowed)}
            ></GreenBtn>
          </StyledProfileImg>
        </Grid>
        <Grid item xs={12} sm={7} md={12}>
          <StyledProfileContent>
            <p>{props.cafeInfo.description}</p>
            <StyledProfileContentRow>
              <TbMapPin></TbMapPin>
              <span>{props.cafeInfo.address}</span>
            </StyledProfileContentRow>
            <StyledProfileContentRow>
              <TbClock></TbClock>
              <span>{props.cafeInfo.openingHours}</span>
            </StyledProfileContentRow>
            <StyledProfileContentRow>
              <TbPhone></TbPhone>
              <a href={`tel:${props.cafeInfo.tel}`}>{props.cafeInfo.tel}</a>
            </StyledProfileContentRow>
            <StyledProfileContentRow>
              <TbMail></TbMail>
              <a href={`mailto:${props.cafeInfo.email}`}>{props.cafeInfo.email}</a>
            </StyledProfileContentRow>
          </StyledProfileContent>
        </Grid>
      </Grid>
    </StyledCafeDetailProfile>
  );
}

export default CafeDetailProfile;

const StyledCafeDetailProfile = styled.aside`
  padding-inline: 16px;
  box-sizing: border-box;
  width: 100%;
  @media screen and (max-width: 900px) {
    margin-top: 10vh;
  }
`;

const StyledProfileImg = styled.div<{ imgSrc: string }>`
  ${(props) => props.theme.shadow}
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 100%;
  min-height: 320px;
  height: 100%;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(2, 0, 36, 0) 40%, rgba(0, 0, 0, 0.7) 100%),
    url(${({ imgSrc }) => imgSrc});
  background-size: cover;
  & p {
    ${(props) => props.theme.shadow}
    font: ${({ theme }) => theme.fonts.display5};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
    margin-bottom: 8px;
  }
  & button {
    margin-bottom: 32px;
  }
`;

const StyledProfileContent = styled.div`
  ${(props) => props.theme.shadow}
  width: 100%;
  height: 100%;
  border-radius: 32px;
  background: ${({ theme }) => theme.colors.secondaryBg};
  & > :first-child {
    padding: 32px 32px 16px 32px;
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: ${({ theme }) => theme.colors.green};
  }
  & > :last-child {
    margin-bottom: 32px;
  }
`;

const StyledProfileContentRow = styled.p`
  padding-inline: 32px;
  display: flex;
  align-items: center;
  & > * {
    margin-left: 8px;
    margin-block: 8px;
    text-decoration: none;
    font: ${({ theme }) => theme.fonts.subContent};
    color: ${({ theme }) => theme.colors.secondaryText};
  }
  & *:first-child {
    flex-shrink: 0;
  }
`;
