export interface SingleOrderResponse {
  success: boolean;
  message: string;
  data: OrderResponseData;
}

export interface OrderResponseData {
  location_details: OrderLocationDetails;
  customer_details: OrderCustomerDetails;
  order_number: string;
  order_quantity: number;
  order_price: number;
  vat_amount: number;
  order_cost: number;
  delivery_charge: number;
  image_url: string;
  inventory_status: string;
  item_references: string[];
  order_status: string;
  order_source: string;
  _id: string;
  location_id: string;
  location_name: string;
  posted_by: string;
  posted_user: string;
  posted_date: Date;
  status_date: Date;
  delivery_message: string;
  delivery_date: Date;
  invoice_number: string;
  order_type: string;
  __v: number;
  order_content: string;
  total_amount: number;
  id: string;
}

export interface OrderCustomerDetails {
  customer_name: string;
  contact_number: number;
  customer_address: string;
  customer_city: string;
  customer_city_id: string;
}

export interface OrderLocationDetails {
  location_logo: string;
  location_domain: string;
  location_address: string;
  location_contact: string;
  location_message: string;
  location_certification: string;
}
