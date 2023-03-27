import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ProdsListSkeleton from "components/common/skeletons/prodsListSekeleton";
import { YellowButton } from "components/common/styled/buttons";
import appConfig from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { allura } from "utils/theme";
import { ProductsData } from "../../../allTypes/productType";
import { getLocationData } from "../../../hooks/useOrder";
import * as styles from "./style";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { appStyles } from "components/common/appColors";

interface Props {
  title?: string;
  productsData: ProductsData[] | undefined;
  loading: boolean;
}

export default function ProductsByCat({ title, productsData, loading }: Props) {
  const theme = useTheme();
  const [currIndex, setCurrIndex] = useState<number | null>(null);
  const router = useRouter();
  const isAbove600 = useMediaQuery(theme.breakpoints.up("sm"));
  const handleMouseOver = (index: number) => {
    if (isAbove600) {
      setCurrIndex(index);
    }
  };
  const handleMouseLeave = (index: number) => {
    setCurrIndex(null);
  };
  const handleSingleProdRoute = (id: string) => {
    router.push(`/product/${id}`);
    window.scroll(0, 0);
  };
  return (
    <div>
      {/* Why condition with title? To use another title with different styles in the parent element */}
      {title && (
        <Typography
          variant="h2"
          fontSize={{ sm: "3.75rem",xs: "2.2rem",  }}
          textAlign="center"
          className={allura.className}
          color={grey[800]}
          sx={styles.prodCatTitle}
        >
          {title}
        </Typography>
      )}
      <Grid container columnSpacing={2} rowSpacing={5} className="products-wrapper">
        {!loading && productsData ? (
          productsData.map((item, index) => {
            const locationData = getLocationData(item.location_data);
            return (
              <Grid
                item
                key={index}
                xs={6}
                md={4}
                lg={3}
                component="div"
                onMouseOver={() => {
                  handleMouseOver(index);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(index);
                }}
                className="product-card"
                sx={styles.prodCardStyles}
              >
                {currIndex === index && item.image_name.length ? (
                  <Link href={`/product/${item._id}`}>
                    <Paper
                      elevation={4}
                      className={`prod-box-${index}`}
                      sx={styles.hoveredProdPaper}
                    >
                      <Box>
                        <Swiper
                          modules={[Autoplay]}
                          slidesPerView={1}
                          autoplay={{
                            delay: 1000,
                          }}
                        >
                          {appConfig.product.displayYoutubeThumbnail && item.youtube_link && (
                            <SwiperSlide>
                              <img
                                src={`https://img.youtube.com/vi/${item.youtube_link}/sddefault.jpg`}
                                alt="video-thumb"
                                className="prod-box-img"
                              />
                            </SwiperSlide>
                          )}
                          {item.image_name.map(({ name, original_name }, index) => (
                            <SwiperSlide key={index}>
                              <Box sx={styles.hoveredProdBox}>
                                <img
                                  src={`${appConfig.api.imgUrl}/${name}`}
                                  alt={original_name}
                                  loading="lazy"
                                  className="prod-box-img"
                                />
                                <Box sx={styles.swiperImgTextNewIn}>
                                  <Typography
                                    variant="body2"
                                    color="green"
                                    fontWeight={appStyles.w600}
                                    fontSize="10px"
                                  >
                                    NEW IN
                                  </Typography>
                                </Box>
                              </Box>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </Box>
                      <Box sx={{ pb: 0.5 }}>
                        <YellowButton
                          variant="contained"
                          disableElevation
                          fullWidth
                          sx={styles.hoveredProdAddButton}
                          startIcon={<AddShoppingCartIcon />}
                        >
                          Add to Basket
                        </YellowButton>
                      </Box>
                    </Paper>
                  </Link>
                ) : (
                  <Link href={`/product/${item._id}`}>
                    <Paper elevation={4}>
                      <Box sx={{ position: "relative" }}>
                        {appConfig.product.displayYoutubeThumbnail && item.youtube_link ? (
                          <img
                            src={`https://img.youtube.com/vi/${item.youtube_link}/sddefault.jpg`}
                            alt="video-thumb"
                            className="prod-box-img main-prod-card-img"
                          />
                        ) : (
                          <img
                            src={`${appConfig.api.imgUrl}/${item.image_name[0].name}?w=680&fit=crop&auto=format`}
                            loading="lazy"
                            className="prod-box-img main-prod-card-img"
                          />
                        )}
                        <Box sx={styles.swiperImgTextNewIn}>
                          <Typography
                            variant="body2"
                            color="green"
                            fontWeight={appStyles.w600}
                            fontSize="10px"
                          >
                            NEW IN
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mx: { sm: 2, xs: 1 }, pb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            ...styles.prodPriceText,
                            color: locationData.discounted_price ? "red" : "#222222",
                          }}
                        >
                          {appConfig.product.currency}&nbsp;
                          <Box component="span" sx={styles.prodPriceNumber}>
                            {locationData.discounted_price > 0
                              ? locationData.discounted_price
                              : locationData.selling_price}
                          </Box>
                          {locationData.discounted_price > 0 && (
                            <>
                              <Box component="span" sx={styles.prodDiscountPrice}>
                                {appConfig.product.currency}&nbsp;
                                {locationData.selling_price}
                              </Box>
                            </>
                          )}
                          {(item.special_offer_text || locationData.discounted_price > 0) && (
                            <Box component="span" sx={styles.saleText}>
                              {item.special_offer_text ? "Bundle Offer" : "SALE"}
                            </Box>
                          )}
                        </Typography>
                        <Stack direction={"row"} justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" sx={styles.prodTitle} noWrap={false}>
                            {item.product_name}
                          </Typography>
                          <Box component="span" style={{backgroundColor: "#ffeb3b",color:'#222222'}} sx={styles.saleText}>
                            View
                          </Box>
                        </Stack>
                      </Box>
                    </Paper>
                  </Link>
                )}
              </Grid>
            );
          })
        ) : (
          <ProdsListSkeleton />
        )}
      </Grid>
    </div>
  );
}
