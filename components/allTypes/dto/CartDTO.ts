import { ProdAttrDataType } from '../productType';

export interface AddProdToCartDTO {
  models: Models;
}

export interface Models {
  location_id: string;
  product_id: string | undefined;
  parent_id: string;
  product_name: string;
  product_sku: string | undefined;
  parent_sku: string;
  image_name: string | undefined;
  product_color: Partial<ProdAttrDataType>;
  product_size: Partial<ProdAttrDataType>;
  product_design: Partial<ProdAttrDataType>;
  product_attributes: string[];
  available_quantity: number;
  cart_quantity: number;
  supplier_id: string;
  supplier_name: string;
  product_price: number;
  product_cost: number;
  session_id: string;
}

export interface AddProdToCartResponse {
  location_id: string;
  product_id: string;
  parent_id: string;
  product_name: string;
  product_sku: string | undefined;
  parent_sku: string;
  image_name: string;
  product_color: Partial<ProdAttrDataType>;
  product_size: Partial<ProdAttrDataType>;
  product_design: Partial<ProdAttrDataType>;
  product_attributes: string[];
  available_quantity: number;
  cart_quantity: number;
  supplier_id: string;
  supplier_name: string;
  product_price: number;
  product_cost: number;
  session_id: string;
  regular_price: number;
  discounted_price: number;
}

export interface SingleCartProduct extends AddProdToCartResponse {
  _id: string;
  delivery_message: string;
}

export interface AllCartProds {
  total: number;
  cart_quantity: number;
  data: SingleCartProduct[];
  _id: string;
  location_id: string;
  vat_rate: number;
  cod_details: AllCartDetails;
  delivery_message: string;
}

export interface AllCartDetails {
  cart_cost: number;
  cart_amount: number;
  delivery_charge: number;
  vat_amount: number;
  total_amount: number;
}

export interface UpdateCartData {
  location_id: string;
  product_id: string;
  parent_id: string;
  product_name: string;
  product_sku: string | undefined;
  parent_sku: string;
  image_name: string;
  available_quantity: number;
  cart_quantity: number;
  product_price: number;
  product_cost: number;
  session_id: string;
}

export interface UpdateCartDTO {
  models: UpdateCartData;
}

export interface RemoveProdFromCartDTO {
  models: {
    location_id: string;
    product_id: string;
    session_id: string;
  };
}
