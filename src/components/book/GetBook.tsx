import { FilterList } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import axios from 'axios';
import _ from 'lodash';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import AuthorTitleFilter from './AuthorTitleFilter';
import BookCard from './BookCard';
import { booksStateAtom, FilterBook, FilterBookAtom, filterBooksList, filterBooksListSelector } from './filters.state';
import PriceFilter from './PriceFilter';
import SaleabilityFilter from './SaleabilityFilter';
import SceletonCard from './SceletonCard';

interface Props {}

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function GetBook({}: Props): ReactElement {
  const [globalFilter, setGlobalFilter] =
    useRecoilState<FilterBook>(FilterBookAtom);

  const [booksState, setBooksStateAtom] = useRecoilState(booksStateAtom);
  const getBooks = useRecoilValue(filterBooksListSelector);
  const [filter, setFilter] = useRecoilState(filterBooksList);

  const [isLoading, setIsLoading] = useState(true);
  // const [loadBook, setLoadBook] = useState<Book[]>([]);

  const inAuthor = globalFilter.inAuthor;
  const inTitle = globalFilter.inTitle;

  const getBook = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://80.90.229.53:3333/api/books/?inauthor=${inAuthor}&intitle=${inTitle}`
      );
      // setLoadBook(response.data.totalItems > 0 ? response.data.items : []);
      setBooksStateAtom(
        response.data.totalItems > 0 ? response.data.items : []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const debGetBook = useCallback(
    _.debounce(() => getBook(), 300),
    [inAuthor, inTitle]
  );

  useEffect(() => {
    debGetBook();
  }, [inAuthor, inTitle]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 10,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5} md={4} lg={3} xl={1}>
            <Typography variant="body1" sx={{ ml: 1, textAlign: "left" }}>
              <FilterList color="primary" />
              Фильтры
            </Typography>
            {filter === "Только платные" ? (
              <Box>
                <Typography
                  component="div"
                  variant="caption"
                  sx={{ ml: 1, textAlign: "left" }}
                >
                  Цена от :{globalFilter.priceMin}грн до {globalFilter.priceMax}
                  грн
                </Typography>
                <Box sx={{ ml: 1, mr: 1, mb: 1, width: "auto" }}>
                  <PriceFilter />
                </Box>
              </Box>
            ) : null}
            <Box sx={{ mb: 1, mr: 2 }}>{<SaleabilityFilter />}</Box>
            <Box sx={{ ml: 1, mr: 1, mb: 1, width: "auto" }}>
              <AuthorTitleFilter />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9} xl={11}>
            {isLoading ? (
              <Box>
                <SceletonCard />
              </Box>
            ) : (
              <Box sx={{ pl: 3, pt: 2 }}>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  {getBooks?.map((item, ind) => (
                    <Box sx={{ m: 1 }} key={ind}>
                      <BookCard
                        id={item.id}
                        author={item.volumeInfo.authors}
                        thumbnail={item.volumeInfo?.imageLinks?.thumbnail}
                        title={item.volumeInfo.title}
                        saleability={item.saleInfo.saleability}
                        listPrice={item.saleInfo?.listPrice?.amount}
                        retailPrice={item.saleInfo?.retailPrice?.amount}
                        averageRating={item.volumeInfo?.averageRating}
                      />
                    </Box>
                  ))}
                  {/* {console.log(getBooks)} */}
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
