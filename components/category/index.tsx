import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductsData } from "components/allTypes/productType";
import { appStyles } from "components/common/appColors";
import { useIntersectionObserver } from "components/common/hooks/useIntersectionObserver";
import ProductsByCat from "components/home/components/productsByCat";
import appConfig from "config";
import { findKey } from "lodash";
import React, { useEffect } from "react";
import * as styles from "./style";

interface Props {
  catId: string;
  title: string;
}

const prodSortingReqObj = {
  default: { modified_date: -1 },
  lowToHigh: {
    "location_data.discounted_price": 1,
    "location_data.selling_price": 1,
    _id: -1,
  },
  highToLow: {
    "location_data.discounted_price": -1,
    "location_data.selling_price": -1,
    _id: -1,
  },
  aToZ: { product_name: 1, _id: -1 },
  zToA: { product_name: -1, _id: -1 },
};

export const Category: React.FC<Props> = ({ catId, title }) => {
  const [currPage, setCurrPage] = React.useState(0);
  const [sortBy, setSortBy] = React.useState<string>(JSON.stringify(prodSortingReqObj.default));
  const targetElRef = React.useRef<HTMLButtonElement | null>(null);
  const selectedSortingKey = findKey(prodSortingReqObj, JSON.parse(sortBy));

  useEffect(() => {
    setCurrPage(0);
  }, [sortBy, catId]);

  useEffect(() => {
    if (currPage !== 0) {
      useProdsInfiniteQuery.fetchNextPage();
    } else {
      useProdsInfiniteQuery.refetch();
    }
  }, [currPage]);

  const fetchProductsByCatId = async ({ pageParam = 0 }) => {
    return (
      await axios.post("/api/store/product/catalog/query/get", {
        models: {
          "location_data.website_remarks": `${appConfig.api.locationId}_Live`,
          "category.value": `${catId}`,
        },
        skip: pageParam,
        limit: 32,
        sort: JSON.parse(sortBy),
      })
    ).data.data as ProductsData[];
  };

  const useProdsInfiniteQuery = useInfiniteQuery(
    [`catProducts-${catId}-${selectedSortingKey}`],
    fetchProductsByCatId,
    {
      getNextPageParam: (lastPage, allPages) => lastPage.length > 31 && currPage + 32,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
    }
  );

  const handleLoadMoreProds = () => {
    setCurrPage((prevState) => prevState + 32);
  };

  const handleSortingChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSortBy(value);
  };

  const flattenedProductsData = useProdsInfiniteQuery.data?.pages.flat();

  useIntersectionObserver({
    target: targetElRef,
    onIntersect: handleLoadMoreProds,
    enabled: useProdsInfiniteQuery.hasNextPage,
  });

  return (
    <Container>
      <Box sx={styles.categoryContainer}>
        <Typography
          variant="h4"
          textAlign="center"
          mb={2}
          color={grey[700]}
          fontWeight={appStyles.w500}
        >
          {title}
        </Typography>
        {appConfig.featureFlags.categorySorting && (
          <>
            <Divider />
            <Box my={3}>
              <Grid container justifyContent="end" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography color={grey[900]}>Sort By</Typography>
                </Grid>
                <Grid item>
                  <FormControl>
                    <Select
                      value={sortBy}
                      color="secondary"
                      size="small"
                      onChange={handleSortingChange}
                      sx={{
                        borderRadius: 0,
                      }}
                    >
                      <MenuItem value={JSON.stringify(prodSortingReqObj.default)}>Default</MenuItem>
                      <MenuItem value={JSON.stringify(prodSortingReqObj.lowToHigh)}>
                        Price (Low to High)
                      </MenuItem>
                      <MenuItem value={JSON.stringify(prodSortingReqObj.highToLow)}>
                        Price (High to Low)
                      </MenuItem>
                      <MenuItem value={JSON.stringify(prodSortingReqObj.aToZ)}>
                        Product Name (A to Z)
                      </MenuItem>
                      <MenuItem value={JSON.stringify(prodSortingReqObj.zToA)}>
                        Product Name (Z to A)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
        <Divider />
        <Box mt={{ xs: 4, sm: 8 }}>
          <ProductsByCat
            productsData={flattenedProductsData}
            loading={useProdsInfiniteQuery.isLoading}
          />
        </Box>
        <Box ref={targetElRef} sx={{ py: 5 }} />
      </Box>
    </Container>
  );
};
