import { brown, grey, yellow } from "@mui/material/colors";
import { appColors, appStyles } from "../appColors";
import { muiSxPropType } from "../types";

export const navbarStyles: muiSxPropType = {
  flexGrow: 1,
  "& li": {
    listStyle: "none",
  },
  "& .cat-grid-item": {
    display: {
      xs: "none",
      lg: "list-item",
    },
  },
};

export const appbarStyles: muiSxPropType = {
  "& .header-logo": {
    maxHeight: {
      xs: "60px",
    },
  },
  "& .nav-item": {
    color: appColors.fontGrey,
    fontWeight: appStyles.w500,
    fontSize: "0.875em",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      color: appColors.darkPrimary,
    },
  },
  "& .nav-cat-container": {
    px: 0,
    py:1
  },
  "& .nav-cat-container a": {
    textDecoration: "none",
  },
  "& .nav-item-active": {
    borderBottom: `3px solid ${appColors.primary}`,
  },
};

export const actionNavStyles: muiSxPropType = {
  msScrollSnapPointsY: {
    xs: 1,
    md: 0,
  },
  background: {
    xs: appColors.white,
    md: grey[100],
  },
};

export const catNavStyles: muiSxPropType = {
  display: {
    xs: "none",
    md: "block",
  },
  borderRadius: "0 0 20px 20px",
  boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);",
};

export const cartDrawerStyle: muiSxPropType = {
  "& .MuiTypography-root": {},
  "& .MuiDrawer-paper": {
    xs: {
      height: "100% !important",
    },
  },
};

export const notificationDrawerStyle: muiSxPropType = {
  "& .MuiTypography-root": {},
  "& .MuiDrawer-paper": {
    xs: {
      height: "100% !important",
    },
  },
  "& .MuiBox-root": {
    margin: 0,
  }
};

export const cardDrawerBoxContainer: muiSxPropType = {
  minWidth: {
    sm: "400px",
  },
  maxWidth: {
    sm: "500px",
  },
  mx: {
    md: 4,
    xs: 2,
  },
  position: "relative",
  minHeight: "100%",
  "& .cart-product-title": {
    fontWeight: appStyles.w600,
  },
};

export const notificationDrawerBoxContainer: muiSxPropType = {
  minWidth: {
    sm: "300px",
  },
  maxWidth: {
    sm: "430px",
  },
  mx: {
    md: 4,
    xs: 2,
  },
  position: "relative",
  minHeight: "100%",
  "& .cart-product-title": {
    fontWeight: appStyles.w500,
  },
};

export const prodListBoxContainer: muiSxPropType = {
  "& .MuiTypography-root": {
    color: "#444444",
    //marginTop: 0
  }
};

export const notificationListBoxContainer: muiSxPropType = {
  "& .MuiTypography-root": {
    color: "#444444",
    marginTop: 0
  }
};
export const prodBox: muiSxPropType = {
  maxHeight: {
    xs: "calc(100vh - 450px)",
    sm: "calc(100vh - 400px)",
  },
  overflowY: "auto",
  "& a": {
    textDecoration: "none",
    color: "inherit",
  },
  "& .cart-product-delivery-msg": {
    fontWeight: appStyles.w600,
  },
};

export const notificationRelatedProductBox: muiSxPropType = {
  // maxHeight: {
  //   xs: "calc(100vh - 250px)",
  //   sm: "calc(100vh - 200px)",
  // },
  padding: 2,
  overflowY: "auto",
  "& a": {
    textDecoration: "none",
    color: "inherit",
  },
};

export const cartDrawerFooter: muiSxPropType = {
  position: "absolute",
  width: "100%",
  bottom: 0,
  paddingTop: 2,
  bgcolor: "background.paper",
};
export const userInfoAndPricesContainer: muiSxPropType = {
  // width: {
  //   md: '50%',
  //   sm: '70%',
  // },
  // marginLeft: 'auto',
};

export const editCustomerInfoBtn: muiSxPropType = {
  mt: 1,
  color: grey[900],
  fontWeight: appStyles.w500,
};

export const tableBody: muiSxPropType = {
  "& .MuiTableCell-root": {
    padding: "10px",
  },
};

export const tableRowWithNoBorder: muiSxPropType = {
  "& .MuiTableCell-root": {
    borderBottom: "none !important",
  },
};

export const addMoreBtn: muiSxPropType = {
  fontWeight: 600,
  fontSize: 16,
  textTransform: "capitalize",
};

export const confirmOrderBtn: muiSxPropType = {
  fontWeight: 500,
  fontSize: 16,
  textTransform: "capitalize",
  boxShadow: "rgba(0, 0, 0, 0.65) 0px 0px 15px"
};

export const mobileNavListItemStyles: muiSxPropType = {
  "& .MuiTypography-root": {},
  "& .MuiListItemButton-root": {
    px: 4,
  },
  "& .Mui-selected": {
    background: `${appColors.lighYellow} !important`,
    "& .MuiTypography-root": {
      fontWeight: appStyles.w600,
    },
    borderRight: `3px solid ${brown[400]}`,
  },
};

export const topBanner: muiSxPropType = {
  background: appColors.darkGrey,
  py: "2px",
  "& .theqa-logo": {
    display: "block",
    cursor: "pointer",
    ml: {
      xs: 1,
      sm: 0,
    },
    mr: {
      xs: 2,
    },
    height: {
      xs: "26px",
      sm: "53px",
    },
  },
  "& .top-banner-text": {
    cursor: "pointer",
    fontSize: {
      xs: 12,
      sm: 14,
    },
  },
};
