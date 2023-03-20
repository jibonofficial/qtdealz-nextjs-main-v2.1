import axios, { AxiosResponse } from 'axios';
import { AllCartProds } from 'components/allTypes/dto/CartDTO';
import { getCustomerInfo } from 'components/common/functions';
import appConfig from 'config';
import { filter, find, sumBy } from 'lodash';
import { CartProduct } from '../allTypes/atomType';
import { NewOrderReq, NewOrderResponse } from '../allTypes/dto/newOrder.dto';
import { LocationDatum, ProdAttrDataType, SubSku } from '../allTypes/productType';

export const getProdDiscountPercentage = (oldPrice: number, newPrice: number) => {
  const discount = (oldPrice - newPrice) / oldPrice;
  return Math.round(discount * 100);
};

export const getProdAttrDataByValue = (arr: ProdAttrDataType[], value: string) => {
  return find(arr, { value });
};

export const getSellingPriceWithQty = (location: LocationDatum[], qty: number): number => {
  const locationData = filter(location, {
    website_remarks: `${appConfig.api.locationId}_Live`,
  })[0];
  const realPrice = locationData.discounted_price
    ? locationData.discounted_price
    : locationData.selling_price;
  return realPrice * qty;
};

export const getTotalSellingPrice = (cartProducts: CartProduct[]): number => {
  return sumBy(cartProducts, (item) =>
    getSellingPriceWithQty(item.productData!.location_data, item.qty)
  );
};

export const getTotalCostPrice = (cartProducts: AllCartProds): number => {
  return sumBy(cartProducts.data, (item) => item.product_cost * item.cart_quantity);
};

export const getTotalQuantity = (cartProducts: CartProduct[]): number => {
  return sumBy(cartProducts, (item) => item.qty);
};

export const getLocationData = (locationData: LocationDatum[]) => {
  return filter(locationData, {
    website_remarks: `${appConfig.api.locationId}_Live`,
  })[0];
};

export const postNewOrder = async ({
  cartProducts,
  selectedSubSku,
}: {
  cartProducts: AllCartProds;
  selectedSubSku: SubSku | null;
}) => {
  const customerInfo = getCustomerInfo();
  const body: NewOrderReq = {
    models: {
      order_quantity: cartProducts.cart_quantity,
      order_price: cartProducts.cod_details.cart_amount,
      order_cost: cartProducts.cod_details.cart_cost,
      location_id: `${appConfig.api.locationId}`,
      location_name: 'DUBAI',
      delivery_charge: cartProducts.cod_details.delivery_charge,
      customer_details: {
        customer_name: customerInfo.name,
        contact_number: customerInfo.phone,
        customer_address: customerInfo.address,
        customer_city: customerInfo.city,
      },
      order_data: cartProducts.data.map((item) => {
        return {
          product_name: item.product_name,
          product_id: item.product_id,
          parent_id: item.parent_id,
          product_sku: item.product_sku,
          parent_sku: item.parent_sku,
          image_name: item.image_name,
          order_quantity: item.cart_quantity,
          available_quantity: item.available_quantity,
          product_price: item.product_price,
          product_cost: item.product_cost,
          supplier_id: item.supplier_id,
          supplier_name: item.supplier_name,
          color_id: item.product_color?.value,
          color_name: item.product_color?.text,
          size_id: item.product_size?.value,
          size_name: item.product_size?.text,
          design_id: item.product_design?.value,
          design_name: item.product_design?.text,
          location_id: `${appConfig.api.locationId}`, // Do not change this
          location_name: 'DUBAI', // Do not change this
          entry_type: 'Order', // Do not change this
          session_id: item.session_id,
        };
      }),
    },
  };
  return await axios
    .post('/api/store/order/guests/create', body)
    .then((response) => {
      return response as AxiosResponse<NewOrderResponse, any>;
    })
    .catch((err) => err);
};
