import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { appColors, appStyles } from "components/common/appColors";
import { Montserrat, Allura, Poppins } from "@next/font/google";

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const allura = Allura({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["cursive"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: appColors.darkPrimary,
      contrastText: appColors.white,
    },
    secondary: {
      main: appColors.darkGrey,
      contrastText: appColors.white,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  shape: {
    borderRadius: appStyles.shape,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
        },
        outlined: {
          color: appColors.darkGrey,
          borderColor: appColors.darkGrey,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: appStyles.shape,
        },
        bar: {
          borderRadius: appStyles.shape,
        },
      },
    },
  },
});

export default theme;
