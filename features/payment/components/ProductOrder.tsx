import { Divider, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import { IProduct } from '../../../types';
export interface ProductOrderProps {
  productlist: IProduct[];
  subtotalPrice?: number;
  vanchuyen?: number;
  totalPrice?: number;
}
const DisplayPrice = styled(Typography)`
  font-size: 16px;
  position: relative;
  font-weight: 400;
  color: #dc2626;
  &::after {
    padding-left: 5px;
    content: '₫';
    position: absolute;
    top: 0px;
    font-size: 12px;
  }
`;

export default function ProductOrder({ productlist, subtotalPrice, vanchuyen = 35000, totalPrice }: ProductOrderProps) {
  const subtotalPrice2 = subtotalPrice
    ? subtotalPrice
    : productlist.reduce((total, currentvalue) => {
        return total + (currentvalue.price as number) * (currentvalue.quantity as number);
      }, 0);
  const totalPrice2 = totalPrice ? totalPrice : subtotalPrice2 + vanchuyen;
  return (
    <Box>
      {productlist.map((state, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', width: '80px', height: '80px' }}>
              <Image src={state.images[0].url} alt="cartimage" layout="fill" objectFit="cover" />
            </Box>
            <Box
              sx={{
                marginLeft: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Typography sx={{ color: '#000', textTransform: 'capitalize', fontSize: '18px' }}>
                {state.title}
              </Typography>
              <Typography fontSize="16px" color="#34d399" fontWeight="400">
                Số lượng: {state.quantity}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ border: '1px solid #999', borderRadius: '5px', marginRight: '8px', padding: '8px' }}>
                  {(state.color as string[])[0]}
                </Typography>
                <Typography sx={{ border: '1px solid #999', borderRadius: '5px', marginRight: '8px', padding: '8px' }}>
                  {[state.capacity as string[]][0]}
                </Typography>
              </Box>
            </Box>
          </Box>
          <DisplayPrice>{((state.price as number) * (state.quantity as number)).toLocaleString('de-DE')}</DisplayPrice>
        </Box>
      ))}
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginY: '10px',
        }}
      >
        <Typography>Tạm tính</Typography>
        <DisplayPrice>{subtotalPrice2.toLocaleString('de-DE')}</DisplayPrice>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginY: '10px' }}>
        <Typography>Vận chuyển</Typography>
        <DisplayPrice>{vanchuyen.toLocaleString('de-DE')}</DisplayPrice>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginY: '10px' }}>
        <Typography>Tổng</Typography>
        <DisplayPrice>{totalPrice2.toLocaleString('de-DE')}</DisplayPrice>
      </Box>
    </Box>
  );
}
