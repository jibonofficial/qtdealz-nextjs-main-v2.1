import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useIsFetching, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { AllCartProds, SingleCartProduct } from "components/allTypes/dto/CartDTO";
import { NewOrderResponse } from "components/allTypes/dto/newOrder.dto";
import { removeProdFromCart, updateCart } from "components/hooks/useCart";
import { postNewOrder } from "components/hooks/useOrder";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartDrawerElAtom, customerContactInfo, selectedSubSKUAtom } from "../../../atoms/atoms";
import appConfig from "../../../config";
import { appStyles } from "../appColors";
import { removeCustomerDetailsFromStorage } from "../functions";
import { BlackButton, LinkButton, YellowButton } from "../styled/buttons";
import { EditCustomerInfo } from "./modals";
import * as styles from "./styles";

interface Props {
  open: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function CartDrawer({ open, toggleDrawer }: Props) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const cartProducts = queryClient.getQueryData<AllCartProds>(["cartProducts"]);
  const router = useRouter();
  const setCartDrawerEl = useSetRecoilState(cartDrawerElAtom);
  const [selectedSubSku, setSelectedSubSku] = useRecoilState(selectedSubSKUAtom);
  const [customerContInfo, setCustomerContInfo] = useRecoilState(customerContactInfo);
  const isWidthSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [editCustomerInfoModal, setEditCustomerInforModal] = useState(false);
  const isCartFetching = useIsFetching(["cartProducts"]) > 0;

  const newOrderMutation = useMutation(postNewOrder, {
    onSuccess: (data: AxiosResponse<NewOrderResponse, any>) => {
      const res = data.data;
      router.push(`/order-confirmed/${res.order_number}`);
    },
  });

  const updateCartMutation = useMutation(updateCart);
  const removeProdFromCartMutation = useMutation(removeProdFromCart);

  const handleConfirmOrder = async (event: any) => {
    if (cartProducts) {
      await newOrderMutation.mutateAsync({
        cartProducts,
        selectedSubSku,
      });
      removeCustomerDetailsFromStorage();
      setCustomerContInfo(null);
      await queryClient.refetchQueries(["cartProducts"]);
      toggleDrawer(false)(event);
    }
  };

  const handleAddMore = (event: any) => {
    toggleDrawer(false)(event);
    if (router.pathname !== "/") router.push("/");
  };

  const modifyProdQty = async (product: SingleCartProduct, task: "decrease" | "increase") => {
    if (task === "increase") {
      await updateCartMutation.mutateAsync({
        cartProduct: {
          ...product,
          cart_quantity: product.cart_quantity + 1,
        },
      });
      await queryClient.refetchQueries(["cartProducts"]);
    } else if (task === "decrease") {
      await updateCartMutation.mutateAsync({
        cartProduct: {
          ...product,
          cart_quantity: product.cart_quantity - 1,
        },
      });
      await queryClient.refetchQueries(["cartProducts"]);
    }
  };

