import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import productApi from '../api/axiosProduct';
import Banner from '../components/Banner';
import ProductMainPage from '../components/common/productMainPage';
import CustomImageList from '../components/ImageList';
import Layout from '../components/Layout';
import Sliders from '../components/Slider';
import { IProduct } from '../types';
import { NextSeo } from 'next-seo';

interface PropsType {
  newestProduct: IProduct[];
  bestSale: IProduct[];
  samsunglist: IProduct[];
  iphonelist: IProduct[];
}
const TextTranfer = styled(Typography)`
  color: #eee;
  font-size: 20px;
`;
export default function Index({ newestProduct, bestSale, samsunglist, iphonelist }: PropsType) {
  const textalert = [
    'Chào mừng quý khách',
    'Chúc quý khách gặp nhiều may mắn trong cuộc sống',
    'Nhiều ưu đãi hấp dẫn trong mùa đông này !',
  ];
  const [text, setText] = useState('Chào mừng quý khách');
  React.useEffect(() => {
    let i = 0;
    setInterval(() => {
      if (i === textalert.length - 1) {
        i = 0;
        setText(textalert[i]);
      } else {
        i += 1;
        setText(textalert[i]);
      }
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NextSeo
        title="VTT Shop: Mua điện thoại giá rẻ"
        description="Xỉ lẻ điện thoại giá rẻ uy tín. Bảo hành 12 tháng. Miễn phí giao hàng trả hàng "
        canonical="https://nextjs-ttshop.vercel.app/"
        openGraph={{
          url: 'https://nextjs-ttshop.vercel.app/',
          title: 'IPHONE 13 XẢ KHO CỰC RẺ',
          description: 'Iphone 13 hàng mới về với giá cự rẻ chỉ từ 13 triệu',
          images: [
            {
              url: 'https://res.cloudinary.com/tungvuthanh20172906/image/upload/v1634032280/user/slider/S21-830-300-830x300-3_ymcket.png',
              width: 1200,
              height: 627,
              alt: 'Điện thoại giá rẻ với VTT shop',
            },
          ],
        }}
      />
      <Layout>
        <Sliders />
        <Box
          sx={{
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column nowrap',
          }}
          maxWidth="1536px"
          width="100%"
        >
          <Banner />
          <ProductMainPage products={newestProduct} letter="New Products" />
          <CustomImageList />

          <ProductMainPage products={bestSale} letter="Best Sale" />
          <Box
            sx={{
              height: '80px',
              backgroundColor: '#EA4345',
              marginX: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TextTranfer>{text}</TextTranfer>
          </Box>
          <ProductMainPage products={iphonelist} letter="Iphone" />
          <Box sx={{ position: 'relative', margin: '30px', width: '100%' }}>
            <video width="100%" autoPlay muted loop playsInline>
              <source src="video2.mp4" />
            </video>
          </Box>
          <ProductMainPage products={samsunglist} letter="Samsung" />
        </Box>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const newestProduct = await productApi.getProduct({ page: 1, limit: 5, sort: '-createdAt' });
  const bestSale = await productApi.getProduct({ page: 1, limit: 5, sort: '-sold' });
  const iphonelist = await productApi.getProduct({ page: 1, limit: 5, category: '616015ee3571895a5a3a2fb0' });
  const samsunglist = await productApi.getProduct({ page: 1, limit: 5, category: '616015783571895a5a3a2faa' });
  return {
    props: {
      newestProduct: newestProduct.products,
      bestSale: bestSale.products,
      iphonelist: iphonelist.products,
      samsunglist: samsunglist.products,
    },
  };
};
