import { Box, Container, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { ProductsData } from "components/allTypes/productType";
import { useIntersectionObserver } from "components/common/hooks/useIntersectionObserver";
import ProductsByCat from "components/home/components/productsByCat";
import appConfig from "config";
import { findKey } from "lodash";
import React, { useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import * as styles from "./style";

interface Props {
  searchValue: string;
}

// keeping the sorting feature in case if we may have to implement in here too
const prodSortingReqObj = {
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

export const SearchResults: React.FC<Props> = ({ searchValue }) => {
  const queryClient = useQueryClient();
  const [currPage, setCurrPage] = React.useState(0);
  const [sortBy, setSortBy] = React.useState<string>(
    JSON.stringify(prodSortingReqObj.lowToHigh)
  );
  const targetElRef = React.useRef<HTMLButtonElement | null>(null);
  const selectedSortingKey = findKey(prodSortingReqObj, JSON.parse(sortBy));

  useEffect(() => {
    setCurrPage(0);
  }, [searchValue]);

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
          "location_data.value": `${appConfig.api.locationId}`,
          "location_data.website_status": "Live",
          $or: [
            {
              product_name: {
                $regex: `${searchValue}`, // enter searched text here
                $options: "i",
              },
            },
            {
              product_sku: {
                $regex: `${searchValue}`, // enter searched text here
                $options: "i",
              },
            },
          ],
        },
        skip: pageParam,
        limit: 32,
        sort: JSON.parse(sortBy),
      })
    ).data.data as ProductsData[];
  };

  const useProdsInfiniteQuery = useInfiniteQuery(
    [`searchResults-${searchValue}-${selectedSortingKey}`],
    fetchProductsByCatId,
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length > 31 && currPage + 32,
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

  const searchResultsTitle = useProdsInfiniteQuery.isLoading
    ? "Searching..."
    : flattenedProductsData && flattenedProductsData.length > 0
    ? `Search Result: ${searchValue}`
    : `No results for "${searchValue}"`;

  return (
    <Container>
      <Box sx={styles.categoryContainer}>
        <Box>
          <ProductsByCat
            title={searchResultsTitle}
            productsData={flattenedProductsData}
            loading={useProdsInfiniteQuery.isLoading}
          />
        </Box>
        <Box ref={targetElRef} sx={{ py: 5 }} />
      </Box>
    </Container>
  );
};
