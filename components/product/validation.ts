import * as yup from "yup";
import { ProductsData } from "../allTypes/productType";

export const validationSchema = (
  productsData: ProductsData | undefined,
  contactInfoExist: boolean
) =>
  yup.object().shape({
    colorValue: productsData?.color.length
      ? yup.string().min(1).required("Color is required")
      : yup.string(),
    sizeValue: productsData?.size.length
      ? yup.string().min(1).required("Size is required")
      : yup.string(),
    designValue: productsData?.design.length
      ? yup.string().min(1).required("Design is required")
      : yup.string(),
    qty: yup.number().min(1).required("Quantity is required"),
    city: contactInfoExist
      ? yup.string()
      : yup.string().min(2).required("City is required"),
    name: contactInfoExist
      ? yup.string()
      : yup.string().min(2, "Enter a valid Name").required("Name is required"),
    phone: contactInfoExist
      ? yup.string()
      : yup
          .string()
          .min(7, "Enter a valid Number")
          .required("Number is required"),
    address: contactInfoExist
      ? yup.string()
      : yup.string().min(1).required("Address is required"),
  });
