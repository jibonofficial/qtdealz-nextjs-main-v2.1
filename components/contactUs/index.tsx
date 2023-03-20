import { Container, Typography } from "@mui/material";
import appConfig from "config";

export const ContactUs = () => {
  const headingProps: any = {
    variant: "h5",
    fontWeight: "bold",
    my: 4,
    component: "h2",
  };
  return (
    <Container sx={{ pb: 5 }}>
      <Typography variant="h3" component="h1" textAlign="center" fontWeight="bold" my={4}>
        Contact Us
      </Typography>
      <Typography variant="body1">
        <strong>For Delivery:</strong> Please click on the&nbsp;
        <a
          href={`${appConfig.contact.whatsapp}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          link
        </a>
        &nbsp; to get the status of your order
        <br />
        <br />
        <strong>For Refunds:</strong> Please click on the&nbsp;
        <a
          href={`${appConfig.contact.whatsapp}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          link
        </a>
        &nbsp;to get the status of your refund OR request a new refund
        <br />
        <br />
        <strong>For Replacement:</strong> Please click on the&nbsp;
        <a
          href={`${appConfig.contact.whatsapp}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          link
        </a>
        &nbsp;to get the status of your replacement OR request a new replacement For any other
        inquiries or suggestions
        <br />
        <br />
        please contact us at{" "}
        <a href={`mailto:${appConfig.contact.email}`}>{appConfig.contact.email}</a> Or call us
        between <strong>9 Am till 6 Pm Saturday to Thursday</strong> on +974 5030 3100
      </Typography>
    </Container>
  );
};
