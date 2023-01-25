import React from "react";
import logo from "./logo.svg";
import "./App.css";

import styled, { ThemeProvider } from "styled-components";

import { lightTheme } from "./styles/themes/lightTheme";
import { darkTheme } from "./styles/themes/darkTheme";

console.log(lightTheme, darkTheme);

function App() {
  const isDark = false;
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Main>
        <h1>제목</h1>
        <p>내용</p>
      </Main>
    </ThemeProvider>
  );
}

export default App;

const Main = styled.div`
  color: ${(props) => props.theme.defaultColor};
  background-color: ${(props) => props.theme.defaultBgColor};
  width: 100vw;
  height: 100vh;
`;
