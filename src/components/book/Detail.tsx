import { ArrowBack } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import styled from '@mui/material/styles/styled';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { filterBooksListSelector } from './filters.state';

type Props = {};

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Detail({}: Props) {
  const getBooks = useRecoilValue(filterBooksListSelector);
  const param = useParams();
  const navigate = useNavigate();
  const detail = getBooks.filter((item) => item.id === param.id?.slice(1));

  const detailCard = detail?.map((item, ind) => item);

  let saleOpportunity = "";
  switch (detailCard[0].saleInfo.saleability) {
    case "FREE":
      saleOpportunity = "Бесплатно";
      break;
    case "NOT_FOR_SALE":
      saleOpportunity = "Нет в продаже";
      break;

    default:
      break;
  }

  const handleClick = () => {
    navigate("/");
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 5 }}>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 600, flexGrow: 1 }}>
          <IconButton
            aria-label="back"
            size="large"
            color="primary"
            onClick={handleClick}
          >
            <ArrowBack fontSize="inherit" />
          </IconButton>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Img
                width="250"
                height="350"
                alt="complex"
                src={
                  detailCard[0].volumeInfo?.imageLinks?.thumbnail ??
                  "https://cherry.org.ua/images/a.gif"
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                gutterBottom
                component="div"
                variant="h4"
                align="left"
                sx={{ ml: 0.5 }}
                // noWrap
              >
                {detailCard[0].volumeInfo.title}
              </Typography>

              <Typography
                gutterBottom
                component="div"
                variant="h6"
                align="left"
                sx={{ ml: 0.5 }}
                // noWrap
              >
                {detailCard[0].volumeInfo.authors}
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Rating
                  name="rating"
                  readOnly
                  value={detailCard[0].volumeInfo?.averageRating}
                  precision={0.5}
                />
              </Grid>

              {detailCard[0].saleInfo?.listPrice?.amount === undefined ? (
                <Box
                  sx={{
                    mt: 1,
                    ml: 1,
                    textAlign: "left",
                    fontSize: 14,
                    color: "blue",
                  }}
                >
                  {saleOpportunity}
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      mt: 1,
                      ml: 1,
                      fontSize: 16,
                      color: "gray",
                      textDecoration: "line-through",
                      textAlign: "left",
                    }}
                  >
                    {detailCard[0].saleInfo?.listPrice?.amount} грн
                  </Box>
                  <Box
                    sx={{
                      ml: 1,
                      textAlign: "left",
                      fontSize: 16,
                      color: "blue",
                    }}
                  >
                    {detailCard[0].saleInfo?.retailPrice?.amount} грн
                  </Box>
                </Box>
              )}
            </Grid>
            <Typography sx={{ m: 1, textAlign: "justify" }} variant="body2">
              {detailCard[0].volumeInfo.description}
            </Typography>
          </Grid>
          <IconButton
            aria-label="back"
            size="large"
            color="primary"
            onClick={handleClick}
          >
            <ArrowBack fontSize="inherit" />
          </IconButton>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
