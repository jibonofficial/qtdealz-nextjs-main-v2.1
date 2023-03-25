import { grey } from "@mui/material/colors";
import { muiSxPropType } from "components/common/types/index";

export const homeCompWrapper: muiSxPropType = {
  px: {
    xs: 2,
    md: 5,
  },
  pt:1,
  "& .banner-img": {
    width: "100%",
    borderRadius: {
      xs: "10px",
      sm: "20px",
    },
  },
};

export const viewMoreBtnWrapper: muiSxPropType = {
  mt: 6,
  mb: {
    xs: 2,
    md: 6,
  },
};
export const viewMoreProdButton: muiSxPropType = {};
