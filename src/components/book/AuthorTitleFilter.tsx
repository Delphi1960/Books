import { Box, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';

import { FilterBook, FilterBookAtom } from './filters.state';

interface Props {}

export default function AuthorTitleFilter({}: Props): ReactElement {
  const [globalFilter, setGlobalFilter] =
    useRecoilState<FilterBook>(FilterBookAtom);

  return (
    <Box sx={{ p: 0 }}>
      <TextField
        //sx={{ mt: 1 }}
        id="author"
        label="Автор"
        size="small"
        variant="outlined"
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setGlobalFilter({
            ...globalFilter,
            inAuthor: event.target.value,
          });
        }}
        value={globalFilter.inAuthor}
      />
      <TextField
        sx={{ mt: 1 }}
        id="title"
        label="Название"
        size="small"
        variant="outlined"
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setGlobalFilter({
            ...globalFilter,
            inTitle: event.target.value,
          });
        }}
        value={globalFilter.inTitle}
      />
    </Box>
  );
}
