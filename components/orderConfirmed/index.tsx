import { Box, Container, Link as MuiLink, Stack, Typography, Grid } from "@mui/material";
import axios from "axios";
import { SingleOrderResponse } from "components/allTypes/dto/order.dto";
import appConfig from "config";
import { useQuery } from "@tanstack/react-query";
import * as styles from "./style";
import { appStyles } from "components/common/appColors";
import { YellowButton } from "components/common/styled/buttons";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function OrderConfirmed({ id }: { id: string }) {
  const { data } = useQuery(
    ["order", id],
    async () => {
      if (id) {
        const { data } = await axios.get(`/api/store/order/query/get?order_number=${id}`);
        return data as SingleOrderResponse;
      } else return null;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const orderData = data?.data;

  return (
    <Container>
      {orderData && (
        <Box mb={10} mt={2}>
          <Typography variant="h5" fontFamily="inherit" textAlign="center" fontWeight="700" mb={3}>
            Thank You for your order. Please find below the details of your order.
          </Typography>
          <Box sx={styles.orderDetails}>
            {/* <img src={emailSentIcon} width={50} alt="Email Sent Icon" /> */}
            <Typography variant="h5" textAlign={"center"} fontWeight={appStyles.w600}>
              Your order # is: {id}
            </Typography>
            <Typography variant="body1" component="div" fontWeight={appStyles.w500}>
              <Grid
                container
                spacing={{ xs: 1, sm: 3 }}
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{ xs: "column", sm: "row" }}
                sx={{ pb: { xs: 5, sm: 0 } }}
              >
                <Grid>
                  <Box component="ul" sx={styles.priceContainer}>
                    <li>
                      <strong>Product Total:</strong>&nbsp;{orderData.order_price}{" "}
                      <span>{appConfig.product.currency}</span>
                    </li>
                    <li>
                      <strong>Shipping:</strong> {orderData.delivery_charge}{" "}
                      <span>{appConfig.product.currency}</span>
                    </li>
                    {/* {appConfig.product.vat && (
                      <li>
                        <strong>Vat:</strong> {orderData.vat_amount}{" "}
                        <span>{appConfig.product.currency}</span>
                      </li>
                    )} */}
                    <li>
                      <strong>GRAND TOTAL:</strong> {orderData.total_amount}{" "}
                      <span>{appConfig.product.currency}</span>
                    </li>
                  </Box>
                </Grid>
                <Grid>
                  <Box>
                    <Grid container spacing={2} flexDirection={"column"} alignItems="center">
                      <Grid>
                        <img
                          loading="lazy"
                          height={200}
                          src="/images/invoice_demo.jpg"
                          alt="invoice demo"
                        />
                      </Grid>
                      <Grid>
                        <YellowButton
                          variant="contained"
                          onClick={() => {
                            window.open(`${appConfig.product.invoiceLink}${id}`, "_blank");
                          }}
                          sx={styles.invoiceLink}
                          size="small"
                        >
                          Download Invoice
                        </YellowButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Typography
                variant="h6"
                textAlign={{ xs: "center", sm: "start" }}
                fontFamily="inherit"
                fontWeight={appStyles.w600}
              >
                What happens next?
              </Typography>
              <ul>
                <li>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: orderData.delivery_message,
                    }}
                  />
                </li>
                <li>
                  Our delivery team will contact you on your mobile number. Please pick calls from
                  mobile number
                </li>
                <li>You will pay the amount as COD (Cash on delivery)</li>
                <li>
                  For any question or queries please contact us at{" "}
                  <strong>00974&nbsp;50303100</strong>.
                </li>
                <li>
                  Share these amazing products with your family and friend in Qatar by WhatsApp.{" "}
                  <MuiLink
                    href={appConfig.product.whatsappShare}
                    sx={styles.whatsappLink}
                    target="_blank"
                  >
                    Click Here
                  </MuiLink>
                </li>
              </ul>
            </Typography>
            <Typography variant="body2" fontWeight={appStyles.w600} textAlign="center" my={4}>
              {appConfig.name} Support Team
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
}
