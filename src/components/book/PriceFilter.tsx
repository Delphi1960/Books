import { Box, Button, Grid, Slider, TextField, Typography } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';

import { FilterBook, FilterBookAtom } from './filters.state';

interface Props {}

export default function PriceFilter({}: Props): ReactElement {
  const [globalFilter, setGlobalFilter] =
    useRecoilState<FilterBook>(FilterBookAtom);

  const [valueSlider, setValueSlider] = React.useState<number[]>([50, 500]);
  const [PriceMin, setPriceMin] = useState(valueSlider[0]);
  const [PriceMax, setPriceMax] = useState(valueSlider[1]);

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValueSlider(newValue as number[]);
    setPriceMin(valueSlider[0]);
    setPriceMax(valueSlider[1]);
    setGlobalFilter({
      ...globalFilter,
      priceMin: valueSlider[0],
      priceMax: valueSlider[1],
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 1.5 }}
        >
          <Grid item>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              <TextField
                size="small"
                sx={{ width: 70 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPriceMin(Number(event.target.value));
                }}
                value={PriceMin}
              />
              -
              <TextField
                size="small"
                sx={{ width: 70, minHeight: "30px", maxHeight: "30px" }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPriceMax(Number(event.target.value));
                }}
                value={PriceMax}
              />
            </Typography>
          </Grid>
          <Button
            variant="contained"
            sx={{
              mt: 0.3,
              ml: 2,
              maxWidth: "40px",
              maxHeight: "36px",
              minWidth: "40px",
              minHeight: "36px",
            }}
            onClick={() => {
              setValueSlider([PriceMin, PriceMax]);
              setGlobalFilter({
                ...globalFilter,
                priceMin: PriceMin,
                priceMax: PriceMax,
              });
            }}
          >
            ok
          </Button>
        </Grid>
      </div>
      <Box sx={{ m: 0 }}>
        <Slider
          size="small"
          min={0}
          max={1000}
          value={valueSlider}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}
