import fonts from "./fonts";
import brandColors from "./colors";

interface Itheme {
  isDark: boolean;
  colors: {
    brandColors: typeof brandColors;
    green: string;
    blue: string;
    yellow: string;
    red: string;
    primaryText: string;
    seconderyText: string;
    primaryBg: string;
    seconderyBg: string;
    disable: string;
  };
  fonts: typeof fonts;
  shadow: string;
  styles: {
    button: string;
    card: string;
  };
}

export default Itheme;
