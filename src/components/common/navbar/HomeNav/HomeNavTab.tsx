import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

import { TbDeviceTvOld, TbMap2, TbBooks } from "react-icons/tb";

function HomeNavTab() {
  const [activeTab, setActiveTab] = useState(0); // 현재 활성화된 탭
  const location = useLocation(); // 현재 url

  // url이 변할때마다 활성화된 탭 변경하기
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab(0);
    } else if (location.pathname === "/cafe") {
      setActiveTab(1);
    } else if (location.pathname === "/pedia") {
      setActiveTab(2);
    }
  }, [location]);

  return (
    <StyledHomeNavTab>
      <StyledIconContainer>
        <NavLink
          to={"/"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active" : "deactive")}
        >
          <StyledTabIcon>
            <TbDeviceTvOld size={24}></TbDeviceTvOld>
            <StyledTabLabel>라이브 방송</StyledTabLabel>
          </StyledTabIcon>
        </NavLink>
        <NavLink
          to={"/cafe"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active" : "deactive")}
        >
          <StyledTabIcon>
            <TbMap2 size={24}></TbMap2>
            <StyledTabLabel>카페 탐방</StyledTabLabel>
          </StyledTabIcon>
        </NavLink>
        <NavLink
          to={"/pedia"}
          style={{ textDecoration: "none" }}
          className={({ isActive }) => (isActive ? "active" : "deactive")}
        >
          <StyledTabIcon>
            <TbBooks size={24}></TbBooks>
            <StyledTabLabel>동물 도감</StyledTabLabel>
          </StyledTabIcon>
        </NavLink>
      </StyledIconContainer>
      <StyledActiveTabLine activeTab={activeTab}></StyledActiveTabLine>
    </StyledHomeNavTab>
  );
}

export default HomeNavTab;

const StyledHomeNavTab = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media screen and (max-width: 600px) {
    justify-content: space-around;
    width: 100%;
  }
`;

const StyledIconContainer = styled.div`
  position: relative;
  display: flex;
  width: 300px;
  & > .active {
    color: ${(props) => props.theme.colors.green}; // 활성화된 탭 아이콘 색깔
  }
  & > .deactive {
    color: ${(props) => props.theme.colors.primaryText}; // 비활성화된 탭 아이콘 색깔
  }
  @media screen and (max-width: 600px) {
    justify-content: space-around;
    width: 100%;
  }
`;

const StyledTabIcon = styled.div`
  ${(props) => props.theme.styles.button}
  positioin: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: none;
  background-color: ${(props) => props.theme.colors.primaryBg};
  font: ${(props) => props.theme.fonts.tinyContentBold};
  width: 100px;
  &:hover {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.1)" : "brightness(0.95)")};
  }
  &:active {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.2)" : "brightness(0.9)")};
  }
`;

const StyledTabLabel = styled.div`
  margin-top: 4px;
`;

const StyledActiveTabLine = styled.div<{ activeTab: number }>`
  transition: all 0.2s;
  position: absolute;
  height: 4px;
  background-color: ${(props) => props.theme.colors.green};
  @media screen and (max-width: 600px) {
    width: 33.333%;
    left: ${(props) => props.activeTab * 33.333}%;
    top: 0px;
  }
  @media screen and (min-width: 600px) {
    left: ${(props) => props.activeTab * 100}px;
    bottom: -1px;
    width: 100px;
  }
`;
