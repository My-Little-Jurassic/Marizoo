import fonts from "./fonts";
import Itheme from "./theme";
import brandColors from "./colors";

export const darkTheme: Itheme = {
  colors: {
    brandColors: brandColors,
    success: "#4CC068",
    informative: "#68C7EF",
    error: "#F2D856",
    danger: "#FB4656",
    defaultColor: "#FCFCFC",
    defaultBgColor: "#3A3948",
  },
  fonts: { ...fonts },
  shadow: "filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));",
};
