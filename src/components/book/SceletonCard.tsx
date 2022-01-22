import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React, { ReactElement } from 'react';

interface Props {
  n: number;
  width: number;
  height: number;
}

export default function SceletonCard({ n, width, height }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        alignContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
        // m: 0.5,
        // p: 1,
      }}
    >
      {Array(n)
        .fill("")
        .map((item, ind) => (
          <Box sx={{ m: 1 }} key={ind}>
            {/* <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />{" "} */}
            {/* <Skeleton
              variant="rectangular"
              width={width}
              height={height}
              sx={{ m: 1 }}
            /> */}
            <Skeleton
              height={220}
              width={width}
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              animation="wave"
              height={20}
              // style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={20} width="100%" />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton animation="wave" height={20} width="40%" />
              <Skeleton animation="wave" height={20} width="40%" />
            </Grid>
            <Skeleton animation="wave" height={20} width="60%" sx={{ ml: 4 }} />
          </Box>
        ))}
    </Box>
  );
}

/* 
           <Skeleton
              sx={{ height: 220 }}
              animation="wave"
              variant="rectangular"
            />

            <Skeleton
              animation="wave"
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={20} width="100%" />
            <Skeleton animation="wave" height={20} width="100%" />
            <Skeleton animation="wave" height={20} width="100%" />

*/
