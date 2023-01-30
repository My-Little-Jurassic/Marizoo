import React from "react";
import "./App.css";

import styled, { ThemeProvider } from "styled-components";

import { darkTheme } from "./styles/themes/darkTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import useTheme from "./styles/themes/useTheme";
import Itheme from "./styles/themes/theme";
import ThemeBtn from "./components/common/button/ThemeBtn";
import LikeBtn from "./components/common/button/LikeBtn";

function App() {
  const [themeMode, toggleTheme] = useTheme();
  const theme: Itheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <h1>제목</h1>
        <Box>TEXT</Box>
        <ThemeBtn themeMode={themeMode} toggleTheme={toggleTheme}></ThemeBtn>
        <LikeBtn></LikeBtn>
      </Main>
    </ThemeProvider>
  );
}

export default App;

const Main = styled.div`
  color: ${(props) => props.theme.colors.primaryText};
  background-color: ${(props) => props.theme.colors.primaryBg};
  font: ${(props) => props.theme.fonts.display1};
  width: 100vw;
  height: 100vh;
  transition: all 1s;
`;

const Box = styled.div`
  color: ${(props) => props.theme.colors.yellow};
  background-color: ${(props) => props.theme.colors.green};
  font: ${(props) => props.theme.fonts.mainContentBold};
  width: 100px;
  height: 100px;
  ${(props) => props.theme.styles.card}
`;
