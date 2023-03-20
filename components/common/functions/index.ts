import appConfig from "config";

export const handleCategoryRoute = (history: any, id: string, title: string) => {
  history.push(`/category/${id}/${title}`);
};

export const saveCustomerInfoToStorage = (
  name: string,
  phone: string,
  city: string,
  address: string
) => {
  localStorage.setItem("customer_address", address);
  localStorage.setItem("customer_phone", phone);
  localStorage.setItem("customer_name", name);
  localStorage.setItem("customer_city", city);
};

export const getCustomerInfo = (): {
  name: string;
  phone: string;
  city: string;
  address: string;
} => {
  const emptyValues = {
    name: "",
    phone: "",
    city: "",
    address: "",
  };
  if (typeof window !== "undefined") {
    const address = localStorage.getItem("customer_address") || "";
    const phone = localStorage.getItem("customer_phone") || "";
    const name = localStorage.getItem("customer_name") || "";
    const city = localStorage.getItem("customer_city") || "";
    return appConfig.customer.rememberContactInfo ? { name, address, phone, city } : emptyValues;
  } else {
    return emptyValues;
  }
};

export const removeCustomerDetailsFromStorage = () => {
  localStorage.removeItem("customer_address");
  localStorage.removeItem("customer_phone");
  localStorage.removeItem("customer_name");
  localStorage.removeItem("customer_city");
};

export const removeSessionId = () => {
  localStorage.removeItem("session_id");
};
