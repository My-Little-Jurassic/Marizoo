import React, { useState } from "react";
import styled from "styled-components";

import { TbMapPin, TbClock, TbPhone, TbMail } from "react-icons/tb";
import { Grid } from "@mui/material";
import { ICafeDetail } from "./type";
import { TbCheck } from "react-icons/tb";
import { followStore } from "../../../api";
import { useAppSelector } from "../../../store";

function CafeDetailProfile(props: { cafeInfo: ICafeDetail }) {
  const [isFollowed, setIsFollowed] = useState(props.cafeInfo.following);
  const pk = useAppSelector((state) => state.user.pk);

  const follow = () => {
    if (!pk || isFollowed) {
      return;
    }
    followStore(pk, String(props.cafeInfo.storeId))
      .then((res) => {
        console.log("팔로우 성공", res.data);
        setIsFollowed(true);
      })
      .catch((e) => console.log("팔로우 실패", e));
  };

  // const userId = useAppSelector((state) => state.user.uid);

  return (
    <StyledCafeDetailProfile>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={12}>
          <StyledProfileImg imgSrc={props.cafeInfo.profileImg} isFollowed={isFollowed}>
            <p>{props.cafeInfo.storename}</p>
            {pk && (
              <div onClick={() => follow()}>
                {isFollowed ? <TbCheck size={32}></TbCheck> : "팔로우"}
              </div>
            )}
          </StyledProfileImg>
        </Grid>
        <Grid item xs={12} sm={7} md={12}>
          <StyledProfileContent>
            {props.cafeInfo.description && <div>{props.cafeInfo.description}</div>}
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
            {props.cafeInfo.email && (
              <StyledProfileContentRow>
                <TbMail></TbMail>
                <a href={`mailto:${props.cafeInfo.email}`}>{props.cafeInfo.email}</a>
              </StyledProfileContentRow>
            )}
          </StyledProfileContent>
        </Grid>
      </Grid>
    </StyledCafeDetailProfile>
  );
}

export default React.memo(CafeDetailProfile);

const StyledCafeDetailProfile = styled.aside`
  padding-inline: 16px;
  box-sizing: border-box;
  width: 100%;
  @media screen and (max-width: 900px) {
    margin-top: 10vh;
  }
`;

const StyledProfileImg = styled.div<{ imgSrc: string; isFollowed: boolean }>`
  ${(props) => props.theme.shadow}
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 100%;
  min-height: 320px;
  height: 100%;
  border-radius: 32px;
  padding: 16px;
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(2, 0, 36, 0) 40%, rgba(0, 0, 0, 0.7) 100%),
    url(${({ imgSrc }) => imgSrc});
  background-size: cover;
  & p {
    ${(props) => props.theme.shadow}
    font: ${({ theme }) => theme.fonts.display5};
    color: ${({ theme }) => theme.colors.brandColors.basaltGray[50]};
    margin-bottom: 8px;
  }
  & div {
    ${({ theme }) => theme.styles.button}
    width: 120px;
    height: 48px;
    border: none;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: break-all;
    font: ${(props) => props.theme.fonts.mainContentBold};
    cursor: ${(props) => (props.isFollowed ? "default" : "pointer")};
    background-color: ${(props) =>
      props.isFollowed ? props.theme.colors.primaryBg : props.theme.colors.green};
    color: ${(props) =>
      props.isFollowed ? props.theme.colors.green : props.theme.colors.primaryBg};
    &:hover {
      ${(props) =>
        props.isFollowed
          ? `filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(1);`
          : null};
    }
  }
`;

const StyledProfileContent = styled.div`
  ${(props) => props.theme.shadow}
  width: 100%;
  height: 100%;
  border-radius: 32px;
  box-sizing: border-box;
  padding: 32px;
  background: ${({ theme }) => theme.colors.secondaryBg};
  & > div {
    margin-bottom: 16px;
    font: ${({ theme }) => theme.fonts.mainContentBold};
    color: ${({ theme }) => theme.colors.green};
  }
`;

const StyledProfileContentRow = styled.p`
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
