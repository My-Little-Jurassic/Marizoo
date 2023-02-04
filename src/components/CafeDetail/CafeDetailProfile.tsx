import React, { useState } from "react";
import styled from "styled-components";

import { TbMapPin, TbClock, TbPhone, TbMail } from "react-icons/tb";
import { Grid } from "@mui/material";
import { GreenBtn } from "../common/button";

interface IProps {
  data: {
    store_name: string;
    description: string;
    address: string;
    opening_hours: string;
    tel: string;
    email: string;
    prifile_img: string;
    lat: number;
    lng: number;
  };
}

function CafeDetailProfile(props: IProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <StyledCafeDetailProfile>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={12}>
          <StyledProfileImg imgSrc={props.data.prifile_img}>
            <p>{props.data.store_name}</p>
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
            <p>{props.data.description}</p>
            <StyledProfileContentRow>
              <TbMapPin></TbMapPin>
              <span>{props.data.address}</span>
            </StyledProfileContentRow>
            <StyledProfileContentRow>
              <TbClock></TbClock>
              <span>{props.data.opening_hours}</span>
            </StyledProfileContentRow>
            <StyledProfileContentRow>
              <TbPhone></TbPhone>
              <a href={`tel:${props.data.tel}`}>{props.data.tel}</a>
            </StyledProfileContentRow>
            <StyledProfileContentRow>
              <TbMail></TbMail>
              <a href={`mailto:${props.data.email}`}>{props.data.email}</a>
            </StyledProfileContentRow>
          </StyledProfileContent>
        </Grid>
      </Grid>
    </StyledCafeDetailProfile>
  );
}

export default CafeDetailProfile;

const StyledCafeDetailProfile = styled.aside`
  width: 100%;
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
    margin-block: 4px;
    font: ${({ theme }) => theme.fonts.subContent};
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;
