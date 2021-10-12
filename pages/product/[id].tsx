import { Grid, Paper, Typography, styled, Button } from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import productApi from '../../api/axiosProduct';
import { IProduct } from '../../types';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { useAppDispatch } from '../../app/hooks';
import { cartAction } from '../../features/payment/cartSlice';
import { useRouter } from 'next/router';

export interface ProductDetailProps {
  productdetail: IProduct;
}
const DisplayPrice = styled(Typography)`
  font-size: 30px;
  position: relative;
  font-weight: bold;
  margin-top: 16px;
  color: #dc2626;
  &::after {
    padding-left: 5px;
    content: '₫';
    position: absolute;
    top: 4px;
    font-size: 18px;
  }
`;
export default function ProductDetail({ productdetail }: ProductDetailProps) {
  const [tab, setTab] = useState(0);
  const setImageActive = (index: number) => {
    setTab(index);
  };
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleAddToCart = (productdetail: IProduct) => {
    if (productdetail.color?.length !== 0 && chooseColor === undefined) {
      alert('Làm ơn chọn màu');
      return;
    }
    if (productdetail.capacity?.length !== 0 && chooseCapacity === undefined) {
      alert('Làm ơn chọn dung lượng');
      return;
    }
    const cartlist = JSON.parse(localStorage.getItem('cart') as string);
    if (cartlist) {
      if (
        cartlist.some((element: IProduct) => {
          return element._id === productdetail._id;
        })
      ) {
        return alert('Sản phẩm đã tồn tại trong giỏ hàng !');
      } else {
        const newpro: IProduct = {
          ...productdetail,
          quantity: 1,
          color: [(productdetail.color as string[])[chooseColor as number]],
          capacity: [(productdetail.capacity as string[])[chooseCapacity as number]],
        };
        cartlist.push(newpro);
        localStorage.setItem('cart', JSON.stringify(cartlist));
        dispatch(cartAction.addcart(newpro));
        router.push('/');
      }
    } else {
      const newpro: IProduct = {
        ...productdetail,
        quantity: 1,
        color: [(productdetail.color as string[])[chooseColor as number]],
        capacity: [(productdetail.capacity as string[])[chooseCapacity as number]],
      };
      const cart = [newpro];
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(cartAction.addcart(newpro));
      router.push('/');
    }
  };
  const [chooseColor, setChooseColor] = useState<number>();
  const [chooseCapacity, setCapacity] = useState<number>();

  return (
    <Layout>
      <Box sx={{ backgroundColor: '#E5E7EB', paddingY: '16px' }}>
        <Paper elevation={1} sx={{ maxWidth: '1536px', marginX: 'auto', padding: '16px' }}>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ padding: '16px' }}>
              <Paper elevation={3} sx={{ padding: '40px' }}>
                <Box sx={{ position: 'relative', width: '708px', height: '708px' }}>
                  <Image src={productdetail.images[tab].url} alt="imagemain" layout="fill" objectFit="contain" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  {productdetail.images.map((state, index) => (
                    <Box
                      width="78px"
                      height="78px"
                      key={index}
                      onClick={() => setImageActive(index)}
                      sx={{
                        cursor: 'pointer',
                        marginRight: '5px',
                        border: index === tab ? '4px solid #ED7172' : 'none',
                        position: 'relative',
                        transition: ' all 0.1s ease-in-out',
                      }}
                    >
                      <Image src={state.url} alt="imagetab" layout="fill" objectFit="cover" />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '16px' }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }}>
                {productdetail.title}
              </Typography>
              <DisplayPrice>{productdetail.price.toLocaleString('de-DE')}</DisplayPrice>
              <Typography marginTop="16px" fontSize="16px" color="#34d399" fontWeight="600">
                Kho: {productdetail.inStock}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {productdetail.color?.map((state, idx) => (
                  <Typography
                    sx={{
                      border: '1px solid #999',
                      borderRadius: '5px',
                      margin: '8px',
                      padding: '8px',
                      backgroundColor: chooseColor === idx ? '#c0b6b6' : '#eee',
                    }}
                    key={idx}
                    onClick={() => setChooseColor(idx)}
                  >
                    {state}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {productdetail.capacity?.map((state, idx) => (
                  <Typography
                    sx={{
                      border: '1px solid #999',
                      borderRadius: '5px',
                      margin: '8px',
                      padding: '8px',
                      backgroundColor: chooseCapacity === idx ? '#c0b6b6' : '#eee',
                    }}
                    onClick={() => setCapacity(idx)}
                    key={idx}
                  >
                    {state}
                  </Typography>
                ))}
              </Box>
              <Typography marginTop="16px" fontSize="20px" color="#374151">
                {productdetail.content}
              </Typography>
              <Grid container columns={{ xs: 13 }} sx={{ marginTop: '16px' }}>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  component={Grid}
                  item
                  xs={6}
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleAddToCart(productdetail)}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button variant="contained" size="large" color="secondary" component={Grid} item xs={6}>
                  Mua ngay
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Box padding="16px">
            <Typography variant="h5">Mô tả chi tết</Typography>
            <Typography>{productdetail.description}</Typography>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productdetail = await productApi.getProductDetail(context.query.id as string);
  return {
    props: {
      productdetail,
    },
  };
};
