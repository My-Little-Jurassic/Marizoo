import fonts from "./fonts";
import Itheme from "./theme";
import brandColors from "./colors";

export const darkTheme: Itheme = {
  isDark: true,
  colors: {
    brandColors: brandColors,
    green: "#4CC068",
    blue: "#68C7EF",
    yellow: "#F2D856",
    red: "#FB4656",
    primaryText: "#FCFCFC",
    seconderyText: "#E6E5E9",
    primaryBg: "#3A3948",
    seconderyBg: "#4E4C5F",
    disable: "#615F75",
  },
  fonts: { ...fonts },
  shadow: "filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));",
  styles: {
    button: `
    cursor: pointer;
    border-radius: 32px;
    filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
    transition: all 0.2s ease-in-out;
    &:hover {
      filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(1.1);
    }
    &:active {
      filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(1.2);
      scale: 0.95;
  }`,
    card: `
    border-radius: 32px;
    filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
    transition: all 0.2s ease-in-out;
    &:hover {
      scale: 1.02;
    }
    &:active {
      filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(1.1);
      scale: 1;
    }`,
  },
};
