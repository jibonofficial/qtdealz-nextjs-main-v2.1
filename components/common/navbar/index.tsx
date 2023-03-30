import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "components/allTypes/categoriesType";
import { AllCartProds } from "components/allTypes/dto/CartDTO";
import appConfig from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { cartDrawerElAtom, customerContactInfo, topBannerAtom } from "../../../atoms/atoms";
import { appStyles } from "../appColors";
import { removeCustomerDetailsFromStorage, removeSessionId } from "../functions";
import CartDrawer from "./cartDrawer";
import NavLeftSideMenuDrawer from "./leftMenuDrawer";
import { SearchBar } from "./searchBar";
import * as styles from "./styles";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Navbar() {
  const queryClient = useQueryClient();
  const [cartDrawerEl, setCartDrawerEl] = useRecoilState(cartDrawerElAtom);
  const [displayTopBanner, setDisplayTopBanner] = useRecoilState(topBannerAtom);
  const [anchorLeftMenuEl, setAnchorLeftMenuEl] = useState<boolean>(false);
  const [customerContInfo, setCustomerContInfo] = useRecoilState(customerContactInfo);
  const cartProducts = queryClient.getQueryData<AllCartProds>(["cartProducts"]);
  const categories = queryClient.getQueryData<CategoryType[]>([appConfig.queryKeys.categories]);
  const router = useRouter();
  const { catId } = router.query;

  const toggleCartDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setCartDrawerEl(open);
  };

  const toggleLeftMenuDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setAnchorLeftMenuEl(open);
    };

  const handleLogout = () => {
    removeCustomerDetailsFromStorage();
    removeSessionId();
    setCustomerContInfo(null);
    queryClient.resetQueries(["cartProducts"]);
  };

  const openTheqaUrl = () => {
    window.open(appConfig.siteInfo.certificateURL, "_blank");
  };

  const [fixedSearchbar, setFixedSearchbar] = React.useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset || document.documentElement.scrollTop;
    console.log(position);
    if(position > 210){
      setFixedSearchbar(true)
    }else{
      setFixedSearchbar(false)
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={styles.navbarStyles} className={displayTopBanner ? "navbar-with-topbanner" : "navbar"}>
   
        <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={styles.appbarStyles}
      >
        {displayTopBanner && (
          <Box sx={styles.topBanner}>
            <Container maxWidth="lg" disableGutters>
              <Grid2 container alignItems={"center"} wrap="nowrap" sx={styles.topBanner}>
                <Grid2>
                  <img
                    onClick={openTheqaUrl}
                    src="/images/theqa_logo.png"
                    className="theqa-logo"
                    alt="theqa logo"
                  />
                </Grid2>
                <Grid2 xs={9}>
                  <Typography color={"#ffffff"} className="top-banner-text" onClick={openTheqaUrl}>
                    <i>
                      Buy with Confidence. We are <strong>certified by THEQA</strong> - Qatar
                      Ministry of Communication & Transport
                    </i>
                  </Typography>
                </Grid2>
                <Grid2 xsOffset={"auto"}>
                  <IconButton sx={{ color: "#ffffff" }} onClick={() => setDisplayTopBanner(false)}>
                    <CancelIcon />
                  </IconButton>
                </Grid2>
              </Grid2>
            </Container>
          </Box>
        )}
        <Box sx={styles.actionNavStyles}>
          <Container maxWidth="lg">
            <Grid2 container component="nav" alignItems={"center"} spacing={{ xs: 2, sm: 3 }}>
              <Grid2 sx={{ display: { xs: "flex", md: "none" } }}>
                {/* Left menu icon only for Mobile View */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleLeftMenuDrawer(true)}
                  sx={{ pr: 0, pb: 0, pt: 0 }}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Grid2>
              <Grid2 sx={{ display: { xs: "none", md: "block" } }}>
                <Link href="/" className="logo-link">
                  <img src={`/images/qtdealz-logo.png`} alt="logo" className="header-logo" />
                </Link>
              </Grid2>
              <Grid2 sx={{ display: { xs: "none", md: "block" }, flex: 1 }}>
                <SearchBar />
              </Grid2>
              <Grid2
                sx={{
                  display: { xs: "flex", md: "none" },
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <SearchBar /> */}
                <Link href="/" className="logo-link">
                  <img
                    src={`/images/qtdealz-logo.png`}
                    alt="logo"
                    className="header-logo"
                    style={{ maxHeight: "50px", margin: "8px 10px 0 10px" }}
                  />
                </Link>
              </Grid2>
              <Grid2>
                <Tooltip title="Cart">
                  <IconButton onClick={toggleCartDrawer(true)} className="nav-icon">
                    <Badge
                      badgeContent={cartProducts ? cartProducts.data?.length : 0}
                      color="primary"
                    >
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Grid2>
              {customerContInfo && (
                <Grid2>
                  <Button
                    className="nav-icon"
                    sx={{
                      color: "var(--dark-grey)",
                      fontWeight: appStyles.w600,
                      fontSize: 16,
                    }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </Grid2>
              )}
            </Grid2>
          </Container>
        </Box>
        <Box sx={styles.catNavStyles}>
          <Container maxWidth="lg" sx={{ bgcolor: "white" }}>
            <Grid2
              container
              wrap="nowrap"
              spacing={4}
              alignItems="center"
              justifyContent={"space-between"}
              sx={{ mx: 1, my: 0.5, mb: 0 }}
            >
              <Grid2
                component="li"
                className={`nav-cat-container ${router.asPath === "/" ? "nav-item-active" : ""}`}
              >
                <Link href="/" className="nav-item">
                  HOME
                </Link>
              </Grid2>
              {categories &&
                categories.map((category) => (
                  <Grid2
                    component="li"
                    key={category._id}
                    className={`nav-cat-container ${
                      catId === category._id ? "nav-item-active" : ""
                    }`}
                    style={{ position: "relative" }}
                  >
                    <Link
                      href={`/category/${category._id}/${category.category_name}`}
                      className="nav-item"
                    >
                      {category.category_name.toUpperCase()}
                    </Link>
                    {category.category_name.toUpperCase() == "CLEARANCE SALE" ? (
                      <img
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "10px",
                          width: "32px",
                          animation: "png-animatide 2s infinite",
                        }}
                        src="/images/sale.png"
                      />
                    ) : null}
                    {category.category_name.toUpperCase() == "NEW ARRIVAL" ? (
                      <img
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "10px",
                          width: "32px",
                          animation: "png-animatide 2s infinite",
                        }}
                        src="/images/new.png"
                      />
                    ) : null}
                  </Grid2>
                ))}
            </Grid2>
          </Container>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }} mx={2} pb={1}>
          <SearchBar />
        </Box>
      </AppBar>
    
      {fixedSearchbar && (
  <AppBar position="fixed" color="inherit" elevation={0} sx={styles.appbarStyles} style={{position:'fixed'}}>
  <Box sx={{ display: { xs: "flex", md: "none" } }} mx={2} py={1.5}>
    <SearchBar />
  </Box>
</AppBar>
      ) }
    
      <CartDrawer open={cartDrawerEl} toggleDrawer={toggleCartDrawer} />
      <NavLeftSideMenuDrawer open={anchorLeftMenuEl} toggleDrawer={toggleLeftMenuDrawer} />
    </Box>
  );
}
