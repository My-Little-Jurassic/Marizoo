import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { ThemeBtn } from "../../button/index";
import { MdAccountCircle } from "react-icons/md";

interface Iprops {
  // 테마 버튼 props type
  themeMode: string;
  toggleTheme: () => void;
}

function Nav(props: Iprops) {
  return (
    <Navbar>
      {/* Nav 내부 컴포넌트 컨테이너 */}
      <NavContainer>
        {/* 왼쪽 로고 */}
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <NavLogo>마이리틀쥬라기</NavLogo>
        </NavLink>
        {/* 오른쪽 버튼 */}
        <NavbarRSide>
          <NavBtn>로그인</NavBtn>
          <NavBtn>
            <MdAccountCircle size={30}></MdAccountCircle>
          </NavBtn>
          <ThemeBtn themeMode={props.themeMode} toggleTheme={props.toggleTheme}></ThemeBtn>
        </NavbarRSide>
      </NavContainer>
    </Navbar>
  );
}

export default Nav;

const Navbar = styled.nav`
  position: sticky;
  top: 0px;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s;
  border-bottom: 1px solid ${(props) => props.theme.colors.disable};
  background-color: ${(props) => props.theme.colors.primaryBg};
  color: ${(props) => props.theme.colors.primaryText};
`;

const NavContainer = styled.div`
  width: 90%;
  max-width: 1056px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.div`
  ${(props) => props.theme.styles.button}
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding-inline: 10px;
  height: 48px;
  filter: none;
  background-color: ${(props) => props.theme.colors.primaryBg};
  font: ${(props) => props.theme.fonts.mainContentBold};
  color: ${(props) => props.theme.colors.primaryText};
  &:hover {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.1)" : "brightness(0.95)")};
  }
  &:active {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.2)" : "brightness(0.9)")};
  }
`;

const NavbarRSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${(props) => props.theme.fonts.mainContentBold};
`;

const NavBtn = styled.button`
  ${(props) => props.theme.styles.button}
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding-inline: 10px;
  height: 48px;
  filter: none;
  background-color: ${(props) => props.theme.colors.primaryBg};
  font: ${(props) => props.theme.fonts.subContentBold};
  color: ${(props) => props.theme.colors.primaryText};
  &:hover {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.1)" : "brightness(0.95)")};
  }
  &:active {
    filter: ${(props) => (props.theme.isDark ? "brightness(1.2)" : "brightness(0.9)")};
  }
`;
