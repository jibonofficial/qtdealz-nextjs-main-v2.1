import axios from "axios";
import appConfig from "config";

export const fetchCategories = async () => {
  return await axios.get("/api/store/product/catagory/graph/"+appConfig.api.locationId);
};
