import React from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  cafe: {
    animal_store_id: number;
    store_name: string;
    discription: string;
    address: string;
    tel: string;
    profile_img: string;
    lat: number;
    lng: number;
  };
  focusedCafe: number | null;
  setFocusedCafe: (id: number | null) => void;
}
function CafeListContent(props: IProps) {
  return (
    <StyledCafeListContent
      focusedCafe={props.focusedCafe}
      animal_store_id={props.cafe.animal_store_id}
      onMouseOver={() => {
        props.setFocusedCafe(props.cafe.animal_store_id);
      }}
    >
      <StyledCafeProfile>
        <StyledCafeProfileImg src={props.cafe.profile_img} />
        <StyledCafeInfoBox>
          <StyledStoreName
            focusedCafe={props.focusedCafe}
            animal_store_id={props.cafe.animal_store_id}
          >
            {props.cafe.store_name}
            <StyledStoreContent>{props.cafe.address}</StyledStoreContent>
            {props.focusedCafe === props.cafe.animal_store_id ? (
              <StyledStoreDiscription>{props.cafe.discription}</StyledStoreDiscription>
            ) : null}
          </StyledStoreName>
        </StyledCafeInfoBox>
      </StyledCafeProfile>
    </StyledCafeListContent>
  );
}

export default React.memo(CafeListContent);

const FadeInTop = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledCafeListContent = styled.div<{ focusedCafe: number | null; animal_store_id: number }>`
  animation: ${FadeInTop} 0.5s ease;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-block: 4px;
  width: 100%;
  @media screen and (min-width: 600px) {
    ${(props) => props.theme.shadow};
    ${(props) => props.theme.styles.card};
    background-color: ${(props) =>
      props.focusedCafe === props.animal_store_id
        ? props.theme.colors.yellow
        : props.theme.colors.primaryBg};
    scale: ${(props) => (props.focusedCafe === props.animal_store_id ? "1.02" : "1")};
  }
`;

const StyledCafeProfile = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 600px) {
    padding-inline: 16px;
    padding-bottom: 16px;
  }
  @media screen and (min-width: 600px) {
    padding: 16px;
  }
`;

const StyledCafeProfileImg = styled.img`
  ${(props) => props.theme.shadow};
  width: 64px;
  height: 64px;
  border-radius: 32px;
  object-fit: cover;
`;

const StyledCafeInfoBox = styled.div`
  display: inline-flex;
  width: calc(100% - 100px);
  flex-direction: column;
  margin-left: 16px;
`;

const StyledStoreName = styled.h3<{ focusedCafe: number | null; animal_store_id: number }>`
  font: ${(props) => props.theme.fonts.subContentBold};
  color: ${(props) => props.theme.colors.primaryText};
  @media screen and (min-width: 600px) {
    color: ${(props) =>
      props.focusedCafe === props.animal_store_id
        ? props.theme.colors.brandColors.basaltGray[900]
        : props.theme.colors.primaryText};
  }
  word-break: break-all;
  margin-bottom: 4px;
`;
const StyledStoreContent = styled.p`
  font: ${(props) => props.theme.fonts.tinyContent};
  word-break: break-all;
`;

const StyledStoreDiscription = styled.p`
  font: ${(props) => props.theme.fonts.tinyContentBold};
  word-break: break-all;
`;
