import { Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import * as React from 'react';
import { IProduct } from '../../types';
import ProductCard from '../Product/ProductCard';

export interface ProductMainPageProps {
  products: IProduct[];
  letter: string;
}

const TextAnimate = styled(Typography)`
  background: 50% 100% / 50% 50% no-repeat radial-gradient(ellipse at bottom, #fff, transparent, transparent);
  font-weight: 600;
  -webkit-background-clip: text;
  background-clip: text;
  color: #dc2626;
  font-size: 18px;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  animation: reveal 3000ms ease-in-out forwards 200ms, glow 2500ms linear infinite 2000ms;

  @keyframes reveal {
    80% {
      letter-spacing: 8px;
    }
    100% {
      background-size: 300% 300%;
    }
  }
  @keyframes glow {
    40% {
      text-shadow: 0 0 8px #696262;
    }
  }
`;
export default function ProductMainPage({ products, letter }: ProductMainPageProps) {
  return (
    <Box width="100%" padding="10px" sx={{}} maxHeight="100%">
      <TextAnimate sx={{ marginY: '16px', fontSize: '28px', lineHeight: '36px' }}>{letter}</TextAnimate>
      <Grid
        container
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        columns={{ xs: 6, sm: 14, md: 18, lg: 16 }}
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid item xs={6} sm={6} md={5} lg={3} sx={{ marginRight: '16px' }}>
          <ProductCard product={products[0]} />
        </Grid>
        <Grid item xs={6} sm={6} md={5} lg={3} sx={{ marginRight: '16px' }}>
          <ProductCard product={products[1]} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={5}
          lg={3}
          sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }, marginRight: '16px' }}
        >
          <ProductCard product={products[2]} />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={5}
          lg={3}
          sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }, marginRight: '16px' }}
        >
          <ProductCard product={products[3]} />
        </Grid>
        <Grid item xs={6} sm={6} md={5} lg={3} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
          <ProductCard product={products[4]} />
        </Grid>
      </Grid>
    </Box>
  );
}
