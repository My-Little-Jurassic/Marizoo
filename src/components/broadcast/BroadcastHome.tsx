import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ProfileStore, ProfileLarge } from "../common/profile/index";
import BroadcastContent from "./BroadcastContent";
import BroadcastScreen from "./BroadcastScreen";
import BroadcastRecommendations from "./BroadcastRecommendations";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../../store";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IBroadcastInfo, IAnimalInfo, IStoreInfo } from "./type";
import { NavLink } from "react-router-dom";

// 임시 먹이 리스트
const tmpFeedList = [
  { id: 1, feedName: "귀뚜라미", imgSrc: "https://picsum.photos/200/300" },
  { id: 2, feedName: "지렁이", imgSrc: "https://picsum.photos/200/300" },
  { id: 3, feedName: "쥐", imgSrc: "https://picsum.photos/200/300" },
  { id: 4, feedName: "곤충젤리", imgSrc: "https://picsum.photos/200/300" },
];

const BroadcastHome = function () {
  const [broadcastInfo, setBroadcastInfo] = useState<IBroadcastInfo | null>(null);
  const [animalList, setAnimalList] = useState<React.ReactNode[] | null>(null);
  const [storeInfo, setStoreInfo] = useState<IStoreInfo | null>(null);

  const isMaximized = useAppSelector((state) => state.broadcast.isMaximized);
  const params = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/broadcasts/${params.id}`,
    })
      .then((res) => {
        // DB에는 thumbnail로 되어 있는데 description으로 수정 필요
        // setBroadcastInfo(res.data.broadcast)
        const tmp = { title: res.data.broadcast.title, description: res.data.broadcast.thumbnail };
        setBroadcastInfo(tmp);

        const tmpAnimalList = res.data.animals.map((animal: IAnimalInfo) => {
          return (
            <Grid key={animal.name} item xs={12} sm={6} md={12}>
              <NavLink to={`/animal/${animal.id}`} style={{ textDecoration: "none" }}>
                <ProfileLarge
                  animalName={animal.name}
                  gender={animal.gender}
                  classification={animal.classification}
                  imgSrc={animal.profile}
                />
              </NavLink>
            </Grid>
          );
        });
        setAnimalList(tmpAnimalList);
        setStoreInfo(res.data.stores);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  // 투표 생기면 axios 보내기

  return (
    <StyledContainer>
      {broadcastInfo && animalList && storeInfo && (
        <>
          <StyledLeftSection>
            <BroadcastScreen title={broadcastInfo.title} feedList={tmpFeedList} />
            {!isMaximized && (
              <BroadcastContent
                title={broadcastInfo.title}
                detail={broadcastInfo.description}
                feedList={tmpFeedList}
              />
            )}
          </StyledLeftSection>
          {!isMaximized && (
            <StyledRightSection>
              <NavLink to={`/cafe/${storeInfo.id}`} style={{ textDecoration: "none" }}>
                <ProfileStore storeName={storeInfo.name} imgSrc={storeInfo.profile} />
              </NavLink>
              <Grid container spacing={4}>
                {animalList}
              </Grid>
              <BroadcastRecommendations />
            </StyledRightSection>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default BroadcastHome;

const StyledContainer = styled.div`
  box-sizing: border-box;
  padding: 80px 8.75vw;
  background-color: ${(props) => props.theme.colors.primaryBg};
  width: 100vw;
  height: 100%;
  display: flex;
  gap: 32px;
  @media screen and (max-width: 1400px) {
    padding: 80px 2vw;
  }
  @media screen and (max-width: 900px) {
    padding: 80px 4vw;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    padding: 80px 2vw;
    min-width: 375px;
  }
`;

const StyledLeftSection = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const StyledRightSection = styled.div`
  width: 22%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  }
`;
