import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Products, ProductsData } from "../allTypes/productType";
import axios from "axios";
import ProductsByCat from "components/home/components/productsByCat";
import appConfig from "config";
import React, { useEffect } from "react";
import { allura } from "utils/theme";
import * as styles from "./style";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "components/common/hooks/useIntersectionObserver";


interface Props {
  categoryId: string;
  categoryName: string;
}

export const RelatedProducts = ({ categoryId, categoryName }: Props) => {
  const [currPage, setCurrPage] = React.useState(0);
  const targetElRef = React.useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (currPage !== 0) {
      fetchNextPage();
    } else {
      refetch();
    }
  }, [currPage]);

  const fetchProductsByCatId = async ({ pageParam = 0 }) => {
    return (
      await axios.post("/api/store/product/catalog/query/get", {
        models: {
          "location_data.website_remarks": `${appConfig.api.locationId}_Live`,
          "category.value": categoryId,
        },
        skip: pageParam,
        limit: 32,
      })
    ).data.data as ProductsData[];
  };

  const { data, error, fetchNextPage, status, hasNextPage, refetch } = useInfiniteQuery(
    [`catProductsa`],
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



  const flattenedProductsData = data?.pages.flat();

  useIntersectionObserver({
    target: targetElRef,
    onIntersect: handleLoadMoreProds,
    enabled: hasNextPage,
  });


 
  return (
    <Box sx={styles.relatedProducts}>
      <Typography variant="h2" className={allura.className} sx={styles.relatedProductsTitle}>
        How About These
      </Typography>
      <ProductsByCat
        productsData={flattenedProductsData}
        loading={false}
      />
       <Box ref={targetElRef} sx={{ py: 5 }} />
    </Box>
  );
};