  const handleCloseCartDrawer = () => {
    if (open) {
      setCartDrawerEl(false);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleCloseCartDrawer);

    return () => {
      router.events.off("routeChangeStart", handleCloseCartDrawer);
    };
  }, [router]);

  // why btnType? to disable both quantity and confirmOrder btns but not to display loading icon on both buttons
  const isCartMutating = (): boolean => {
    return newOrderMutation.isLoading ||
      updateCartMutation.isLoading ||
      removeProdFromCartMutation.isLoading ||
      isCartFetching
      ? true
      : false;
  };

  const isProdQtyMutating = (): boolean => {
    return updateCartMutation.isLoading || removeProdFromCartMutation.isLoading || isCartFetching
      ? true
      : false;
  };

  const removeProduct = async (product: SingleCartProduct) => {
    await removeProdFromCartMutation.mutateAsync({ cartProduct: product });
    await queryClient.refetchQueries(["cartProducts"]);
  };

  const handleEditCustomerInfoModalOpen = () => {
    setEditCustomerInforModal(true);
  };
  const handleEditCustomerInfoModalClose = () => {
    setEditCustomerInforModal(false);
  };

  return (
    <SwipeableDrawer
      anchor={isWidthSM ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      sx={styles.cartDrawerStyle}
    >
      <Box sx={styles.cardDrawerBoxContainer}>
        <Box sx={styles.prodListBoxContainer}>
          <Box pb={2}>
            <Typography my={3} variant="body2">
              Dear User,
              <br />
              {cartProducts ? (
                <span>You order is saved successfully.</span>
              ) : (
                <span>You have no items in your shopping cart.</span>
              )}
              <br />
              <span style={{ color: "red" }}>
                Free Replacement - Free Refund in 24 Hours. No Questions asked.
              </span>
            </Typography>
            {isProdQtyMutating() ? <LinearProgress /> : <Divider sx={{ height: 4 }} />}
          </Box>
          <Box sx={styles.prodBox}>
            <Grid container rowSpacing={{ xs: 1, md: 2 }} direction="column">
              {cartProducts &&
                cartProducts.data?.map((product, index) => (
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
                      <Link href={`/product/${product.parent_id}`} legacyBehavior>
                        <img
                          src={`${appConfig.api.imgUrl}/${product.image_name}`}
                          alt="cart-product-thumb"
                          width="100"
                          height="100"
                          className="cart-product-image"
                        />
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" component="div">
                        <Link href={`/product/${product.parent_id}`} className="cart-product-title">
                          {product.product_name}
                        </Link>
                        <br />
                        <Box sx={{ fontSize: { xs: 13, sm: "inherit" } }}>
                          Quantity:
                          <IconButton
                            size="small"
                            disabled={
                              isProdQtyMutating() || product.cart_quantity < 2 ? true : false
                            }
                            onClick={() => modifyProdQty(product, "decrease")}
                          >
                            <RemoveIcon fontSize="inherit" />
                          </IconButton>
                          &nbsp; {product.cart_quantity} &nbsp;
                          <IconButton
                            size="small"
                            disabled={isProdQtyMutating()}
                            onClick={() => modifyProdQty(product, "increase")}
                          >
                            <ControlPointIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                        <div
                          className="cart-product-delivery-msg"
                          dangerouslySetInnerHTML={{
                            __html: cartProducts.delivery_message,
                          }}
                        />
                      </Typography>
                    </Grid>
                    <Grid item ml="auto" mr={1}>
                      <Stack alignItems="center">
                        <Typography variant="body2" noWrap>
                          <b>
                            {product.product_price}
                            &nbsp;{appConfig.product.currency}
                          </b>
                        </Typography>
                        <LinkButton
                          size="small"
                          disabled={isProdQtyMutating()}
                          onClick={() => removeProduct(product)}
                        >
                          Remove
                        </LinkButton>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
        <Box sx={styles.cartDrawerFooter}>
          <Divider />
          <Box sx={styles.userInfoAndPricesContainer}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={6}>
                {customerContInfo && (
                  <Box>
                    <Typography
                      sx={{
                        color: "green",
                      }}
                      variant="body1"
                      my={1}
                      fontWeight={appStyles.w600}
                    >
                      Delivery Address
                    </Typography>
                    <Stack direction={"row"} justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" fontWeight={appStyles.w600} gutterBottom>
                          {customerContInfo.name}
                        </Typography>
                        <Typography variant="body2" fontWeight={appStyles.w600} gutterBottom>
                          {customerContInfo.phone}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          sx={styles.editCustomerInfoBtn}
                          onClick={handleEditCustomerInfoModalOpen}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Stack>
                    <Typography variant="body2" fontWeight={appStyles.w600}>
                      {customerContInfo.address}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={6}>
                <TableContainer>
                  <Table>
                    <TableBody sx={styles.tableBody}>
                      <TableRow sx={styles.tableRowWithNoBorder}>
                        <TableCell>
                          <Typography variant="body2">Subtotal</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            <b>
                              {cartProducts ? cartProducts.cod_details.cart_amount : 0}
                              &nbsp;
                              {appConfig.product.currency}
                            </b>
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Shipping Fee</TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            sx={{
                              color: "green",
                            }}
                          >
                            <b>
                              {cartProducts ? cartProducts.cod_details.delivery_charge : 0}
                              &nbsp;{appConfig.product.currency}
                            </b>
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "& .MuiTableCell-root": {
                            borderBottom: "none !important",
                          },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2">Grand Total</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            <b>
                              {cartProducts ? cartProducts.cod_details.total_amount : 0}
                              &nbsp;{appConfig.product.currency}
                            </b>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box
            mb={{
              sm: 2,
              xs: 6,
            }}
          >
            <Typography
              variant="subtitle2"
              textAlign="center"
              my={1}
              py={1}
              // bgcolor={yellow[600]}
            >
              <span style={{ color: "red" }}>Buy More</span> - With same delivary cost. Save More
            </Typography>
            <Grid container justifyContent="space-evenly">
              <Grid item>
                <BlackButton
                  disableElevation
                  sx={styles.confirmOrderBtn}
                  variant="contained"
                  onClick={handleAddMore}
                >
                  Add More
                </BlackButton>
              </Grid>
              <Grid item>
                <YellowButton
                  disabled={isCartMutating() || !cartProducts}
                  disableElevation
                  sx={styles.addMoreBtn}
                  variant="contained"
                  onClick={handleConfirmOrder}
                  startIcon={isCartMutating() && <CircularProgress size={16} color="inherit" />}
                >
                  Confirm Order
                </YellowButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {customerContInfo && (
        <EditCustomerInfo
          open={editCustomerInfoModal}
          handleClose={handleEditCustomerInfoModalClose}
        />
      )}
    </SwipeableDrawer>
  );
}
