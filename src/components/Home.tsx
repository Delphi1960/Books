import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import React from 'react';

import t1 from './t1.jpg';

export default function Home() {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ m: 10, width: 500, height: "auto" }}>
          <CardMedia
            component="img"
            alt="book"
            width="400"
            height="400"
            image={t1}
          />
        </Card>
      </Grid>
    </div>
  );
}
