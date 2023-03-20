import { createTheme } from "@mui/material/styles";
import { appColors } from "components/common/appColors";
import { poppins } from "utils/theme";

export const productDescTheme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiTabs: {
      defaultProps: {},
      styleOverrides: {
        root: {
          borderBottom: `3px solid ${appColors.primary}`,
          "& .MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.3 },
          "& .MuiTab-root.Mui-selected": {
            color: appColors.darkGrey,
            backgroundColor: appColors.primary,
          },
        },
        scrollButtons: {
          display: "inline-flex",
        },
        indicator: {
          height: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: poppins.style.fontFamily,
          backgroundColor: appColors.lightGrey,
          borderRadius: "20px 20px 0px 0px",
          textTransform: "capitalize",
          marginRight: "1em",
          [theme.breakpoints.up("xs")]: {
            fontSize: "15px",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "18px",
          },
        }),
      },
    },
  },
});
