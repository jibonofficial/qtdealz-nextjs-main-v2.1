import React from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TopCategoryType } from "components/allTypes/categoriesType";
import Link from "next/link";
import { appStyles } from "../appColors";

export const TopCategories = () => {
  return (
    <div>
      <Typography
        variant="h4"
        textAlign="center"
        mb={2}
        color={grey[700]}
        fontWeight={appStyles.w500}
      >
        Top Categories
      </Typography>
      <Divider />
      <Grid
        container
        spacing={5}
        paddingTop={5}
        paddingBottom={5}
        justifyContent={{ xs: "space-evenly", sm: "center" }}
      >
        {TopCategoriesData.map((item: TopCategoryType, index: number) => (
          <Grid key={index} item className="cat-grid-item">
            <Link href={`/category/${item.value}/${item.title}`} legacyBehavior>
              <Paper className="category-paper">
                <img
                  className="category-img"
                  src={`/images/${item.imageName}`}
                  alt={`${item.title} category`}
                />
              </Paper>
              <div className="cat-name">{item.title}</div>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Divider />
    </div>
  );
};

export const TopCategoriesData: TopCategoryType[] = [
  {
    title: "New Arrival",
    value: "61194a6d52ad228a0f303153",
    imageName: "new-arrivals.jpg",
  },
  {
    title: "Clearance Sale",
    value: "610173363351d210026762a9",
    imageName: "clearance-sale.jpg",
  },
  {
    title: "Women Fashion",
    value: "606b54ba0846def3c4b09a19",
    imageName: "cat-3.jpg",
  },
  {
    title: "Home Needs",
    value: "607001be41d4144e9f32d3bb",
    imageName: "cat-4.jpg",
  },
];
