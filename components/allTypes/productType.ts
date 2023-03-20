export interface Products {
  total: number;
  data: ProductsData[];
}

export interface ProductsData {
  product_type: ProductType[];
  allowNegativeInventory: boolean;
  product_sku: string;
  image_name: ImageName[];
  product_attributes: ProductAttribute[];
  supplier_name: string;
  product_description: string;
  fine_print: string;
  selector_date: Date;
  selector_id: string;
  selector_name: string;
  product_rating: number;
  available_stock: number;
  quantity_sold: number;
  buying_price: number;
  wholesale_margin: number;
  retail_margin: number;
  delivery_time: number;
  supplier_comment: null;
  uploader_comment: null;
  uploader_date: Date;
  uploader_id: string;
  uploader_name: string;
  wholesale_buying_price: number;
  total_reviews: number;
  average_rating: number;
  wholesale_selling_price: number;
  modified_date: Date;
  modified_by: null;
  uploadCount: number;
  _id: string;
  retail_selling_price: number;
  discounted_retail_selling_price: number;
  product_name: string;
  sub_sku: SubSku[];
  supplier_link: string;
  supplier_link_2: string;
  youtube_link: string;
  special_offer_text: string;
  product_configuration: string;
  category: Category[];
  size: ProdAttrDataType[];
  color: ProdAttrDataType[];
  design: ProdAttrDataType[];
  supplier_id: string;
  facebook_status: Status[];
  website_status: Status[];
  __v: number;
  location_data: LocationDatum[];
}

export interface Category {
  _id: string;
  value: string;
  text: string;
}
export interface ProdAttrDataType {
  _id: string;
  value: string;
  text: string;
}

export interface Status {
  text: Text;
  status: StatusEnum;
  remarks: string;
  _id: string;
  value: string;
}

export enum StatusEnum {
  Live = "Live",
  Pending = "Pending",
}

export enum Text {
  Dubai = "DUBAI",
  Qatar = "Qatar",
}

export interface ImageName {
  name: string;
  original_name: string;
  size: number;
  type: string;
}

export interface LocationDatum {
  text: Text;
  selling_price: number;
  discounted_price: number;
  facebook_status: StatusEnum;
  facebook_remarks: string;
  website_status: StatusEnum;
  website_remarks: string;
  _id: string;
  value: string;
}

export type ProductAttribute = "color" | "design" | "size";

export enum ProductType {
  FacebookProduct = "Facebook Product",
  WebsiteProduct = "Website Product",
}

export interface SubSku {
  sku_number: string;
  color_name: string | null;
  design_name: string | null;
  size_name: string | null;
  image_url: string;
  isActive: boolean;
  _id: string;
}

export interface StockoutProductSubSku extends SubSku {
  product_id: string;
}

export interface LocationDetails {
  delivery_charge: number;
  location_contact: string;
  location_address: string;
  location_certification: null;
  location_logo: string;
  location_message: string;
}

export interface ProductInventoryType {
  product_sku: string;
  parent_sku: string;
  _id: string;
  product_id: string;
  parent_id: string;
  product_name: string;
  product_quantity: number;
  allowOrder: boolean;
  delivery_time: string;
  delivery_message?: string;
}

export interface ProductInventoryBulkData {
  parent_id: string;
  product_id: string;
  parent_sku: string;
  product_sku: string;
  delivery_time: string;
  allowOrder: boolean;
}
