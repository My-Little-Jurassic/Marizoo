import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ICafe } from "./type";

interface IProps {
  cafeData: ICafe;
  focusedCafe: number | null;
  setFocusedCafe: (id: number | null) => void;
}
function CafeListContent(props: IProps) {
  return (
    <Link to={`/cafe/${props.cafeData.id}`} style={{ textDecoration: "none" }}>
      <StyledCafeListContent
        focusedCafe={props.focusedCafe}
        animal_store_id={props.cafeData.id}
        onMouseOver={() => {
          props.setFocusedCafe(props.cafeData.id);
        }}
        onMouseOut={() => {
          props.setFocusedCafe(null);
        }}
      >
        <StyledCafeProfile>
          <StyledCafeProfileImg src={props.cafeData.profile_img} />
          <StyledCafeInfoBox>
            <StyledStoreName focusedCafe={props.focusedCafe} animal_store_id={props.cafeData.id}>
              {props.cafeData.store_name}
              <StyledStoreContent>{props.cafeData.address}</StyledStoreContent>
            </StyledStoreName>
          </StyledCafeInfoBox>
        </StyledCafeProfile>
      </StyledCafeListContent>
    </Link>
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
  box-sizing: border-box;
  @media screen and (min-width: 600px) {
    ${(props) => props.theme.shadow};
    ${(props) => props.theme.styles.card};
    background-color: ${(props) =>
      props.focusedCafe === props.animal_store_id
        ? props.theme.colors.yellow
        : props.theme.colors.primaryBg + "aa"};
    scale: ${(props) => (props.focusedCafe === props.animal_store_id ? "1.02" : "1")};
  }
  margin-bottom: 8px;
`;

const StyledCafeProfile = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
`;

const StyledCafeProfileImg = styled.img`
  ${(props) => props.theme.shadow};
  width: 64px;
  height: 64px;
  border-radius: 32px;
  object-fit: cover;
  flex-shrink: 0;
`;

const StyledCafeInfoBox = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  margin-left: 16px;
  justify-content: center;
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
`;
const StyledStoreContent = styled.p`
  font: ${(props) => props.theme.fonts.tinyContent};
  word-break: break-all;
`;
