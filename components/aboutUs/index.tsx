import { Container, Typography } from "@mui/material";

export const AboutUs = () => {
  const headingProps: any = {
    variant: "h5",
    fontWeight: "bold",
    my: 4,
    component: "h2",
  };
  return (
    <Container sx={{ pb: 5 }}>
      <Typography {...headingProps}>WHO ARE WE?</Typography>
      <Typography variant="body1">
        <strong>QTDEALZ</strong> is an online shopping platform in <strong>QATAR</strong>. Started
        in 2019, within a short period of time we have severed more than 1 Million customers.
      </Typography>
      <Typography {...headingProps}>
        ONLINE SHOPPING MADE EASY BY <strong>QTDEALZ</strong>
      </Typography>
      <Typography variant="body1">
        If you would like to experience the best online shopping for women and kids in{" "}
        <strong>QATAR</strong>, you are at the right place. <strong>QTDEALZ</strong> is the ultimate
        destination for fashion and lifestyle, being host to a wide array of merchandise including
        clothing, footwear, accessories, jewelry, personal care products and more. It is time to
        redefine your style statement with our treasure-trove of trendy items. Our online store
        brings you the latest in designer products straight out of fashion houses. You can shop
        online at <strong>QTDEALZ</strong> from the comfort of your home and get your favorites
        delivered right to your doorstep.
      </Typography>
      <Typography {...headingProps}>
        BEST ONLINE SHOPPING SITE IN <strong>QATAR</strong> FOR FASHION
      </Typography>
      <Typography variant="body1">
        Be it clothing, footwear or accessories, <strong>QTDEALZ</strong> offers you the ideal
        combination of fashion and functionality for women and kids. You will realize that the sky
        is the limit when it comes to the types of outfits that you can purchase for different
        occasions.
      </Typography>
      <Typography {...headingProps}>WE HAVE THE LOWEST PRICES ON OUR WEBSITE. WHY?</Typography>
      <Typography variant="body1">
        Because we don&apos;t purchase any single item from local <strong>QATAR</strong> suppliers.
        We import all our products directly with no third-party involvement and that is the reason
        we offer a low price to our customers. We do not compromise on Quality that’s why our
        products are high in quality and low in prices just to make it affordable for low-budget
        customers.
      </Typography>
      <Typography {...headingProps}>HOW GOOD WE SUPPORT OUR CUSTOMERS AFTER THE SALE?</Typography>
      <Typography variant="body1">
        Our first and only priority in <strong>QTDEALZ</strong> is our customers. We feel happy to
        hear from them and to give them complete customer care support with maximum time. We are the
        only Online Shopping platform offering <strong>Customer Services</strong> from{" "}
        <strong>9:00 AM to 12:00 Midnight</strong> on <strong>Facebook</strong>,{" "}
        <strong>Messenger</strong>, <strong>WhatsApp</strong> as well as on <strong>Voice</strong>,
        so that our customers feel convenient to contact us after their tough routine and working
        hours are over but we remain available for them until our maximum time.
      </Typography>
      <Typography {...headingProps}>WHAT IS OUR AIM?</Typography>
      <Typography variant="body1">
        We aim to deliver and facilitate all the middle and lower class customers, visitors, and
        suppliers with high-class fashionable products, accessories, and relevant products,
        according to the new batches in the market and modernized fashion. The customers with a low
        budgets can purchase and enjoy all the new fashion being introduced time to time.
      </Typography>
      <Typography {...headingProps}>WHAT ABOUT DELIVERY?</Typography>
      <Typography variant="body1">
        We are delivering fast, becoming fastest day by day. <strong>QTDEALZ</strong> is the only
        platform involving different courier services to deliver our products to the customers in
        minimum time <strong>i.e. 48 Hours</strong>. Right now, we deliver our{" "}
        <strong>70% orders</strong> within <strong>24 Hours</strong> in all over{" "}
        <strong>QATAR</strong>.
        <br />
        <br />
        Once you confirm your order <strong>till 03:00 PM</strong> from Monday to Saturday, we
        deliver your product within <strong>1-2 business days</strong> without any delay{" "}
        <strong>(Except for Friday or Public holidays)</strong>.
      </Typography>
      <Typography {...headingProps}>WHAT ABOUT THE PAYMENT?</Typography>
      <Typography variant="body1">
        The famous payment method according to the Customers is{" "}
        <strong>Cash on Delivery (COD)</strong>, which is available in our payment methods, so the
        customers can easily pay for the products they have ordered at their doorsteps. Further, we
        also offer the <strong>Card Payment System</strong>.
      </Typography>
    </Container>
  );
};
