import { appColors, appStyles } from "components/common/appColors";
import { muiSxPropType } from "components/common/types";

export const priceContainer: muiSxPropType = {
  fontSize: "body1.fontSize",
  listStyle: "none",
  "& li": { pb: 1 },
};
export const orderDetails: muiSxPropType = {
  width: {
    sm: "80%",
    md: "60%",
  },
  marginX: "auto",
  marginY: 6,
};

export const whatsappLink: muiSxPropType = {
  color: appColors.darkGrey,
  fontWeight: "700",
  fontSize: "1.1em",
};
export const invoiceLink: muiSxPropType = {
  fontWeight: appStyles.w500,
};
