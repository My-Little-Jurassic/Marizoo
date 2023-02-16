import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ProfileStore, ProfileLarge } from "../../common/profile/index";
import BroadcastContent from "./BroadcastContent";
import BroadcastScreen from "./BroadcastScreen";
import BroadcastRecommendations from "./BroadcastRecommendations";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../../../store";
import { useNavigate, useParams } from "react-router-dom";
import { IBroadcastInfo, IAnimalInfo, IStoreInfo } from "./type";
import { NavLink } from "react-router-dom";
import { getBroadcastInfo } from "../../../api";
import BroadcastBadgeModal from "./BroadcastBadgeModal";

const BroadcastHome = function () {
  const [broadcastInfo, setBroadcastInfo] = useState<IBroadcastInfo | null>(null);
  const [animalList, setAnimalList] = useState<React.ReactNode[] | null>(null);
  const [storeInfo, setStoreInfo] = useState<IStoreInfo | null>(null);
  const [receivedBadge, setReceivedBadge] = useState<number>(-1);

  const isMaximized = useAppSelector((state) => state.broadcast.isMaximized);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.broadcast_id || !params.session_id) {
      return;
    }
    getBroadcastInfo(params.broadcast_id, params.session_id)
      .then((res) => {
        res.data.broadcast.description = res.data.broadcast.description.replace(/\./g, ".\n");
        setBroadcastInfo(res.data.broadcast);
        const tmpAnimalList = res.data.animals.map((animal: IAnimalInfo) => {
          return (
            <Grid key={animal.name} item xs={12} sm={6} md={12}>
              <NavLink to={`/animal/${animal.id}`} style={{ textDecoration: "none" }}>
                <ProfileLarge
                  animalName={animal.name}
                  gender={animal.gender}
                  classification={animal.classification}
                  imgSrc={animal.img}
                />
              </NavLink>
            </Grid>
          );
        });
        setAnimalList(tmpAnimalList);
        setStoreInfo(res.data.stores);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404", { replace: true });
      });
    window.scrollTo(0, 0);
  }, [params.broadcast_id]);

  return (
    <StyledContainer>
      {broadcastInfo && animalList && storeInfo && (
        <>
          {receivedBadge > 0 && (
            <BroadcastBadgeModal
              closeModal={() => setReceivedBadge(-1)}
              receivedBadge={receivedBadge}
            />
          )}
          <StyledLeftSection>
            <BroadcastScreen
              title={broadcastInfo.title}
              setReceivedBadge={(badgeNumber) => setReceivedBadge(badgeNumber)}
            />
            {!isMaximized && (
              <BroadcastContent
                title={broadcastInfo.title}
                description={broadcastInfo.description}
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
    padding: 80px 8px;
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
