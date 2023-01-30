import React, { useEffect, useState } from "react";
import styled from "styled-components";

import HomeNavTab from "./HomeNavTab";

function HomeNav() {
  const [isHide, setIsHide] = useState(false); // navbar 숨길지 말지
  const [scrollY, setScrollY] = useState(0); // 스크롤 위치 추적
  const [scrollMemory, setScrollMemory] = useState([0, 0]); // 현재 스크롤 위치, 직전 위치

  // 스크롤 위치 기록하는 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  // 스크롤 할 때마다 직전 위치와 비교하여 navbar 숨김 여부 판단
  useEffect(() => {
    setScrollMemory([scrollY, scrollMemory[0]]);
    if (scrollMemory[0] > scrollMemory[1] && scrollY >= 60) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }
    console.log(isHide);
  }, [scrollY]);

  return (
    <StyledHomeNavbar isHide={isHide}>
      <HomeNavTab></HomeNavTab>
    </StyledHomeNavbar>
  );
}

export default HomeNav;

interface IStyledHomeNavbarProps {
  isHide: boolean;
}

const StyledHomeNavbar = styled.nav<IStyledHomeNavbarProps>`
  position: sticky;
  top: ${(props) => (props.isHide ? "-20" : "60")}px;
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s;
  transition: top 0.2s ease-out;
  border-bottom: 1px solid ${(props) => props.theme.colors.disable};
  background-color: ${(props) => props.theme.colors.primaryBg};
  color: ${(props) => props.theme.colors.primaryText};
`;
