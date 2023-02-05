import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./pages/Home/Home";
import Itheme from "./styles/themes/theme";
import useTheme from "./styles/themes/useTheme";
import { Nav } from "./components/common/navbar";
import { darkTheme } from "./styles/themes/darkTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import StoreReservation from "./pages/StoreReservation";

function App() {
  const [themeMode, toggleTheme] = useTheme();
  const theme: Itheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Nav themeMode={themeMode} toggleTheme={toggleTheme}></Nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/s" element={<StoreReservation />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
