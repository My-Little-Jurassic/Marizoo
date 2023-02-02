import React from "react";
import styled, { keyframes } from "styled-components";

import { TbSun, TbMoon } from "react-icons/tb";

interface IProps {
  // 테마 버튼 props type
  themeMode: string;
  toggleTheme: () => void;
}

function ThemeBtn(props: IProps) {
  return (
    <StyledThemeBtn
      onClick={() => {
        // 버튼 클릭시 테마 토글
        props.toggleTheme();
      }}
    >
      {props.themeMode === "dark" ? (
        // 테마 모드에 따라서 아이콘 변경
        <TbSun size={24} strokeWidth={3} /> // 해 모양 아이콘
      ) : (
        <TbMoon size={24} strokeWidth={3} /> // 달 모양 아이콘
      )}
    </StyledThemeBtn>
  );
}

export default ThemeBtn;

const sunRise = keyframes`
  from {
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;
const sunSet = keyframes`
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const StyledThemeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 32px;
  color: ${(props) => props.theme.colors.primaryText};
  background: ${(props) => props.theme.colors.primaryBg};
  animation: ${sunRise} 1s ease-out both;
  &:hover {
    background: ${(props) => props.theme.colors.primaryText};
    color: ${(props) => props.theme.colors.brandColors.mangoYellow[600]};
  }
  &:active {
    background: ${(props) => props.theme.colors.primaryText};
    animation: ${sunSet} infinite 3s linear both;
    scale: 0.95;
  }
`;
