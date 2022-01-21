import { Box, Grid, Paper, styled } from '@mui/material';
import React, { ReactElement } from 'react';

interface Props {}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  align: "center",
});

export default function Root({}: Props): ReactElement {
  return (
    <Paper sx={{ background: "black" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              // width: "130vh",

              width: {
                xs: "100%",
                md: "90%",
                lg: "70%",
              },
            }}
          >
            <Img src="https://cherry.org.ua/images/tisha1.png" />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
