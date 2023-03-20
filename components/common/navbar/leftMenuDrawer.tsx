import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "components/allTypes/categoriesType";
import appConfig from "config";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import * as styles from "./styles";
import { useRecoilState } from "recoil";
import { customerContactInfo } from "atoms/atoms";
import { removeCustomerDetailsFromStorage, removeSessionId } from "../functions";
import { appStyles } from "../appColors";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 1em 0 2em",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface Props {
  open: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function NavLeftSideMenuDrawer({ open, toggleDrawer }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<CategoryType[]>([appConfig.queryKeys.categories]);
  const [customerContInfo, setCustomerContInfo] = useRecoilState(customerContactInfo);
  const { catId } = router.query;

  const handleRoute = (route: string, event: any) => {
    router.push(route);
    toggleDrawer(false)(event); // should add event in separate functions. https://stackoverflow.com/questions/18234491/two-sets-of-parentheses-after-function-call
  };
  const handleLogout = (event: any) => {
    toggleDrawer(false)(event);
    removeCustomerDetailsFromStorage();
    removeSessionId();
    setCustomerContInfo(null);
    queryClient.resetQueries(["cartProducts"]);
  };
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box sx={{ minWidth: "330px" }}>
        <DrawerHeader>
          <Typography variant="h6" fontWeight={appStyles.w600}>
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <nav>
            <List sx={styles.mobileNavListItemStyles}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={router.asPath === "/"}
                  onClick={(event: any) => handleRoute("/", event)}
                >
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              {categories &&
                categories.map((category) => (
                  <ListItem key={category._id} disablePadding>
                    <ListItemButton
                      selected={catId === category._id}
                      onClick={(event: any) =>
                        handleRoute(`/category/${category._id}/${category.category_name}`, event)
                      }
                    >
                      <ListItemText primary={category.category_name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              {customerContInfo && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText
                      primary="Logout"
                      primaryTypographyProps={{ fontWeight: appStyles.w600 }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </nav>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
