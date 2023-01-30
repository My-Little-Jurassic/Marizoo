import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { TbDeviceTvOld, TbMap2, TbBooks } from "react-icons/tb";

function HomeNavTab() {
  return (
    <StyledHomeNavTab>
      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <StyledTabIcon>
          <TbDeviceTvOld size={30}></TbDeviceTvOld>
          <StyledTabLabel>라이브 방송</StyledTabLabel>
        </StyledTabIcon>
      </NavLink>
      <NavLink to={"/2"} style={{ textDecoration: "none" }}>
        <StyledTabIcon>
          <TbMap2 size={30}></TbMap2>
          <StyledTabLabel>카페 탐방</StyledTabLabel>
        </StyledTabIcon>
      </NavLink>
      <NavLink to={"/3"} style={{ textDecoration: "none" }}>
        <StyledTabIcon>
          <TbBooks size={30}></TbBooks>
          <StyledTabLabel>동물 도감</StyledTabLabel>
        </StyledTabIcon>
      </NavLink>
    </StyledHomeNavTab>
  );
}

export default HomeNavTab;

const StyledHomeNavTab = styled.nav`
  display: flex;
`;

const StyledTabIcon = styled.nav`
  ${(props) => props.theme.styles.button}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: none;
  background-color: ${(props) => props.theme.colors.primaryBg};
  font: ${(props) => props.theme.fonts.tinyContentBold};
  color: ${(props) => props.theme.colors.primaryText};
  margin-inline: 16px;
  color: ${(props) => props.theme.colors.primaryText};
  &:hover {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.1)" : "brightness(0.95)")};
  }
  &:active {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.2)" : "brightness(0.9)")};
  }
`;

const StyledTabLabel = styled.nav`
  margin-top: 8px;
`;
