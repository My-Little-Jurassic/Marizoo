import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  AnimalDetailProfile,
  AnimalDetailDescription,
  AnimalDetailSide,
} from "../components/AnimalDetail";
import {
  IAnimalInfo,
  IBroadcastInfo,
  IFeed,
  ISpeciesInfo,
  IStoreInfo,
} from "../components/AnimalDetail/type";

const AnimalDetail = function () {
  const APPLICATION_SERVER_URL = process.env.REACT_APP_API_URL;
  const params = useParams();

  const [animalInfo, setAnimalInfo] = useState<IAnimalInfo | null>(null);
  const [broadcastInfo, setBroadcastInfo] = useState<IBroadcastInfo | null>(null);
  const [feedList, setFeedList] = useState<IFeed[] | null>(null);
  const [speciesInfo, setSpeciesInfo] = useState<ISpeciesInfo | null>(null);
  const [storeInfo, setStoreInfo] = useState<IStoreInfo | null>(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${APPLICATION_SERVER_URL}/stores/${params.id}/animal_detail`,
    })
      .then((res) => {
        setAnimalInfo(res.data.animalInfo);
        setBroadcastInfo(res.data.broadcastInfo);
        setFeedList(res.data.feeds);
        setSpeciesInfo(res.data.speciesInfo);
        setStoreInfo(res.data.storeInfo);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  return (
    <StyledContainer>
      {animalInfo && broadcastInfo && feedList && speciesInfo && storeInfo && (
        <>
          <StyledLeftSide>
            <AnimalDetailSide currentAnimalName={animalInfo.name} storeInfo={storeInfo} />
          </StyledLeftSide>
          <StyledRightSide>
            <AnimalDetailProfile
              animalInfo={animalInfo}
              broadcastInfo={broadcastInfo}
              feedList={feedList}
            />
            <AnimalDetailDescription speciesInfo={speciesInfo} />
          </StyledRightSide>
        </>
      )}
    </StyledContainer>
  );
};

export default AnimalDetail;

const StyledContainer = styled.div`
  padding: 96px 10vw;
  background-color: ${(props) => props.theme.colors.primaryBg};
  display: flex;
  gap: 40px;
  @media screen and (max-width: 1200px) {
    flex-direction: column-reverse;
    gap: 64px;
  }
`;

const StyledLeftSide = styled.div`
  width: 20%;
  height: 100vh;
  min-width: 232px;
  padding: 0 8px;
  box-sizing: border-box;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const StyledRightSide = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
