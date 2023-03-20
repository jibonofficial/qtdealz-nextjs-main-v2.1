import { ThemeProvider } from "@emotion/react";
import { Box, LinearProgress, LinearProgressProps, Rating, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { ReviewsResponse } from "components/allTypes/reviewType";
import { appStyles } from "components/common/appColors";
import { BlackButton } from "components/common/styled/buttons";
import appConfig from "config";
import { useState } from "react";
import theme from "utils/theme";
import { AddReviewModal } from "../modals";
import * as styles from "../style";

export const ProductReviews = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();
  const reviews = queryClient.getQueryData<InfiniteData<ReviewsResponse> | undefined>([
    appConfig.queryKeys.productReviews,
    productId,
  ]);
  const [reviewModalOpen, setAddReviewModalOpen] = useState(false);
  const reviewSummary = reviews?.pages[0]?.rating_summery[0];

  const handleReviewModelOpen = () => setAddReviewModalOpen(true);
  const handleReviewModelClose = () => setAddReviewModalOpen(false);

  const ratings: { rating: number; progress: number }[] = [
    {
      rating: reviewSummary?.["review_100%"] || 0,
      progress: 100,
    },
    {
      rating: reviewSummary?.["review_75%"] || 0,
      progress: 75,
    },
    {
      rating: reviewSummary?.["review_50%"] || 0,
      progress: 50,
    },
    {
      rating: reviewSummary?.["review_20%"] || 0,
      progress: 20,
    },
    {
      rating: reviewSummary?.["review_10%"] || 0,
      progress: 10,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      {/* Overral Review */}
      <Box sx={styles.overralReviewsContainer}>
        <Grid2 container alignItems={"center"} spacing={{ xs: 3 }}>
          <Grid2 md={4} xs={12}>
            <Stack alignItems={"center"}>
              <Typography variant="h5" fontWeight={appStyles.w600}>
                Customer Reviews
              </Typography>
              <Typography variant="body1" component={"div"}>
                <Box
                  component={"span"}
                  sx={{ fontSize: "h3.fontSize", fontWeight: appStyles.w600 }}
                >
                  {reviewSummary?.average_rating || 0}
                </Box>
                &nbsp; out of 5
              </Typography>
              <Rating name="read-only" value={reviewSummary?.average_rating || 0} readOnly />
              <Typography fontWeight={appStyles.w500}>
                {reviewSummary?.total_reviews || 0}&nbsp;Reviews
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 container md={5} lg={4} xs={12} spacing={2} justifyContent="center">
            <Grid2 xs={12} sm={8} md={12}>
              {ratings.map((data, index) => (
                <Stack
                  key={index}
                  flexDirection={"row"}
                  columnGap={{ xs: 2, sm: 4 }}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Rating name="read-only" value={data.rating} readOnly />
                  <Box sx={{ width: "100%" }}>
                    <LinearProgressWithLabel
                      color="secondary"
                      value={data.progress}
                      sx={{ height: 7 }}
                    />
                  </Box>
                </Stack>
              ))}
            </Grid2>
          </Grid2>
          <Grid2 container md={3} lg={4} xs={12} alignItems="center" justifyContent={"center"}>
            <Grid2>
              <BlackButton
                variant="contained"
                sx={{ fontWeight: appStyles.w500, fontSize: 16, px: 3 }}
                onClick={handleReviewModelOpen}
              >
                Write a Review
              </BlackButton>
            </Grid2>
          </Grid2>
        </Grid2>
        <AddReviewModal open={reviewModalOpen} handleClose={handleReviewModelClose} />
      </Box>
    </ThemeProvider>
  );
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
