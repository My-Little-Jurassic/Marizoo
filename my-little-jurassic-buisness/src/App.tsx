import React from "react";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "styled-components";
import Broadcast from "./pages/Broadcast";
import Home from "./pages/Home";
import { darkTheme } from "./styles/themes/darkTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import Itheme from "./styles/themes/theme";
import useTheme from "./styles/themes/useTheme";

function App() {
  const [themeMode] = useTheme();
  const theme: Itheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/broadcast/:id"} element={<Broadcast />} />

          {/* 포트포워딩에 문제가 있을 경우 아래를 따라가도록 합니다 */}
          <Route path="owner">
            <Route index element={<Home />} />
            <Route path={"broadcast/:id"} element={<Broadcast />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
