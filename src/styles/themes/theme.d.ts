import fonts from "./fonts";
import brandColors from "./colors";

interface Itheme {
  colors: {
    brandColors: typeof brandColors;
    success: string;
    informative: string;
    error: string;
    danger: string;
    defaultColor: string;
    defaultBgColor: string;
  };
  fonts: typeof fonts;
  shadow: string;
}

export default Itheme;
