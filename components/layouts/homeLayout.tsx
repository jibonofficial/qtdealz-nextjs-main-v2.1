import { Box, CssBaseline } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { customerContactInfo } from "atoms/atoms";
import axios from "axios";
import { fetchCategories } from "backend/category";
import { CategoryType } from "components/allTypes/categoriesType";
import { AllCartProds } from "components/allTypes/dto/CartDTO";
import { LocationDetails } from "components/allTypes/productType";
import Footer from "components/common/footer";
import { getCustomerInfo } from "components/common/functions";
import Navbar from "components/common/navbar";
import { WhatsappFab } from "components/common/whatsappFab";
import appConfig, { isDevEnv } from "config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import * as styles from "./style";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const [customerContInfo, setCustomerContInfo] = useRecoilState(customerContactInfo);

  useEffect(() => {
    const customerStorageInfo = getCustomerInfo();
    if (customerStorageInfo?.name) setCustomerContInfo(customerStorageInfo);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const useLocationDetails = useQuery(["locationDetails"], async () => {
    const { data } = await axios.post("/api/store/location/get", {
      models: {
        _id: `${appConfig.api.locationId}`,
      },
    });
    return data as LocationDetails;
  });

  // need to get localStorage data as function, so that, it always gets the latest not initial when page load
  const getSessionId = () => localStorage.getItem("session_id");
  const useCartProducts = useQuery(
    ["cartProducts"],
    async () => {
      const sessionId = getSessionId();
      if (sessionId) {
        const { data } = await axios.post("/api/store/customer/cart/get", {
          models: {
            location_id: `${appConfig.api.locationId}`,
            session_id: sessionId,
          },
        });
        return data as AllCartProds;
      } else return null;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const useCategories = useQuery([appConfig.queryKeys.categories], async () => {
    const { data } = await fetchCategories();
    return data as CategoryType[];
  });

  return (
    <Box
      position="relative"
      sx={styles.homeLayout}
      // comment this code when needed
      className={isDevEnv ? "filter-all-media" : ""}
    >
      <CssBaseline />
      <Navbar />
      {children}
      {appConfig.featureFlags.whatsappFab && <WhatsappFab />}
      <Footer />
    </Box>
  );
}
