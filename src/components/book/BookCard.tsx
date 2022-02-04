import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import stars from './stars.gif';

interface Props {
  id: string;
  author: string[];
  thumbnail: string;
  title: string;
  saleability: string;
  listPrice: number;
  retailPrice: number;
  averageRating: number | null;
}

export default function BookCard({
  id,
  author,
  thumbnail,
  title,
  saleability,
  listPrice,
  retailPrice,
  averageRating,
}: Props): ReactElement {
  if (author === undefined) {
    author = ["Нет автора"];
  }
  let saleOpportunity = "";
  switch (saleability) {
    case "FREE":
      saleOpportunity = "Бесплатно";
      break;
    case "NOT_FOR_SALE":
      saleOpportunity = "Нет в продаже";
      break;

    default:
      break;
  }

  if (averageRating === undefined) {
    averageRating = 0;
  }

  return (
    <Card sx={{ width: 160, height: 300, m: 0 }}>
      <CardActionArea component={Link} to={`/detail:${id}`}>
        <CardMedia
          component="img"
          alt="book"
          width="160"
          height="220"
          image={
            // cardBook.volumeInfo?.imageLinks?.thumbnail ??
            thumbnail ?? stars
          }
        />
      </CardActionArea>

      <Typography
        gutterBottom
        component="div"
        variant="subtitle2"
        align="left"
        sx={{ ml: 0.5 }}
        noWrap
      >
        {title}
      </Typography>
      <Typography
        gutterBottom
        component="div"
        variant="caption"
        align="left"
        sx={{ ml: 0.5, mt: -1 }}
        noWrap
      >
        {author}
      </Typography>
      {listPrice === undefined ? (
        <Box sx={{ mt: -1, fontSize: 14, color: "blue" }}>
          {saleOpportunity}
        </Box>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              mt: -1,
              fontSize: 14,
              color: "gray",
              textDecoration: "line-through",
            }}
          >
            {listPrice} грн
          </Box>
          <Box sx={{ mt: -1, fontSize: 14, color: "blue" }}>
            {retailPrice} грн
          </Box>
        </Grid>
      )}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Rating
          name="rating"
          readOnly
          value={averageRating}
          precision={0.5}
          size="small"
        />
        <Box sx={{ ml: 1, fontSize: 12, color: "gray" }}>[{averageRating}]</Box>
      </Grid>
    </Card>
  );
}
