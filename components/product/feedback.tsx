import { CircularProgress, Paper, Rating, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductReviews } from "backend/reviews";
import { appStyles } from "components/common/appColors";
import { BlackButton } from "components/common/styled/buttons";
import Image from "next/image";
import { Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";
import appConfig from "config";
import React, { useState } from "react";
import { Controller, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import * as styles from "./style";

export const ProductFeedback = ({ productId }: { productId: string }) => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    [appConfig.queryKeys.productReviews, productId],
    async ({ pageParam = 1 }) => fetchProductReviews(pageParam, productId),
    {
      getPreviousPageParam: (firstPage) => firstPage.previousPage ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );
  const [open, setOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = useState<any>(null);

  const handleOpen = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, name: Object) => {
    setSelectedImg(name);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedImg(null);
    setOpen(false);
  };

  return (
    <Box sx={styles.customerFeedbackContainer}>
      {data?.pages[0] && data.pages[0].total > 0 && (
        <>
          <Grid2 container spacing={2} justifyContent="space-between" alignItems={"center"}>
            <Grid2>
              <Typography variant="h5" fontWeight={appStyles.w600}>
                Our Customer Feedback
              </Typography>
              <Typography variant="body2">
                Don’t take our word for it. Trust our customers
              </Typography>
            </Grid2>
            {/* we may need this design again */}
            {/* <Grid2
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <Button
              disabled
              variant="outlined"
              size="small"
              startIcon={<ChevronLeftIcon />}
              sx={{ pr: 1.5 }}
            >
              Previous
            </Button>
            <Button variant="outlined" size="small" endIcon={<ChevronRightIcon />} sx={{ pl: 1.5 }}>
              Next
            </Button>
          </Stack>
        </Grid2> */}
          </Grid2>
          <Grid2 container spacing={4} flexDirection="column" sx={styles.productCommentsWrapper}>
            {data?.pages.map((pageData, index) => (
              <Fragment key={index}>
                {pageData.data.map((review, i) => (
                  <Grid2 key={i}>
                    <Paper variant="outlined" sx={styles.productComment}>
                      <Stack spacing={2}>
                        <Typography variant="h6" fontWeight={appStyles.w600}>
                          {review.posted_user}
                        </Typography>
                        <Rating name="read-only" value={review.product_rating} readOnly />
                        <Typography variant="body2">{review.product_review}</Typography>
                        <Box>
                          <Stack direction={"row"} alignItems="center" spacing={2}>
                            {review.review_images.map((img, j) => (
                              <Image
                                key={j}
                                src={`${appConfig.api.reviewImgUrl}/${img.name}`}
                                alt="product review captures"
                                width={74}
                                height={74}
                                onClick={(event) => handleOpen(event, review.review_images)}
                              />
                            ))}
                            {/* {review.review_images && (
                              <Slider images={sliderImages} youtubeLink={productData?.youtube_link} />
                            )} */}
                          </Stack>
                        </Box>
                      </Stack>
                    </Paper>
                    <Modal open={open} onClose={handleClose}>
                      <Box sx={styles.imageModalStyle}>
                        <IconButton sx={styles.imageModalCloseButton} onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                        <div className="modal-slider-container">
                          <Swiper
                            modules={[Navigation, Thumbs, Controller]}
                            initialSlide={0}
                            navigation={
                              review.review_images && review.review_images.length > 1 ? true : false
                            }
                            slidesPerView={1}
                            className="swiper-view"
                          >
                            {selectedImg &&
                              selectedImg.map((img: any, index: any) => (
                                <SwiperSlide aria-valuetext={img.name} key={index}>
                                  <img
                                    src={`${appConfig.api.reviewImgUrl}/${img.name}`}
                                    alt={`product-${img.name}`}
                                    loading="lazy"
                                  />
                                </SwiperSlide>
                              ))}
                          </Swiper>
                        </div>
                      </Box>
                    </Modal>
                  </Grid2>
                ))}
              </Fragment>
            ))}
            <Grid2 alignSelf={"center"} sx={{}}>
              <BlackButton
                variant="contained"
                disabled={!hasNextPage || isFetchingNextPage}
                startIcon={isFetchingNextPage && <CircularProgress color="inherit" size={18} />}
                onClick={() => fetchNextPage()}
              >
                See more
              </BlackButton>
            </Grid2>
          </Grid2>
        </>
      )}
    </Box>
  );
};
