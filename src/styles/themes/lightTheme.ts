import fonts from "./fonts";
import Itheme from "./theme";
import brandColors from "./colors";

export const lightTheme: Itheme = {
  colors: {
    brandColors: brandColors,
    success: "#14A647",
    informative: "#1790C3",
    error: "#F2C619",
    danger: "#F33041",
    defaultColor: "#3A3948",
    defaultBgColor: "#FCFCFC",
  },
  fonts: { ...fonts },
  shadow: "filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));",
};
