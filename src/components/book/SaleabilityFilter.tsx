import { Checkbox, FormControl, FormControlLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';

import { filterAreAvailable, filterBooksList } from './filters.state';

interface Props {}

export default function SaleabilityFilter({}: Props): ReactElement {
  const [filter, setFilter] = useRecoilState(filterBooksList);
  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const [checkFilter, setCheckFilter] = useRecoilState(filterAreAvailable);

  return (
    <FormControl variant="standard" sx={{ m: 0, width: "100%" }}>
      <Select
        fullWidth
        sx={{ ml: 1, fontSize: 14 }}
        id="select-standard"
        value={filter}
        onChange={handleSelectChange}
        label="Sort"
      >
        <MenuItem value={"Все книги"}>
          Все книги (платные и бесплатные)
        </MenuItem>
        <MenuItem value={"Только платные"}>Только платные</MenuItem>
        <MenuItem value={"Только бесплатные"}>Только бесплатные</MenuItem>
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            sx={{ ml: 1 }}
            checked={checkFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckFilter(e.target.checked);
            }}
          />
        }
        label="Есть в наличии"
      />
    </FormControl>
  );
}
