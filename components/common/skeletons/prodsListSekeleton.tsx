import { Grid, Skeleton, Box } from '@mui/material';
import React from 'react';

export default function ProdsListSkeleton() {
  const fakeArr = new Array(32).fill(0);
  return (
    <>
      {fakeArr.map((item, index) => (
        <Grid
          item
          key={index}
          xs={6}
          md={4}
          lg={3}
          component="div"
          //    sx={singleProdGridStyle}
        >
          <Skeleton height={150} variant="rectangular" width="100%" />
          <Skeleton width="60%" />
          <Skeleton />
        </Grid>
      ))}
    </>
  );
}
