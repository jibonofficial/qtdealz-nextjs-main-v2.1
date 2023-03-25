import { grey } from "@mui/material/colors";
import { appColors, appStyles } from "components/common/appColors";
import { muiSxPropType } from "../../../common/types";

export const prodCardStyles: muiSxPropType = {
  ":hover": {
    cursor: "pointer",
  },
  position: "relative",
  "& a": {
    textDecoration: "none",
  },
  "& .prod-box-img": {
    objectFit: "cover",
    width: "100%",
    height: {
      xs: "150px",
      sm: "345px",
      lg: "250px",
    },
  },
  "& .main-prod-card-img": {
    borderRadius: `${appStyles.shape}px ${appStyles.shape}px 0 0`,
  },
  // When hovered on Prdouct the height dissapears and the footer go up to the top
  // this height was to fix that bug
  minHeight: {
    lg: "345px",
    md: "440px",
    sm: "436px",
  },
};

export const hoveredProdPaper: muiSxPropType = {
  display: "block",
  position: "absolute",
  top: "30px",
  left: "8px",
  bottom: 0,
  right: 0,
  width: "100%",
  height: "fit-content",
  zIndex: 10,
  p: "10px",
};

export const swiperImgTextNewIn: muiSxPropType = {
  position: "absolute",
  bottom: 0,
  left: 0,
  p: 1,
  bgcolor: "#fff",
};

export const prodDetailsHeader: muiSxPropType = {
  fontWeight: "700",
  fontSize: {
    xs: "11px",
    sm: "13px",
  },
};
export const hoveredProdBox: muiSxPropType = { position: "relative" };
export const hoveredProdAddButton: muiSxPropType = {
  mt: 1,
  fontWeight: appStyles.w600,
  fontSize: 16,
};

export const prodTitle: muiSxPropType = {
  fontSize: {
    xs: "11px",
    sm: "13px",
  },
  color: grey[700],
  mr: 1,
};

export const prodPriceText: muiSxPropType = {
  display: "flex",
  alignItems: "center",
  my: 0.5,
  fontWeight: "700",
  fontSize: {
    xs: "16px",
  },
  "@media (max-width: 405px)": {
    fontSize: "13px",
  },
};
export const prodPriceNumber: muiSxPropType = {
  // fontSize: {
  //   sm: "16px",
  //   xs: "12px",
  // },
};
export const prodDiscountPrice: muiSxPropType = {
  position:'relative',
  color: grey[500],
  ml: 1,
  fontSize: {
    xs: "13px",
  },
  "@media (max-width: 405px)": {
    fontSize: "11px",
  },

  ':after':{
    content: "'X'",
    position: "absolute",
    left: "40%",
    top: "-8px",
    color: "red",
    fontWeight: "lighter",
    fontSize: "22px",
  }
};


export const saleText: muiSxPropType = {
  fontWeight: "bold",
  backgroundColor: "red",
  whiteSpace: "nowrap",
  color: "white",
  px: {
    xs: 0.5,
    sm: 1,
  },
  py: {
    sm: 0.35,
  },
  borderRadius: `${appStyles.shape}px`,
  ml: "auto",
  fontSize: {
    xs: "12px",
  },
};

export const prodCatTitle: muiSxPropType = {
  textAlign: "center",
  fontWeight: appStyles.w500,
  textDecoration: "none",
  color: appColors.darkGrey,
  mb: 1,
};
