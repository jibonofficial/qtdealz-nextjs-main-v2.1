import qtdealz from "./qtdealz";

export const isDevEnv = process.env.NODE_ENV === "development" ? true : false;
export interface HeadTagsType {
  title: string;
  description: string;
  keywords: string;
  url: string;
  imgURL: string;
}
export interface ConfigsType {
  name: string;
  api: {
    baseUrl: string;
    imgUrl: string;
    reviewImgUrl: string;
    locationId: string;
    location_name: string;
    favIconFileName: string;
  };
  contact: {
    whatsapp: string;
    email: string;
    address: string;
    phone: string;
  };
  product: {
    currency: string;
    cities: string[];
    whatsappShare: string;
    invoiceLink: string;
    vat: boolean;
    displayYoutubeThumbnail: boolean;
  };
  featureFlags: {
    whatsappFab: boolean;
    categorySorting: boolean;
  };
  customer: {
    rememberContactInfo: boolean;
    rmContInfoAfterOrder: boolean;
  };
  queryKeys: {
    categories: string;
    productReviews: string;
  };
  apiRoutes: {
    productInventoryBulkRoute: string;
  };
  head: {
    home: HeadTagsType;
    newArrivalCat: HeadTagsType;
    clearanceCat: HeadTagsType;
  };
  siteInfo: {
    certificateURL: string;
  };
}
const configEnv = process.env.NEXT_PUBLIC_CONFIG;
let appConfig: ConfigsType;
switch (configEnv) {
  case "qtdealz":
    appConfig = qtdealz;
    break;

  default:
    appConfig = qtdealz;
    break;
}
export default appConfig;
