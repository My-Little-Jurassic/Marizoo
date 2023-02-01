import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { ThemeBtn } from "../../button/index";
import { MdAccountCircle } from "react-icons/md";

interface IProps {
  // 테마 버튼 props type
  themeMode: string;
  toggleTheme: () => void;
}

function Nav(props: IProps) {
  return (
    <StyledNavbar>
      {/* Nav 내부 컴포넌트 컨테이너 */}
      <StyledNavContainer>
        {/* 왼쪽 로고 */}
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <StyledNavLogo>마이리틀쥬라기</StyledNavLogo>
        </NavLink>
        {/* 오른쪽 버튼 */}
        <StyledNavbarRSide>
          <NavLink to={"/login"} style={{ textDecoration: "none" }}>
            <StyledNavBtn>로그인</StyledNavBtn>
          </NavLink>
          <NavLink to={"/account"} style={{ textDecoration: "none" }}>
            <StyledNavBtn>
              <MdAccountCircle size={30}></MdAccountCircle>
            </StyledNavBtn>
          </NavLink>
          <ThemeBtn themeMode={props.themeMode} toggleTheme={props.toggleTheme}></ThemeBtn>
        </StyledNavbarRSide>
      </StyledNavContainer>
    </StyledNavbar>
  );
}

export default Nav;

const StyledNavbar = styled.nav`
  z-index: 99;
  position: sticky;
  top: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s;
  border-bottom: 1px solid ${(props) => props.theme.colors.disable};
  background-color: ${(props) => props.theme.colors.primaryBg};
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledNavContainer = styled.div`
  width: 90%;
  max-width: 1056px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNavLogo = styled.div`
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

const StyledNavbarRSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${(props) => props.theme.fonts.mainContentBold};
`;

const StyledNavBtn = styled.button`
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
