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
import { useAppSelector } from "./store";
import { selectModal } from "./store/modalSlice";
import { Modal } from "./components/common/modal";
import StoreReservation from "./pages/StoreReservation";

function App() {
  const [themeMode, toggleTheme] = useTheme();
  const modal = useAppSelector(selectModal);
  const theme: Itheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Nav themeMode={themeMode} toggleTheme={toggleTheme}></Nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reservation/:cafe_id/:play_id" element={<StoreReservation />}></Route>
      </Routes>

      {modal.visible ? <Modal content={modal.content} /> : null}
    </ThemeProvider>
  );
}

export default App;
