import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Products } from "components/allTypes/productType";
import ProductsByCat from "components/home/components/productsByCat";
import appConfig from "config";
import { allura } from "utils/theme";
import * as styles from "./style";

interface Props {
  categoryId: string;
  categoryName: string;
}

export const RelatedProducts = ({ categoryId, categoryName }: Props) => {
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
  return (
    <Box sx={styles.relatedProducts}>
      <Typography variant="h2" className={allura.className} sx={styles.relatedProductsTitle}>
        How About These
      </Typography>
      <ProductsByCat
        productsData={useRelatedProducts.data?.data}
        loading={useRelatedProducts.isLoading}
      />
    </Box>
  );
};
