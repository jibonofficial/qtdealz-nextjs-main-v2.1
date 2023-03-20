export interface NewOrderReq {
  models: Models;
}

export interface Models {
  order_quantity: number;
  order_price: number;
  order_cost: number;
  location_id: string;
  location_name: string;
  delivery_charge: number;
  customer_details: CustomerDetails;
  order_data: OrderDatum[];
}

export interface CustomerDetails {
  customer_name: string;
  customer_address: string;
  customer_city: string;
  contact_number: string;
}

export interface OrderDatum {
  product_name: string;
  product_id: string;
  parent_id: string;
  product_sku?: string | null;
  parent_sku: string;
  image_name: string;
  order_quantity: number;
  available_quantity: number;
  product_price: number;
  product_cost: number;
  supplier_id: string;
  supplier_name: string;
  size_id?: string | null;
  size_name?: string | null;
  color_id?: string | null;
  color_name?: string | null;
  design_id?: string | null;
  design_name?: string | null;
  location_id: string;
  location_name: string;
  entry_type: string;
  session_id: string;
}

// new order response type
export interface NewOrderResponse {
  location_details: LocationDetails;
  order_number: string;
  order_quantity: number;
  order_price: number;
  vat_amount: number;
  order_cost: number;
  delivery_charge: number;
  image_url: string;
  item_references: any[];
  order_status: string;
  order_source: string;
  _id: string;
  location_id: string;
  location_name: string;
  customer_details: CustomerDetails;
  delivery_date: Date;
  delivery_message: string;
  invoice_number: string;
  order_type: string;
  posted_by: string;
  posted_user: string;
  posted_date: Date;
  status_date: Date;
  __v: number;
  order_content: string;
  total_amount: number;
  id: string;
}

export interface CustomerDetails {
  customer_name: string;
  contact_number: string;
  customer_address: string;
  customer_city: string;
  customer_city_id?: string;
}

export interface LocationDetails {
  location_logo: string;
  location_domain: string;
  location_address: string;
  location_contact: string;
  location_message: string;
  location_certification: string;
}
