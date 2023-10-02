import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React from "react";
import { productDescTheme } from "../productDescTheme";
import { ProductReviews } from "./reviews";
import * as styles from "../style";

interface Description {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const commonProps = {
  lineHeight: 2,
};

function TabPanel(props: Description) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface Props {
  productId: string;
  finePrint?: string;
  productDescription?: string;
}

export default function DescriptionTabs({ productId, finePrint, productDescription }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={productDescTheme}>
      <Box>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {/* <Tab label="Reviews" /> */}
          <Tab label="Fine Print" />
          <Tab label="Description" />
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={0}>
        <ProductReviews productId={productId} />
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <Box sx={{}}>{finePrint && <div dangerouslySetInnerHTML={{ __html: finePrint }} />}</Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{}}>
          {productDescription && <div dangerouslySetInnerHTML={{ __html: productDescription }} />}
        </Box>
      </TabPanel>
    </ThemeProvider>
  );
}
