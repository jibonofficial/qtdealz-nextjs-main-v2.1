import EmailIcon from "@mui/icons-material/Email";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  GridSize,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import appConfig from "../../../config";
import { appColors, appStyles } from "../appColors";

const TagButtonsStyle = {
  textTransform: "capitalize",
  borderRadius: "0",
  borderColor: "#444444",
  color: "#7f7f7f",
  ":hover": {
    backgroundColor: "primary.main",
    color: appColors.darkGrey,
    borderColor: "transparent",
  },
};

interface panels {
  [key: string]: boolean;
}

const Footer = () => {
  const [expanded, setExpanded] = React.useState<panels>({
    panel1: false,
    panel2: false,
    panel3: false,
    panel4: false,
  });
  const [accordionDisabled, setAccordionDisabled] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  const mdUpMatches = useMediaQuery("(min-width:900px)");
  const down1000pxMatches = useMediaQuery("(max-width:1000px)");

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    if (down1000pxMatches) {
      setExpanded({
        ...expanded,
        [panel]: isExpanded,
      });
    }
  };

  useEffect(() => {
    if (mdUpMatches) {
      setAccordionDisabled(true);
      setAllExpanded(true);
    } else {
      setAccordionDisabled(false);
      setAllExpanded(false);
    }
  }, [mdUpMatches]);

  const accordionProps = {
    disableGutters: true,
    elevation: 0,
    sx: {
      backgroundColor: "transparent",
      color: "#fff",
      ":before": {
        display: "none",
      },
    },
    className: "footer-accordion",
    TransitionProps: { timeout: 700 },
  };
  const accordionSummaryProps = {
    expandIcon: !allExpanded && (
      <img src={"/images/caret-down-square.svg"} className="expand-icon" />
    ),
    sx: {
      "& 	.MuiAccordionSummary-content": {
        xs: {
          margin: 0,
        },
      },
    },
  };
  const gridAccordionProps = {
    item: true,
    md: 6 as GridSize,
    lg: 3 as GridSize,
    xs: 12 as GridSize,
  };
  const accordionSummaryTitleProps = {
    sx: {
      fontSize: {
        xs: "18px",
        sm: "22px",
        md: "24px",
      },
    },
  };
  return (
    <footer>
      <Stack
        spacing={{ md: 10, xs: 5 }}
        direction={{ xs: "column", md: "row" }}
        mb={2}
        className="footer-credit"
        // justifyContent="center"
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Typography color={appColors.lightGreyText}>
          {appConfig.name} is a registered company in Qatar. Contact us - 00974 50303100
        </Typography>
      </Stack>

      {/* expanded and disabled will be true for higher device widths to follow the design. */}
      <Grid
        container
        columnSpacing={2}
        sx={{
          "& .MuiGrid-item": {
            paddingLeft: "0 !important",
          },
        }}
      >
        <Grid {...gridAccordionProps}>
          <Accordion
            {...accordionProps}
            expanded={!allExpanded ? !accordionDisabled && expanded.panel1 === true : true}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary {...accordionSummaryProps}>
              <Typography variant="h6" {...accordionSummaryTitleProps}>
                Address
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion-details footer-address">
                <span>{appConfig.contact.address}</span>
                <Divider sx={{ backgroundColor: "#444444", marginY: "10px" }} />
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon />
                    <a href={`mailto:${appConfig.contact.email}`}>{appConfig.contact.email}</a>
                  </Stack>
                  {/* <Stack direction="row" spacing={1} alignItems="center">
                    <WhatsAppIcon />
                    <a href={`${configs.contact.whatsapp}`} rel="nofollow noopener" target="_blank">
                      00974 50303100
                    </a>
                  </Stack> */}
                </Stack>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid {...gridAccordionProps}>
          <Accordion
            {...accordionProps}
            expanded={!allExpanded ? !accordionDisabled && expanded.panel2 === true : true}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary {...accordionSummaryProps}>
              <Typography variant="h6" {...accordionSummaryTitleProps}>
                Tag
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion-details footer-tags">
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" sx={TagButtonsStyle}>
                    Men
                  </Button>
                  <Button variant="outlined" sx={TagButtonsStyle}>
                    Fashion
                  </Button>
                  <Button variant="outlined" sx={TagButtonsStyle}>
                    Gallery
                  </Button>
                </Stack>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid {...gridAccordionProps}>
          <Accordion
            {...accordionProps}
            expanded={!allExpanded ? !accordionDisabled && expanded.panel3 === true : true}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary {...accordionSummaryProps}>
              <Typography variant="h6" {...accordionSummaryTitleProps}>
                Services
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion-details">
                <nav className="footer-services-list">
                  <Stack direction="column" spacing={1} component="ul">
                    <li>
                      <Link href="/">Designer Dresses</Link>
                    </li>
                    <li>
                      <Link href="/">New Products</Link>
                    </li>
                    <li>
                      <Link href="/">Our Lookbook</Link>
                    </li>
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="/">Careers</Link>
                    </li>
                  </Stack>
                </nav>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid {...gridAccordionProps}>
          <Accordion
            {...accordionProps}
            expanded={!allExpanded ? !accordionDisabled && expanded.panel4 === true : true}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary {...accordionSummaryProps}>
              <Typography variant="h6" {...accordionSummaryTitleProps}>
                Contact Us
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="accordion-details">
                <Box component="form">
                  <TextField id="name" name="name" fullWidth margin="dense" size="small" />
                  <TextField
                    id="email"
                    name="email"
                    fullWidth
                    margin="dense"
                    size="small"
                    type="email"
                  />
                  <TextField
                    id="email"
                    name="email"
                    fullWidth
                    margin="dense"
                    size="small"
                    type="text"
                    multiline={true}
                    rows={2}
                  />
                  <Button
                    disableElevation
                    variant="contained"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: 0,
                      fontWeight: appStyles.w600,
                      color: "#222222 !important",
                      fontSize: "15px",
                      ":hover": {
                        bgcolor: "#444444",
                        color: "#fff !important",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Divider sx={{ backgroundColor: "#444444", mt: 4, mb: 3 }} />
      <div className="footer-pages">
        <nav>
          <Grid container component="ul" justifyContent="center" alignItems="center">
            <Grid item component="li">
              <Link href="/privacy-and-cookie-policy">Privacy and Cookie Policy</Link>
            </Grid>
            <Grid item component="li">
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </Grid>
            <Grid item component="li">
              <Link href="/">Advanced Search</Link>
            </Grid>
            <Grid item component="li">
              <Link href="/contact-us">Contact Us</Link>
            </Grid>
          </Grid>
        </nav>
        <Typography variant="body1" mt={1} className="footer-copyright">
          Copyright © 2022-{appConfig.name}. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
