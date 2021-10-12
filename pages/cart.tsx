import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import productApi from '../api/axiosProduct';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/Layout';
import ProductCard from '../components/Product/ProductCard';
import { cartAction } from '../features/payment/cartSlice';
import { IProduct } from '../types';
export interface CartProps {}
const DisplayPrice = styled(Typography)`
  font-size: 16px;
  position: relative;
  font-weight: 400;
  margin-top: 16px;
  color: #dc2626;
  &::after {
    padding-left: 5px;
    content: '₫';
    position: absolute;
    top: 0px;
    font-size: 12px;
  }
`;
const ScorllBar = styled(Box)`
  overflow: auto;
  white-space: nowrap;
  max-height: 627px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default function Cart(props: CartProps) {
  const router = useRouter();
  const cartlist = useAppSelector((state) => state.cart.cartlist);
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const [productRelate, setProductRelate] = useState<IProduct[]>([]);
  const descrement = (idx: number) => {
    dispatch(cartAction.descrement(idx));
  };
  const dispatch = useAppDispatch();
  const increment = (idx: number) => {
    dispatch(cartAction.increment(idx));
  };
  const handleDelCart = (idx: number) => {
    const newcartlist = JSON.parse(localStorage.getItem('cart') as string);
    newcartlist.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(newcartlist));

    dispatch(cartAction.deletecart(idx));
  };
  useEffect(() => {
    (async () => {
      try {
        const getProduct = await productApi.getProduct({ page: 1, limit: 5, category: cartlist[0]?.category });
        setProductRelate(getProduct.products);
      } catch (error) {
        throw error;
      }
    })();
  }, [cartlist]);
  const handleToCheckout = () => {
    router.push({
      pathname: '/order/checkout',
    });
  };
  return (
    <Layout>
      <Grid
        padding="8px"
        container
        columns={{ xs: 12, sm: 12, md: 12 }}
        flexDirection="row"
        columnSpacing={1}
        sx={{ backgroundColor: '#F3F4F6', maxWidth: '100%' }}
      >
        <Grid item xs={12} sm={8} lg={10}>
          <Paper elevation={2} sx={{ padding: '8px' }}>
            <Box
              width="100%"
              minHeight="200px"
              sx={{
                marginRight: '5px',
                position: 'relative',
              }}
            >
              <Image src="/shipper.png" alt="imagetab" layout="fill" objectFit="contain" />
            </Box>
            <Divider />
            <Typography sx={{ fontSize: '24px', padding: '10px' }}>Sản phẩm trong giỏ hàng</Typography>
            <Divider />
            {cartlist.map((state, idx) => (
              <Grid container key={idx} spacing={2} marginTop="10px" padding="20px">
                <Grid item xs={4} md={2} sx={{ position: 'relative' }}>
                  <Image src={state.images[0].url} alt="cartimage" layout="fill" objectFit="contain" />
                </Grid>
                <Grid item xs={4} md={8}>
                  <Typography sx={{ color: '#000', textTransform: 'capitalize', fontSize: '18px' }}>
                    {state.title}
                  </Typography>
                  <DisplayPrice>{state.price.toLocaleString('de-DE')}</DisplayPrice>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography
                      sx={{ border: '1px solid #999', borderRadius: '5px', marginRight: '8px', padding: '8px' }}
                    >
                      {(state.color as string[])[0]}
                    </Typography>
                    <Typography
                      sx={{ border: '1px solid #999', borderRadius: '5px', marginRight: '8px', padding: '8px' }}
                    >
                      {[state.capacity as string[]][0]}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={2}
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                >
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Button onClick={() => descrement(idx)} sx={{ fontSize: '30px' }}>
                      -
                    </Button>
                    <Typography sx={{ display: 'block', textAlign: 'center' }}>{state.quantity}</Typography>
                    <Button onClick={() => increment(idx)} sx={{ fontSize: '24px' }}>
                      +
                    </Button>
                  </Box>
                  <Button onClick={() => handleDelCart(idx)}>Delete</Button>
                </Grid>
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <Paper elevation={1} sx={{ padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <Typography> Tạm tính :</Typography>
            {isLogin ? (
              <Button variant="contained" color="secondary" onClick={handleToCheckout}>
                Tiến hành thanh toán
              </Button>
            ) : (
              <>
                <Button variant="contained" disabled color="info">
                  Đăng nhập để đặt hàng
                </Button>
                <Button variant="contained" color="secondary">
                  Đặt hàng khồng cần tài khoản
                </Button>
              </>
            )}
            <br />
            <Divider />
            <br />
            <Typography sx={{ fontSize: '24px', fontWeight: '400' }}>Cùng liên quan</Typography>
            <ScorllBar>
              {productRelate.map((state, idx) => (
                <ProductCard key={idx} product={state} />
              ))}
            </ScorllBar>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
