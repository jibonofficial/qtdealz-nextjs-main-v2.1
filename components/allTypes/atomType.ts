import { ProdAttrDataType, ProductInventoryType, ProductsData, SubSku } from './productType';

export interface CustomerContactInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface CartProduct {
  uuid: string;
  color?: ProdAttrDataType | null;
  size?: ProdAttrDataType | null;
  design?: ProdAttrDataType | null;
  qty: number | any;
  productData: ProductsData | undefined;
  productInventory: ProductInventoryType;
  selectedSubSku: SubSku;
}
