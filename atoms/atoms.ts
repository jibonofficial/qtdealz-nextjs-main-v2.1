import { StockoutProductSubSku, SubSku } from "components/allTypes/productType";
import { atom } from "recoil";
import { CartProduct, CustomerContactInfo } from "../components/allTypes/atomType";

// ⚠️ don't use undefined in atom type, will face errors. use null type only.

export const customerContactInfo = atom<CustomerContactInfo | null>({
  key: "customerContactInfo",
  default: null,
});

export const cartProductsState = atom<CartProduct[] | null>({
  key: "cartProducts",
  default: null,
});

export const cartDrawerElAtom = atom<boolean>({
  key: "cartDrawerEl",
  default: false,
});

export const notificationDrawerElAtom = atom<boolean>({
  key: "notificationDrawerEl",
  default: false,
});

export const selectedSubSKUAtom = atom<SubSku | null>({
  key: "sub-sku",
  default: null,
});

export const topBannerAtom = atom<boolean>({
  key: "display-top-banner",
  default: true,
});

export const currentProductIdAtom = atom<string | null>({
  key: "current-product-id",
  default: null,
});
