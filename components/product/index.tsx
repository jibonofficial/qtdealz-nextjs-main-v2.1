import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  makeStyles,
  MenuItem,
  Select,
  Stack,
  StyledComponentProps,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios, { AxiosResponse } from "axios";
import { AllCartProds } from "components/allTypes/dto/CartDTO";
import { NewOrderResponse } from "components/allTypes/dto/newOrder.dto";
import { getCustomerInfo, saveCustomerInfoToStorage } from "components/common/functions";
import { addNewCart } from "components/hooks/useCart";
import appConfig from "config";
import { useFormik } from "formik";
import { concat, find, map } from "lodash";
import React, { useEffect, useState } from "react";
import { useIsFetching, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as yup from "yup";
import { cartDrawerElAtom, customerContactInfo, selectedSubSKUAtom, notificationDrawerElAtom } from "../../atoms/atoms";
import {
  LocationDatum,
  LocationDetails,
  ProdAttrDataType,
  ProductInventoryBulkData,
  ProductInventoryType,
  Products,
  SubSku,
} from "../allTypes/productType";
import {
  getLocationData,
  getProdAttrDataByValue,
  getProdDiscountPercentage,
  postNewOrder,
} from "../hooks/useOrder";
import DescriptionTabs from "./description";
import { ConfirmOrderModal, NegativeInventoryModal, ProductOutOfStockModal } from "./modals";
import { Slider } from "./slider";
import * as styles from "./style";
import { useRouter } from "next/router";
import { appColors, appStyles } from "components/common/appColors";
import { ProductBreadcrumbs } from "./breadcrums";
import { BlackButton, YellowButton } from "components/common/styled/buttons";
import { RelatedProducts } from "./relatedProducts";
import { NotificationDrawer } from "./notificationDrawer";
import { ProductFeedback } from "./feedback";



interface ProductFormValues {
  colorValue: string;
  sizeValue: string;
  designValue: string;
  qty: number | any;
  name: string;
  phone: string;
  city: string;
  address: string;
}

enum CartFormBtnType {
  ADD_TO_CART = "ADD_TO_CART",
  QUICK_CHECKOUT = "QUICK_CHECKOUT",
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Product = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const setCartDrawerEl = useSetRecoilState(cartDrawerElAtom);
  const [notificationDrawerEl, setNotificationDrawerEl] = useRecoilState(notificationDrawerElAtom);
  const [selectedSubSku, setSelectedSubSku] = useRecoilState(selectedSubSKUAtom);
  const [customerContInfo, setCustomerContInfo] = useRecoilState(customerContactInfo);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [userInfoExist, setUserInfoExist] = useState<boolean>(Boolean(customerContInfo));
  const [outOfStockModalOpen, setOutOfStockModalOpen] = useState<boolean>(false);
  const [negativeInventoryModalOpen, setNegativeInventoryModalOpen] = useState<boolean>(false);
  const [sliderImages, setSliderImages] = useState<string[] | null>();
  const cartProducts = queryClient.getQueryData<AllCartProds>(["cartProducts"]);
  const isCartFetching = useIsFetching(["cartProducts"]) > 0;
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  const toggleNotificaitonDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
  
    setNotificationDrawerEl(open);
  };

  const formikInitialValues = {
    colorValue: "",
    sizeValue: "",
    designValue: "",
    qty: "",
    name: "",
    phone: "",
    city: "",
    address: "",
  };

  const newOrderMutation = useMutation(postNewOrder, {
    onSuccess: (data: AxiosResponse<NewOrderResponse, any>) => {
      router.push(`/order-confirmed/${data.data.order_number}/${data.data.delivery_date}`);
    },
  });

  const addProdToCartMutation = useMutation(addNewCart);
  const useLocationDetails: LocationDetails | undefined = queryClient.getQueryData([
    "locationDetails",
  ]);

  const { data } = useQuery(
    ["product", id],
    async () => {
      if (id) {
        const { data } = await axios.post("/api/store/product/catalog/query/get", {
          models: {
            "location_data.website_remarks": `${appConfig.api.locationId}_Live`,
            _id: id,
          },
        });
        return data as Products;
      } else return null;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const productData = data?.data[0];

  const productInventoryMutation = useMutation(
    async (subskuId: string) => {
      const { data } = await axios.post("/api/store/product/inventory/query/get", {
        models: {
          "product_quantity.value": `${appConfig.api.locationId}`,
          product_id: `${subskuId}`,
        },
      });
      return data as ProductInventoryType;
    },
    {
      onSuccess: (data: ProductInventoryType, pid) => {
        if (data.allowOrder === false) {
          setOutOfStockModalOpen(true);
          // resetting all color/design values by default will also remove soldout/available status from options
          if (selectedColor || selectedDesign) {
            formik.setFieldValue("sizeValue", formikInitialValues.sizeValue);
          } else {
            formik.setFieldValue("sizeValue", formikInitialValues.sizeValue);
            formik.setFieldValue("colorValue", formikInitialValues.colorValue);
            formik.setFieldValue("designValue", formikInitialValues.designValue);
          }
        }
      },
    }
  );

  const productInventoryBulkMutation = useMutation(
    async () => {
      const { data } = await axios.post<ProductInventoryBulkData[]>(
        appConfig.apiRoutes.productInventoryBulkRoute,
        {
          models: {
            parent_id: id,
            "product_quantity.value": `${appConfig.api.locationId}`,
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        //
      },
    }
  );

  let locationData: LocationDatum | undefined;
  if (productData) {
    locationData = getLocationData(productData.location_data);
  }

  useEffect(() => {
    if (productData) {
      const subSkuImages = map(productData.sub_sku, "image_url");
      const productImages = map(productData.image_name, "name");
      const allImages = concat(subSkuImages, productImages);
      setNotificationDrawerEl(false);
      const uniqueSubSkuImgs: string[] = [];
      allImages.forEach((value) => {
        if (!uniqueSubSkuImgs.includes(value)) {
          uniqueSubSkuImgs.push(value);
        }
      });

      setSliderImages(uniqueSubSkuImgs);
      formik.setValues({ ...formikInitialValues, ...getCustomerInfo() }, false);
    }
  }, [productData]);

  const schema = yup.object().shape({
    colorValue: productData?.color.length
      ? yup.string().min(1).required("Color is required")
      : yup.string(),
    sizeValue: productData?.size.length
      ? yup.string().min(1).required("Size is required")
      : yup.string(),
    designValue: productData?.design.length
      ? yup.string().min(1).required("Design is required")
      : yup.string(),
    qty: yup.number().min(1).required("Quantity is required"),
    city: yup.string().min(2).required("City is required"),
    name: yup.string().min(2, "Enter a valid Name").required("Name is required"),
    phone: yup.string().length(8, "Enter a valid Number").required("Number is required"),
    address: yup.string().min(1).required("Address is required"),
  });

  const formik = useFormik<ProductFormValues>({
    initialValues: formikInitialValues,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, submitForm }) => {
      if (productData && productData.allowNegativeInventory) {
        setNegativeInventoryModalOpen(true);
      } else {
        await addToCart(values);
      }
    },
  });

  useEffect(() => {
    const formikValues = formik.values;
    if (productData && productData.product_attributes.length) {
      let subSkuName = productData.product_sku;
      for (const attr of productData.product_attributes) {
        const formikAttrValue = formikValues[`${attr}Value`];
        if (formikAttrValue) {
          subSkuName = subSkuName.concat(
            "-",
            getProdAttrDataByValue(productData[attr], formikAttrValue)!.text
          );
        } else {
          subSkuName = productData.product_sku;
          break;
        }
      }
      if (subSkuName !== productData.product_sku) {
        const subSKU = find(productData.sub_sku, {
          sku_number: subSkuName,
        });
        if (subSKU) {
          setSelectedSubSku(subSKU);
          productInventoryMutation.mutate(subSKU._id);
          if (!productInventoryBulkMutation.data) {
            productInventoryBulkMutation.mutate();
          }
        }
      } else {
        let subSKU: SubSku | undefined;
        // only for for sliding to selected design/color image. inventory api will be used on the above if statement.
        if (formikValues.colorValue) {
          subSKU = find(productData.sub_sku, {
            color_name: getProdAttrDataByValue(productData["color"], formikValues.colorValue)!.text,
          });
        } else if (formikValues.designValue) {
          subSKU = find(productData.sub_sku, {
            design_name: getProdAttrDataByValue(productData["design"], formikValues.designValue)!
              .text,
          });
        }
        if (subSKU) setSelectedSubSku(subSKU);
      }
    } else if (productData) {
      productInventoryMutation.mutate(productData._id);
    }

    return () => {
      productInventoryMutation.reset();
    };
  }, [formik.values]);

  const getAllProdAttrData = ({
    colorValue,
    sizeValue,
    designValue,
    address,
    phone,
    name,
    city,
  }: ProductFormValues) => {
    let color: ProdAttrDataType | null | undefined = null;
    let size: ProdAttrDataType | null | undefined = null;
    let design: ProdAttrDataType | null | undefined = null;
    if (colorValue) {
      color = getProdAttrDataByValue(productData!.color, colorValue);
    }
    if (sizeValue) {
      size = getProdAttrDataByValue(productData!.size, sizeValue);
    }
    if (designValue) {
      design = getProdAttrDataByValue(productData!.design, designValue);
    }
    if (address && phone && name && city) {
      // setUserContactInfo({ address, phone, name, city });
      saveCustomerInfoToStorage(name, phone, city, address);
      setCustomerContInfo({ name, phone, city, address });
    }
    return { color, size, design };
  };

  useEffect(() => {
    if (customerContInfo) setUserInfoExist(appConfig.customer.rememberContactInfo);
    else if (appConfig.customer.rmContInfoAfterOrder) setUserInfoExist(false);
  }, [customerContInfo]);

  const addToCart = async (values: ProductFormValues) => {
    if (useLocationDetails && productInventoryMutation.data && productData) {
      const { qty, city } = values;
      const { color, size, design } = getAllProdAttrData(values);
      addProdToCartMutation.mutate(
        {
          productData,
          color,
          size,
          design,
          qty,
          selectedSubSku,
          inventoryData: productInventoryMutation.data,
        },
        {
          onSettled: async () => {
            await queryClient.refetchQueries(["cartProducts"]);
            setNotificationDrawerEl(true);
          },
        }
      );
    }
  };

  const handleConfirmOrder = async () => {
    if (cartProducts) {
      await newOrderMutation.mutateAsync({
        cartProducts,
        selectedSubSku,
      });
      await queryClient.refetchQueries(["cartProducts"]);
      setOpenOrderModal(false);
    }
  };

  const handleAddMore = () => {
    setOpenOrderModal(false);
  };
  
  const getRandomInt = () => {
    return Math.floor(Math.random() * (9 - 6) + 6); // The maximum is exclusive and the minimum is inclusive
  };

  const isCartMutating = (): boolean => {
    return addProdToCartMutation.isLoading || isCartFetching ? true : false;
  };

  const isStockAvailable = (): boolean => {
    if (productInventoryMutation.data) {
      return productInventoryMutation.data.allowOrder;
    } else return false;
  };

  const handleOutOfStockModalClose = () => {
    setOutOfStockModalOpen(false);
  };
  const handleCloseNegativeInventoryModal = () => {
    setNegativeInventoryModalOpen(false);
  };
  const handleConfirmNegativeInventoryModal = () => {
    addToCart(formik.values);
    setNegativeInventoryModalOpen(false);
  };

  const productCategory =
    productData && productData.category.length ? productData.category[0] : undefined;
  const selectedColor: ProdAttrDataType | undefined =
    productData && formik.values.colorValue
      ? productData.color.find((clr) => clr.value === formik.values.colorValue)
      : undefined;
  const selectedDesign: ProdAttrDataType | undefined =
    productData && formik.values.designValue
      ? productData.design.find((dsgn) => dsgn.value === formik.values.designValue)
      : undefined;

  return (
    <>
      <Container sx={{ mb: 10 }}>
        {/* {mdMatches && productCategory && (
          <ProductBreadcrumbs
            secondBreadcrumbRoute={`/category/${productCategory.value}/${productCategory.text}`}
            secondBreadcrumbContent={productCategory.text}
            thirdBreadcrumbContent={`${productData!.product_name} - Sku-${
              productData!.product_sku
            }`}
          />
        )} */}
        <Grid container mb={3} mt={1} justifyContent="space-evenly">
          <Grid item md={5} xs={12} sm={10}>
            <Typography
                fontWeight={appStyles.w600}
                fontSize={{ sm: "1.3rem",xs: ".9rem",  }}
                color={appColors.blueDarkGrey}
                gutterBottom
                textAlign="center"
              >
                {productData?.product_name} - <span style={{fontSize:16, fontWeight: 400, marginBottom: 4}}>SKU-{productData?.product_sku}</span>
            </Typography>
            {sliderImages && (
              <Slider images={sliderImages} youtubeLink={productData?.youtube_link} />
            )}
          </Grid>
          <Grid item md={5} xs={12} sm={10}>
            <Stack
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mt: {
                  xs: 2,
                  md: 0,
                },
              }}
              direction="row"
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              {productData && !productData.special_offer_text && (
                <Typography sx={styles.regularPrice}>
                  {locationData && locationData.discounted_price > 0 ? (
                    <span>
                      Now&nbsp;
                      <span>
                        {appConfig.product.currency}&nbsp;
                        {locationData.discounted_price}
                      </span>
                    </span>
                  ) : (
                    <span>
                      {appConfig.product.currency}&nbsp;
                      {locationData?.selling_price}
                    </span>
                  )}
                </Typography>
              )}
              {locationData && locationData.discounted_price > 0 && (
                <>
                  <Typography sx={styles.discountPrice}>
                    Was&nbsp;
                    <span className="cross">
                      {appConfig.product.currency}&nbsp;
                      {locationData.selling_price}
                    </span>
                  </Typography>
                  <Typography sx={{ ...styles.priceDetails, color: "red" }}>
                    {getProdDiscountPercentage(
                      locationData.selling_price,
                      locationData.discounted_price
                    )}
                    % OFF
                  </Typography>
                </>
              )}
            </Stack>
            <Typography
              variant="h5"
              fontWeight={appStyles.w600}
              fontSize={{ xs: "1.3rem", sm: "h5.fontSize" }}
              textAlign="center"
              mt={2}
            >
              {productData?.special_offer_text}
            </Typography>
            <Typography my={2} textAlign="center" fontSize={{ sm: "1rem",xs: ".8rem",  }}>
              <strong>Order Now - </strong> Fill the form below for quick checkout
            </Typography>
            <div style={{ padding: '0px 60px 0px 60px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
              <div style={{ width: '120px', height: '35px', borderRadius: '5px', backgroundColor: 'green', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>Sold{" "}
              {productData && productData?.quantity_sold > 0 ? productData.quantity_sold * 9 : 0}</div>
              <div style={{ width: '120px', height: '35px', borderRadius: '5px', backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>Left{" "}{getRandomInt()}</div>
            </div>
            <form className="order-form" onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} sx={styles.formGrid} justifyContent="center">
                {productData && productData.color.length > 0 && (
                  <Grid item xs={12} sm={8} md={12}>
                    <FormControl
                      fullWidth
                      error={formik.touched.colorValue && Boolean(formik.errors.colorValue)}
                    >
                      <Select
                        name="colorValue"
                        displayEmpty
                        value={formik.values.colorValue}
                        onChange={formik.handleChange}
                      >
                        <MenuItem disabled value="">
                          <span>Select Color</span>
                        </MenuItem>
                        {productData.color.map(({ _id, text, value }) => {
                          const possibleSubSku = `${productData.product_sku}-${text}`;
                          const colorSubSkuData =
                            productInventoryBulkMutation.data &&
                            productInventoryBulkMutation.data.find(
                              (subsku) => subsku.product_sku === possibleSubSku
                            );
                          const allowOrder = colorSubSkuData?.allowOrder;

                          return (
                            <MenuItem
                              value={value}
                              key={_id}
                              disabled={allowOrder === false ? true : false}
                            >
                              {text}
                              {typeof allowOrder === "boolean" && (
                                <Box
                                  component={"span"}
                                  className="sold-out"
                                  sx={styles.soldOutMenuText}
                                  style={{
                                    color: allowOrder === false ? appColors.red : appColors.green,
                                  }}
                                >
                                  {allowOrder === false ? "Sold Out" : "Available"}
                                </Box>
                              )}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.errors.colorValue && (
                        <FormHelperText>{formik.errors.colorValue}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                )}
                {productData && productData.design.length > 0 && (
                  <Grid item xs={12} sm={8} md={12}>
                    <FormControl
                      fullWidth
                      error={formik.touched.designValue && Boolean(formik.errors.designValue)}
                    >
                      <Select
                        name="designValue"
                        displayEmpty
                        value={formik.values.designValue}
                        onChange={formik.handleChange}
                      >
                        <MenuItem disabled value="">
                          <span>Select Design</span>
                        </MenuItem>
                        {productData.design.map(({ _id, text, value }) => {
                          const possibleSubSku = `${productData.product_sku}-${text}`;
                          const desginSubSkuData =
                            productInventoryBulkMutation.data &&
                            productInventoryBulkMutation.data.find(
                              (subsku) => subsku.product_sku === possibleSubSku
                            );
                          const allowOrder = desginSubSkuData?.allowOrder;
                          return (
                            <MenuItem
                              value={value}
                              key={_id}
                              disabled={allowOrder === false ? true : false}
                            >
                              {text}
                              {typeof allowOrder === "boolean" && (
                                <Box
                                  component={"span"}
                                  className="sold-out"
                                  sx={styles.soldOutMenuText}
                                  style={{
                                    color: allowOrder === false ? appColors.red : appColors.green,
                                  }}
                                >
                                  {allowOrder === false ? "Sold Out" : "Available"}
                                </Box>
                              )}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.errors.designValue && (
                        <FormHelperText>{formik.errors.designValue}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                )}
                {productData && productData.size.length > 0 && (
                  <Grid item xs={12} sm={8} md={12}>
                    <FormControl
                      fullWidth
                      error={formik.touched.sizeValue && Boolean(formik.errors.sizeValue)}
                    >
                      <Select
                        name="sizeValue"
                        displayEmpty
                        value={formik.values.sizeValue}
                        onChange={formik.handleChange}
                        MenuProps={{
                          PaperProps: {
                            sx: styles.sizeSelectOption,
                          },
                        }}
                      >
                        <MenuItem disabled value="">
                          <span>Select Size</span>
                        </MenuItem>
                        {productData.size.map(({ _id, value, text }) => {
                          const possibleSubSku = selectedColor
                            ? `${productData.product_sku}-${selectedColor.text}-${text}`
                            : selectedDesign
                            ? `${productData.product_sku}-${selectedDesign.text}-${text}`
                            : `${productData.product_sku}-${text}`;
                          const sizeSubSkuData =
                            productInventoryBulkMutation.data &&
                            productInventoryBulkMutation.data.find(
                              (subsku) => subsku.product_sku === possibleSubSku
                            );
                          const allowOrder = sizeSubSkuData?.allowOrder;
                          return (
                            <MenuItem
                              value={value}
                              key={_id}
                              disabled={allowOrder === false ? true : false}
                            >
                              {text}
                              {typeof allowOrder === "boolean" && (
                                <Box
                                  component={"span"}
                                  className="sold-out"
                                  sx={styles.soldOutMenuText}
                                  style={{
                                    color: allowOrder === false ? appColors.red : appColors.green,
                                  }}
                                >
                                  {allowOrder === false ? "Sold Out" : "Available"}
                                </Box>
                              )}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.sizeValue && (
                        <FormHelperText>{formik.errors.sizeValue}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12} sm={8} md={12}>
                  <TextField
                    name="qty"
                    variant="outlined"
                    type="number"
                    placeholder="Qty"
                    fullWidth
                    value={formik.values.qty}
                    onChange={formik.handleChange}
                    error={formik.touched.qty && Boolean(formik.errors.qty)}
                    helperText={formik.touched.qty && (formik.errors.qty as string)}
                  />
                </Grid>
                {!userInfoExist && (
                  <>
                    <Grid item xs={12} sm={8} md={12}>
                      <TextField
                        name="name"
                        type="text"
                        variant="outlined"
                        placeholder="Enter Name"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8} md={12}>
                      <TextField
                        name="phone"
                        className="phone-text-field"
                        placeholder="Contact Number"
                        variant="outlined"
                        type="number"
                        fullWidth
                        InputProps={{
                          startAdornment: <InputAdornment position="start">+974</InputAdornment>,
                        }}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8} md={12}>
                      <FormControl
                        fullWidth
                        error={formik.touched.city && Boolean(formik.errors.city)}
                      >
                        <Select
                          displayEmpty
                          name="city"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                        >
                          <MenuItem disabled value="">
                            <span>Select City</span>
                          </MenuItem>
                          {appConfig.product.cities.sort().map((city, index) => (
                            <MenuItem value={city} key={index}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.city && (
                          <FormHelperText>{formik.errors.city}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={12}>
                      <TextField
                        name="address"
                        variant="outlined"
                        type="text"
                        placeholder="Delivery Address"
                        fullWidth
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                      />
                    </Grid>
                  </>
                )}
                <Grid
                  item
                  container
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  sx={{ my: 1 }}
                >
                  <Grid>

                  </Grid>
                  <Grid item>
                    <YellowButton
                      type="submit"
                      startIcon={
                        isCartMutating() ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <AddShoppingCartOutlinedIcon />
                        )
                      }
                      disabled={isCartMutating()}
                      sx={styles.placeOrderButton}
                      disableElevation
                      variant="contained"
                    >
                      Quick Checkout
                    </YellowButton>
                  </Grid>
                  <Grid item>
                    <BlackButton
                      type="submit"
                      startIcon={
                        isCartMutating() ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <AddShoppingCartOutlinedIcon />
                        )
                      }
                      disabled={isCartMutating()}
                      disableElevation
                      variant="contained"
                      color="secondary"
                      sx={styles.addMoreBtn}
                    >
                      Add to cart
                    </BlackButton>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <Typography pt={1} variant="body2">
              <span>
                <strong style={{ color: "red" }}>Delivery Time:</strong> 1 Working day between 11 AM till 8 PM
              </span>
              <br />
              <span>
                <strong style={{ color: "red" }}>Delivery Charge:</strong> FREE above 150 {appConfig.product.currency}. 10 {appConfig.product.currency} below 150.
              </span>
              <br />
              <span>
                <strong style={{ color: "red" }}>Return & Replacement:</strong> In 24 Hours. No questions asked
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <DescriptionTabs
            productId={id}
            finePrint={productData?.fine_print}
            productDescription={productData?.product_description}
          />
          <ProductFeedback productId={id} />
          {productCategory && (
            <RelatedProducts
              categoryId={productCategory.value}
              categoryName={productCategory.text}
            />
          )}
        </Box>
        {productCategory && (
            <NotificationDrawer 
              open={notificationDrawerEl}
              categoryId={productCategory.value}
              categoryName={productCategory.text} 
              toggleDrawer={toggleNotificaitonDrawer} 
            />
        )}
        <ProductOutOfStockModal open={outOfStockModalOpen} onClose={handleOutOfStockModalClose} />
        <NegativeInventoryModal
          open={negativeInventoryModalOpen}
          handleConfirm={handleConfirmNegativeInventoryModal}
          handleClose={handleCloseNegativeInventoryModal}
        />
        <ConfirmOrderModal
          open={openOrderModal}
          handleAddMore={handleAddMore}
          handleConfirmOrder={handleConfirmOrder}
          newOrderMutation={newOrderMutation}
        />
      </Container>
    </>
  );
};
