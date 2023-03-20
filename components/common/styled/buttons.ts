import { styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import { grey, yellow } from "@mui/material/colors";
import { appColors, appStyles } from "../appColors";

export const YellowButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: yellow[500],
  color: appColors.darkGrey,
  border: `1px solid ${appColors.darkGrey}`,
  fontWeight: 700,
  ":hover": {
    color: "#fff",
    backgroundColor: appColors.darkGrey,
    "& .MuiCircularProgress-root": {
      color: "#fff",
    },
  },
}));

export const BlackButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: grey[900],
  border: "1px solid #222222",
  color: "fff",
  fontWeight: appStyles.w600,
  ":hover": {
    backgroundColor: "#fff",
    color: grey[900],
  },
}));

export const LinkButton = styled(Button)<ButtonProps>(() => ({
  color: "#1769aa",
}));
