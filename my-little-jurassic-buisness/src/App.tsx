import React from "react";
import { ThemeProvider } from "styled-components";
import Broadcast from "./pages/Broadcast";
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
        <Broadcast />
      </div>
    </ThemeProvider>
  );
}

export default App;
