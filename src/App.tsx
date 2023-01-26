import React from "react";
import "./App.css";

import styled, { ThemeProvider } from "styled-components";

import { darkTheme } from "./styles/themes/darkTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import useTheme from "./styles/themes/useTheme";
import Itheme from "./styles/themes/theme";

function App() {
  const [theme, toggleTheme] = useTheme();
  const themeMode: Itheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <Main>
        <h1>제목</h1>
        <Box>TEXT</Box>
        <button
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme}
        </button>
      </Main>
    </ThemeProvider>
  );
}

export default App;

const Main = styled.div`
  color: ${(props) => props.theme.colors.defaultColor};
  background-color: ${(props) => props.theme.colors.defaultBgColor};
  font: ${(props) => props.theme.fonts.display1};
  width: 100vw;
  height: 100vh;
`;

const Box = styled.div`
  color: ${(props) => props.theme.colors.error};
  background-color: ${(props) => props.theme.colors.success};
  font: ${(props) => props.theme.fonts.mainContentBold};
  width: 100px;
  height: 100px;
  ${(props) => props.theme.shadow}
`;
