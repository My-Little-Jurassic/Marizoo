import React from "react";
import styled from "styled-components";

// /users/{user_id}/stores
const sampleFollowingStores = {
  stores: [
    {
      storeName: "마리쥬 카페",
      id: 1,
      address: "서울 종로구 인사동길 23",
      tel: "02-000-0000",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 카페",
      id: 2,
      address: "대전 유성구 대학로 000",
      tel: "02-000-0000",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 카페",
      id: 3,
      address: "대전 유성구 대학로 000",
      tel: "02-000-0000",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 카페",
      id: 4,
      address: "대전 유성구 대학로 000",
      tel: "02-000-0000",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 카페",
      id: 5,
      address: "대전 유성구 대학로 000",
      tel: "02-000-0000",
      img: "https://picsum.photos/200/300",
    },
    {
      storeName: "마리쥬 카페",
      id: 6,
      address: "대전 유성구 대학로 000",
      tel: "02-000-0000",
      img: "https://picsum.photos/200/300",
    },
  ],
};

const MyPageFollowingStore = function () {
  const CardComponent = sampleFollowingStores.stores.map((store) => {
    return (
      <StyledCard key={store.id}>
        <StyledCardImgBox>
          <StyledImg src={store.img} />
        </StyledCardImgBox>
        <StyledCardTextBox>
          <StyledTitle>{store.storeName}</StyledTitle>
          <StyledContent>{store.address}</StyledContent>
          <StyledContent>{store.tel}</StyledContent>
        </StyledCardTextBox>
      </StyledCard>
    );
  });

  return (
    <StyledContainer>
      <StyledHeader>팔로우 중인 가게</StyledHeader>
      <StyledCardContainer>{CardComponent}</StyledCardContainer>
    </StyledContainer>
  );
};

export default MyPageFollowingStore;

const StyledContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledHeader = styled.span`
  font: ${(props) => props.theme.fonts.header2};
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledCardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
`;

const StyledCard = styled.div`
  width: 32%;
  min-width: 360px;
  height: 128px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
  border-radius: 32px;
  padding: 4px;
  background-color: ${(props) => props.theme.colors.secondaryBg};
  box-shadow: 2px 2px 8px rgba(67, 67, 67, 0.2);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    filter: brightness(0.9);
    transform: scale(1);
  }
  @media screen and (max-width: 1360px) {
    width: 48%;
  }
  @media screen and (max-width: 888px) {
    width: 100%;
  }
`;

const StyledCardImgBox = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 32px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: crop;
`;

const StyledCardTextBox = styled.div`
  width: calc(100% - 120px);
  color: ${(props) => props.theme.colors.primaryText};
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.span`
  font: ${(props) => props.theme.fonts.mainContentBold};
`;

const StyledContent = styled.span`
  font: ${(props) => props.theme.fonts.subContent};
`;
