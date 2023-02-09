import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Login from "./pages/Login";
import Regist from "./pages/Regist";
import Home from "./pages/Home/Home";
import Cafe from "./pages/Cafe/Cafe";
import Itheme from "./styles/themes/theme";
import useTheme from "./styles/themes/useTheme";
import NotFound from "./pages/NotFound/NotFound";
import { Nav } from "./components/common/navbar";
import { darkTheme } from "./styles/themes/darkTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import { useAppSelector } from "./store";
import { selectModal } from "./store/modalSlice";
import { Modal } from "./components/common/modal";

function App() {
  const [themeMode, toggleTheme] = useTheme();
  const modal = useAppSelector(selectModal);
  const theme: Itheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Nav themeMode={themeMode} toggleTheme={toggleTheme}></Nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/regist" element={<Regist />}></Route>
        {/* <Route path="/user/:user_id" element={}></Route> */}
        {/* <Route path="/user/:user_id/set_account" element={}></Route> */}
        {/* <Route path="/find_account" element={}></Route> */}
        {/* <Route path="/broadcast/:broadcast_id" element={}></Route> */}
        <Route path="/cafe" element={<Cafe />}></Route>
        {/* <Route path="/cafe/:cafe_id" element={}></Route> */}
        {/* <Route path="/reservation/:cafe_id/:play_id" element={}></Route> */}
        {/* <Route path="/pedia" element={}></Route> */}
        {/* <Route path="/animal/:animal_id" element={}></Route> */}
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>

      {modal.visible ? <Modal content={modal.content} /> : null}
    </ThemeProvider>
  );
}

export default App;
