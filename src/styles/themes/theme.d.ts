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
    secondaryText: string;
    primaryBg: string;
    secondaryBg: string;
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
