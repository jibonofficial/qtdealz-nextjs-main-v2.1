import axios, { AxiosResponse } from "axios";
import { ReviewsResponse } from "components/allTypes/reviewType";
import appConfig from "config";

/**
 *
 * @param page can't be lower than zero
 * @param productId
 * @returns reviews
 */
export const fetchProductReviews = async (page = 1, productId: string) => {
  const reviewsPerPage = 2;
  const skip = (page - 1) * reviewsPerPage;
  const limit = page * reviewsPerPage;
  const { data } = await axios.post<any, AxiosResponse<ReviewsResponse, any>, any>(
    "/api/store/product/review/get",
    {
      models: {
        location_id: appConfig.api.locationId,
        parent_id: productId,
      },
      skip,
      limit,
      sort: {
        modified_date: -1,
      },
    }
  );
  if (data.total > limit) {
    data.nextPage = page + 1;
  }
  data.previousPage = page;

  return data;
};
