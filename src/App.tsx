import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Login from "./pages/Login";
import Regist from "./pages/Regist";
import Home from "./pages/Home/Home";

import Pedia from "./pages/Pedia/Pedia";
import Cafe from "./pages/Cafe/Cafe";
import Itheme from "./styles/themes/theme";
import useTheme from "./styles/themes/useTheme";
import NotFound from "./pages/NotFound/NotFound";
import { Nav } from "./components/common/navbar";
import { darkTheme } from "./styles/themes/darkTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import CafeDetail from "./pages/CafeDetail/CafeDetail";
import AnimalDetail from "./pages/AnimalDetail";
import { useAppDispatch, useAppSelector } from "./store";
import { selectModal } from "./store/modalSlice";
import { Modal } from "./components/common/modal";
import Mypage from "./pages/Mypage";
import Broadcast from "./pages/Broadcast";
import { refresh } from "./store/userSlice";

function App() {
  const [themeMode, toggleTheme] = useTheme();
  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const theme: Itheme = themeMode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    dispatch(refresh());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Nav themeMode={themeMode} toggleTheme={toggleTheme}></Nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/regist" element={<Regist />}></Route>
        <Route path="/user/:user_id" element={<Mypage />}></Route>
        {/* <Route path="/user/:user_id/set_account" element={}></Route> */}
        {/* <Route path="/find_account" element={}></Route> */}
        <Route path="/broadcast/:broadcast_id/:session_id" element={<Broadcast />}></Route>
        <Route path="/cafe" element={<Cafe />}></Route>
        <Route path="/cafe/:cafe_id" element={<CafeDetail />}></Route>
        {/* <Route path="/reservation/:cafe_id/:play_id" element={}></Route> */}
        <Route path="/pedia" element={<Pedia />}></Route>
        <Route path="/animal/:animal_id" element={<AnimalDetail />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>

      {modal.visible ? <Modal content={modal.content} /> : null}
    </ThemeProvider>
  );
}

export default App;
