import axios from "axios";
import appConfig from "config";

export const fetchCategories = async () => {
  return await axios.post("/api/store/product/catagory/query/get", {
    models: {
      location_id: appConfig.api.locationId,
    },
  });
};
