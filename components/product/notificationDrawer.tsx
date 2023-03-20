import {
  Box,
  Divider,
  Grid,
  Stack,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
  Rating
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Products } from "../allTypes/productType";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartDrawerElAtom, notificationDrawerElAtom } from "../../atoms/atoms";
import appConfig from "../../config";
import { BlackButton } from "../common/styled/buttons";
import * as styles from "../common/navbar/styles";

interface Props {
  open: boolean;
  categoryId: string;
  categoryName: string;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const NotificationDrawer = ({ open, categoryId, categoryName, toggleDrawer }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const setNotificaitonDrawerEl = useSetRecoilState(notificationDrawerElAtom);
  const [cartDrawerEl, setCartDrawerEl] = useRecoilState(cartDrawerElAtom);
  const isWidthSM = useMediaQuery(theme.breakpoints.down("sm"));
  
  const useRelatedProducts = useQuery({
    queryKey: ["relatedProducts", categoryId],
    queryFn: async () => {
      const { data } = await axios.post("/api/store/product/catalog/query/get", {
        models: {
          "location_data.website_remarks": `${appConfig.api.locationId}_Live`,
          "category.value": categoryId,
        },
        skip: 0,
        limit: 4,
        sort: { modified_date: -1 },
      });
      return data as Products;
    },
  });

  const handleViewCart = (event: any) => {
    setNotificaitonDrawerEl(false);
    setCartDrawerEl(true);
  };

  const handleCloseNotificationDrawer = () => {
    if (open) {
      setNotificaitonDrawerEl(false);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleCloseNotificationDrawer);

    return () => {
      router.events.off("routeChangeStart", handleCloseNotificationDrawer);
    };
  }, [router]);

  return (
    <SwipeableDrawer
      anchor={isWidthSM ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      sx={styles.notificationDrawerStyle}
    >
      <Box sx={styles.notificationDrawerBoxContainer}>
        <Box sx={styles.notificationListBoxContainer}>
          <Box
            mb={{
              sm: 2,
              xs: 6,
            }}
            bgcolor={yellow[600]} 
            p={1}
          >
            <Typography
              variant="subtitle2"
              textAlign="center"
              my={1}
              py={1}
              // bgcolor={yellow[600]}
            >
              <span style={{ fontWeight: 600, fontSize: '18px', lineHeight: "138.52%" }}>Product successfully added</span>
              <br />
              <span style={{ color: "red", fontStyle: "italic", fontWeight: 600 }}>Add more Save more</span> - 10 QAR delivery charge. {" "}
              <span style={{ color: "red" }}>FREE</span> Delivery above <span style={{ fontWeight: 700 }}>150 QAR</span>.
            </Typography>
            <Grid container justifyContent="space-evenly">
              <Grid item>
                <BlackButton
                  disableElevation
                  sx={styles.confirmOrderBtn}
                  variant="contained"
                  onClick={handleViewCart}
                >
                  View Cart
                </BlackButton>
              </Grid>
            </Grid>
            <br/>
          </Box>
          <Box sx={styles.notificationRelatedProductBox}>
            <Typography
                variant="subtitle2"
                my={1}
                py={1}
                // bgcolor={yellow[600]}
              >
                <span style={{ fontWeight: 700, fontSize: '20px', lineHeight: "138.52%" }}>Related Products</span>
            </Typography>
            <Grid container rowSpacing={{ xs: 1, md: 2 }} direction="column">
              {useRelatedProducts &&
                useRelatedProducts.data?.data.map((product, index) => (
                  <Grid
                    container
                    item
                    columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                    sx={{ width: "100%" }}
                    // justifyContent="space-between"
                    wrap="nowrap"
                    key={product._id}
                  >
                    <Grid item>
                      <Link href={`/product/${product._id}`} legacyBehavior>
                        <img
                          src={`${appConfig.api.imgUrl}/${product.image_name[0].name}`}
                          alt="cart-product-thumb"
                          width="80"
                          height="80"
                          className="cart-product-image"
                        />
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" component="div">
                        <Link href={`/product/${product._id}`} className="cart-product-title" onClick={handleCloseNotificationDrawer}>
                          {product.product_name}
                        </Link>
                        <br />
                        <Box sx={{ fontSize: '12px' }}>
                          {product.product_sku}
                        </Box>
                        <Typography sx={{ fontWeight: 700, width: '60px', height: '20px', borderRadius: '5px', justifyContent: 'center', display: 'flex' }} variant="body2" noWrap bgcolor={yellow[600]} component="div">
                          <span>
                            <span style={{ fontSize: '10px', marginBottom: 5 }}>{appConfig.product.currency}</span>
                            &nbsp; {product.location_data[0].discounted_price && product.location_data[0].discounted_price > 0 ? product.location_data[0].discounted_price : product.location_data[0].selling_price}
                          </span>
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Rating name="read-only" sx={{ width: "100%", mr: 1 }} value={product.average_rating} readOnly /> 
                          ({product.total_reviews})
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item ml="auto" mr={1}>
                      <Stack alignItems="center">
                      <Link href={`/product/${product._id}`}>
                        <BlackButton
                          disableElevation
                          sx={{fontSize: { xs: 13 }, fontWeight: 500, lineHeight: '19.39px'}}
                          variant="contained"
                          onClick={handleCloseNotificationDrawer}
                        >
                          View
                        </BlackButton>
                      </Link>
                      </Stack>
                    </Grid>
                    <Divider />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}