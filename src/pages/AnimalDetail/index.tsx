import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAnimalDetail } from "../../api";
import {
  AnimalDetailProfile,
  AnimalDetailDescription,
  AnimalDetailSide,
} from "../../components/AnimalDetail";
import {
  IAnimalInfo,
  IBroadcastInfo,
  IFeed,
  ISpeciesInfo,
  IStoreInfo,
} from "../../components/AnimalDetail/type";

const AnimalDetail = function () {
  const params = useParams();
  const navigate = useNavigate();

  const [animalInfo, setAnimalInfo] = useState<IAnimalInfo | null>(null);
  const [broadcastInfo, setBroadcastInfo] = useState<IBroadcastInfo | null>(null);
  const [feedList, setFeedList] = useState<IFeed[] | null>(null);
  const [speciesInfo, setSpeciesInfo] = useState<ISpeciesInfo | null>(null);
  const [storeInfo, setStoreInfo] = useState<IStoreInfo | null>(null);

  useEffect(() => {
    if (params.animal_id === undefined) {
      return;
    }
    getAnimalDetail(params.animal_id)
      .then((res) => {
        res.data.speciesInfo.info = res.data.speciesInfo.info.replace(/\./g, ".\n");
        setAnimalInfo(res.data.animalInfo);
        setBroadcastInfo(res.data.broadcastInfo);
        setFeedList(res.data.feeds);
        setSpeciesInfo(res.data.speciesInfo);
        setStoreInfo(res.data.storeInfo);
      })
      .catch(() => navigate("/404", { replace: true }));
  }, [params.animal_id]);

  return (
    <StyledContainer>
      {animalInfo && broadcastInfo && feedList && speciesInfo && storeInfo && (
        <>
          <StyledLeftSide>
            <AnimalDetailSide
              currentAnimalName={animalInfo.name}
              speciesName={speciesInfo.classification}
              speciesId={speciesInfo.speciesId}
              storeInfo={storeInfo}
            />
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
