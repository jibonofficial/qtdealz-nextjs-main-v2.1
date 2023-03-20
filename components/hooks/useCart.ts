import axios, { AxiosResponse } from 'axios';
import {
  AddProdToCartDTO,
  AddProdToCartResponse,
  RemoveProdFromCartDTO,
  SingleCartProduct,
  UpdateCartData,
  UpdateCartDTO,
} from 'components/allTypes/dto/CartDTO';
import {
  ProdAttrDataType,
  ProductInventoryType,
  ProductsData,
  SubSku,
} from 'components/allTypes/productType';
import appConfig from 'config';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import { getLocationData } from './useOrder';

interface AddToCartProps {
  color: ProdAttrDataType | null | undefined;
  size: ProdAttrDataType | null | undefined;
  design: ProdAttrDataType | null | undefined;
  productData: ProductsData;
  selectedSubSku: SubSku | null;
  qty: any;
  inventoryData: ProductInventoryType;
}

const getSessionId = () => {
  const storageSession = localStorage.getItem('session_id');
  if (storageSession) {
    return storageSession;
  } else {
    const newSessionId = uuid();
    localStorage.setItem('session_id', newSessionId);
    return newSessionId;
  }
};

export const addNewCart = async ({
  productData,
  selectedSubSku,
  color,
  size,
  design,
  qty,
  inventoryData,
}: AddToCartProps) => {
  const locationData = getLocationData(productData!.location_data);
  const body: AddProdToCartDTO = {
    models: {
      location_id: `${appConfig.api.locationId}`, // Do not change this
      product_id: selectedSubSku ? selectedSubSku._id : productData._id,
      parent_id: productData._id,
      product_name: productData.product_name,
      product_price: locationData.discounted_price
        ? locationData.discounted_price
        : locationData.selling_price,
      product_cost: productData!.buying_price,
      supplier_id: productData!.supplier_id,
      supplier_name: productData!.supplier_name,
      product_sku: selectedSubSku ? selectedSubSku.sku_number : productData.product_sku,
      parent_sku: productData.product_sku,
      product_attributes: productData.product_attributes,
      image_name: selectedSubSku ? selectedSubSku.image_url : productData.image_name[0].name,
      product_color: {
        // used spread to have an empty object if not available
        ...color,
      },
      product_size: {
        ...size,
      },
      product_design: {
        ...design,
      },
      available_quantity: inventoryData.product_quantity,
      cart_quantity: qty,
      session_id: getSessionId(),
    },
  };
  return axios.post<any, AxiosResponse<AddProdToCartResponse, any>, AddProdToCartDTO>(
    '/api/store/customer/cart/item/create',
    body
  );
};

export const updateCart = async ({ cartProduct }: { cartProduct: SingleCartProduct }) => {
  const body: UpdateCartDTO = {
    models: {
      location_id: cartProduct.location_id,
      product_id: cartProduct.product_id,
      parent_id: cartProduct.parent_id,
      product_name: cartProduct.product_name,
      product_price: cartProduct.product_price,
      product_cost: cartProduct.product_cost,
      image_name: cartProduct.image_name,
      available_quantity: cartProduct.available_quantity,
      cart_quantity: cartProduct.cart_quantity,
      parent_sku: cartProduct.parent_sku,
      product_sku: cartProduct.product_sku,
      session_id: cartProduct.session_id,
    },
  };

  return axios.post<any, AxiosResponse<UpdateCartData, any>, UpdateCartDTO>(
    '/api/store/customer/cart/item/update',
    body
  );
};

export const removeProdFromCart = async ({ cartProduct }: { cartProduct: SingleCartProduct }) => {
  const body: RemoveProdFromCartDTO = {
    models: {
      location_id: cartProduct.location_id,
      product_id: cartProduct.product_id,
      session_id: cartProduct.session_id,
    },
  };
  return axios.post('/api/store/customer/cart/item/delete', body);
};
