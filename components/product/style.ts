import { grey, yellow } from "@mui/material/colors";
import { appColors, appStyles } from "components/common/appColors";
import { muiSxPropType } from "../common/types";

export const placeOrderButton: muiSxPropType = {
  px: {
    md: 3,
  },
  fontWeight: appStyles.w600,
  fontSize: "15px",
};

export const outOfStock: muiSxPropType = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const addMoreBtn: muiSxPropType = {
  px: {
    md: 3,
  },
  fontWeight: appStyles.w600,
  fontSize: "15px",
};

export const formGrid: muiSxPropType = {
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid black",
  },
  "& .MuiTextField-root": {
    color: "grey !important",
  },
  "& .phone-text-field .MuiInputAdornment-root .MuiTypography-root": {
    fontWeight: appStyles.w600,
    color: appColors.darkGrey,
  },
  "& .phone-text-field .MuiInputBase-inputAdornedStart": {
    borderLeft: `1px solid ${appColors.darkGrey}`,
    paddingLeft: "10px",
  },
  "& .MuiSelect-outlined": {
    display: "flex",
    padding:1.5
  },
  "& .MuiInputBase-input": {
    padding:1.4
  },
};

export const priceDetails: muiSxPropType = {
  fontWeight: appStyles.w600,
  fontSize: {
    sm: "h6.fontSize",
    xs: "body1.fontSize",
  },
};

export const regularPrice: muiSxPropType = {
  fontWeight: appStyles.w600,
  fontSize: {
    xs: "h6.fontSize",
  },
};

export const discountPrice: muiSxPropType = {
  fontWeight: appStyles.w600,
  fontSize: "h6.fontSize",
};

export const discountPercentage: muiSxPropType = {
  fontWeight: appStyles.w600,
};

export const orderModalStyle: muiSxPropType = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const orderModalCheckBox: muiSxPropType = {
  bgcolor: "background.paper",
  borderRadius: "50%",
  border: "2px solid #222222",
  width: "fit-content",
  pt: 1,
  px: 1,
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const orderModalHeader: muiSxPropType = {
  pt: 7,
  pb: 2,
  px: 1,
  bgcolor: yellow[500],
  textAlign: "center",
};

export const orderModalActions: muiSxPropType = {
  textAlign: "center",
};

export const orderModalActionsButton: muiSxPropType = {
  width: 200,
};

export const delivaryNote: muiSxPropType = {
  m: 1,
};

export const imageModalStyle: muiSxPropType = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  outline: "none",
  bgcolor: "background.paper",
  minHeight: "100%",
  minWidth: "100%",
  "& .modal-slider-container": {
    maxWidth: {
      xs: "100%",
      sm: "70%",
      lg: "50%",
    },
    maxHeight: "90vh",
    p: {
      xs: 2,
      sm: 5,
    },
    img: {
      objectFit: "contain",
      width: "100%",
      height: "100%",
      maxHeight: "80vh",
    },
  },
};

export const imageModalCloseButton: muiSxPropType = {
  position: "absolute",
  right: 10,
  top: 10,
};

export const negativeInventoryModalContent: muiSxPropType = {
  "& img": {
    display: "block",
    mx: "auto",
    mb: 5,
  },
  fontWeight: appStyles.w600,
  "& li, p": {
    fontWeight: appStyles.w600,
  },
  "& p": {
    mb: 1,
  },
  "& ul": {
    listStyleType: "'\\2713'",
    my: 2,
    "& li": {
      mb: 1,
      pl: 2,
    },
  },
  "& .smily": {
    fontSize: "h5.fontSize",
  },
};

export const overralReviewsContainer: muiSxPropType = {
  background: appColors.lightGrey,
  py: 5,
  px: {
    xs: 2,
    sm: 5,
  },
  borderRadius: "0 0 20px 20px",
};

export const customerFeedbackContainer: muiSxPropType = {
  py: 1,
};

export const productCommentsWrapper: muiSxPropType = {
  mb: 5,
  mt: 3,
};

export const productComment: muiSxPropType = {
  p: 3,
};

export const relatedProducts: muiSxPropType = {
  "& .products-wrapper": {
    "div:nth-of-type(3)": {
      display: {
        xs: "none",
        md: "block",
      },
    },
    "div:nth-of-type(4)": {
      display: {
        xs: "none",
        lg: "block",
      },
    },
  },
};

export const relatedProductsTitle: muiSxPropType = {
  fontSize: { xs: "h4.fontSize", sm: "h3.fontSize", md: "h2.fontSize" },
  textAlign: "center",
  color: grey[800],
  mb: {
    xs: 2,
    sm: 4,
  },
};

export const soldOutMenuText: muiSxPropType = {
  ml: "auto",
};

export const sizeSelectOption: muiSxPropType = {
  "& .MuiMenuItem-root.Mui-disabled": {
    opacity: 0.85,
  },
};
