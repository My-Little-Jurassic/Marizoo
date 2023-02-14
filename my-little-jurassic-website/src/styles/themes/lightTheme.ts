import fonts from "./fonts";
import Itheme from "./theme";
import brandColors from "./colors";

export const lightTheme: Itheme = {
  isDark: false,
  colors: {
    brandColors: brandColors,
    green: "#14A647",
    blue: "#1790C3",
    yellow: "#F2C619",
    red: "#F33041",
    primaryText: "#3A3948",
    secondaryText: "#75728C",
    primaryBg: "#FCFCFC",
    secondaryBg: "#FCFCFC",
    disable: "#CFCED7",
  },
  fonts: { ...fonts },
  shadow: "filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));",
  styles: {
    button: `
    cursor: pointer;
    border-radius: 32px;
    filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
    transition: all 0.02s;
    &:hover {
      filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.95);
    }
    &:active {
      filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.9);
      scale: 0.98;
  }`,
    card: `
    border-radius: 32px;
    filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2));
    transition: all 0.1s;
    &:hover {
      scale: 1.02;
    }
    &:active {
      filter: drop-shadow(2px 2px 8px rgba(67, 67, 67, 0.2)) brightness(0.9);
      scale: 1;
    }`,
    input: `
    border-radius: 32px;
    transition: all 0.1s;
    &:hover {
      filter: brightness(0.95);
    }
    &:active {
    }`,
  },
};
