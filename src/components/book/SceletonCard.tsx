import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React, { ReactElement } from 'react';

interface Props {}

export default function SceletonCard({}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        alignContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {Array(28) //массив из 28 карточек
        .fill("")
        .map((item, ind) => (
          <Box sx={{ m: 1 }} key={ind}>
            <Skeleton
              height={220}
              width={160}
              animation="wave"
              variant="rectangular"
            />
            <Skeleton animation="wave" height={20} />
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
