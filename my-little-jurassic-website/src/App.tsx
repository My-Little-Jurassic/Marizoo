import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./pages/user/Login";
import Regist from "./pages/user/Regist";
import Home from "./pages/user/Home/Home";
import Pedia from "./pages/user/Pedia/Pedia";
import Cafe from "./pages/user/Cafe/Cafe";
import Itheme from "./styles/themes/theme";
import useTheme from "./styles/themes/useTheme";
import NotFound from "./pages/user/NotFound/NotFound";
import OwnerHome from "./pages/owner/Home";
import OwnerBroadcast from "./pages/owner/Broadcast";
import { Nav } from "./components/common/navbar";
import { darkTheme } from "./styles/themes/darkTheme";
import { lightTheme } from "./styles/themes/lightTheme";
import CafeDetail from "./pages/user/CafeDetail/CafeDetail";
import AnimalDetail from "./pages/user/AnimalDetail";
import { useAppDispatch, useAppSelector } from "./store";
import { selectModal } from "./store/modalSlice";
import { Modal } from "./components/common/modal";
import Mypage from "./pages/user/Mypage";
import StoreReservation from "./pages/user/StoreReservation";
import Broadcast from "./pages/user/Broadcast";
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
        <Route path="/reservation/:cafe_id/:play_id" element={<StoreReservation />}></Route>
        <Route path="/pedia" element={<Pedia />}></Route>
        <Route path="/animal/:animal_id" element={<AnimalDetail />}></Route>
        <Route path="owner">
          <Route index element={<OwnerHome />} />
          <Route path={"broadcast/:id"} element={<OwnerBroadcast />} />
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>

      {modal.visible ? <Modal content={modal.content} /> : null}
    </ThemeProvider>
  );
}

export default App;
