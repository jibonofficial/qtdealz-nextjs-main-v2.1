import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { handleCategoryRoute } from "components/common/functions";
import appConfig from "config";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Products } from "../allTypes/productType";
import ProductsByCat from "./components/productsByCat";
import * as styles from "./style";
import { useRouter } from "next/router";
import { BlackButton } from "components/common/styled/buttons";

export default function Home() {
  const router = useRouter();
  const useNewArrivalProducts = useQuery(["newArrivalProds"], async () => {
    const { data } = await axios.post("/api/store/product/catalog/query/get", {
      models: {
        "location_data.website_remarks": `${appConfig.api.locationId}_Live`,
        "category.value": {
          $in: ["62c04ce85be3ce27204aaadb", "61194a6d52ad228a0f303153"],
        },
      },
      skip: 0,
      limit: 32,
      sort: { modified_date: -1 },
    });
    return data as Products;
  });

  const useClearanceSaleProducts = useQuery(["clearanceSaleProds"], async () => {
    const { data } = await axios.post("/api/store/product/catalog/query/get", {
      models: {
        "location_data.website_remarks": `${appConfig.api.locationId}_Live`,
        "category.value": "610173363351d210026762a9",
      },
      skip: 0,
      limit: 32,
      sort: { modified_date: -1 },
    });
    return data as Products;
  });

  return (
    <div className="home-comp">
      <Box sx={styles.homeCompWrapper}>
        <Swiper height={325} className="banner-swiper">
          <SwiperSlide>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 2200 549"
              className="banner-img"
            >
              <image
                width="2200"
                height="549"
                xlinkHref={`/images/qtdealz-home-banner.jpg`}
              ></image>
              <a
                href={appConfig.siteInfo.certificateURL}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <rect x="127" y="397" fill="#fff" opacity="0" width="309" height="93"></rect>
              </a>
            </svg>
          </SwiperSlide>
        </Swiper>
      </Box>
      <div className="home-content">
        <ProductsByCat
          title="New Arrival"
          productsData={useNewArrivalProducts.data?.data}
          loading={useNewArrivalProducts.isLoading}
        />
        <Grid container justifyContent="center" sx={styles.viewMoreBtnWrapper}>
          <BlackButton
            variant="contained"
            className="view-more-prods"
            disableElevation={true}
            sx={styles.viewMoreProdButton}
            size="large"
            onClick={() => handleCategoryRoute(router, "61194a6d52ad228a0f303153", "New Arrival")}
          >
            View More&nbsp;{`New Arrival`}
          </BlackButton>
        </Grid>
        <ProductsByCat
          title="Clearance Sale"
          productsData={useClearanceSaleProducts.data?.data}
          loading={useClearanceSaleProducts.isLoading}
        />
        <Grid container justifyContent="center" sx={styles.viewMoreBtnWrapper}>
          <BlackButton
            variant="contained"
            className="view-more-prods"
            disableElevation={true}
            sx={styles.viewMoreProdButton}
            size="large"
            onClick={() =>
              handleCategoryRoute(router, "610173363351d210026762a9", "Clearance Sale")
            }
          >
            View More&nbsp;{`Clearance Sale`}
          </BlackButton>
        </Grid>
      </div>
    </div>
  );
}
