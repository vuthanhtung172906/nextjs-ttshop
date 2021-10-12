import { Grid, Paper, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import paymentApi from '../../api/paymentApi';
import UserSidebar from '../../components/common/UserSidebar';
import { IOrder } from '../../types';
export interface OrderProps {}
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

export default function Order(props: OrderProps) {
  const [orderlist, setOrderList] = useState<IOrder[]>();
  useEffect(() => {
    (async () => {
      try {
        const list = await paymentApi.getOrderHistory();
        console.log({ list });
        setOrderList(list);
      } catch (error) {
        throw error;
      }
    })();
  }, []);
  return (
    <Box sx={{ display: 'flex', padding: '16px', flexDirection: { xs: 'column', sm: 'row' } }}>
      <UserSidebar />
      <Box sx={{ flex: '1' }}>
        <Box sx={{ maxWidth: '1536px', marginY: '20px', marginX: 'auto' }}>
          {orderlist?.map((state, idx) => (
            <Paper
              elevation={3}
              key={idx}
              sx={{
                // display: 'flex',
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <Grid container sx={{}}>
                <Grid item xs={12} md={2}>
                  <Typography>Name: {state.name}</Typography>
                  <Typography>Phone: {state.phone}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  {state.cart.map((state, idx) => (
                    <Box key={idx} sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <Box sx={{ position: 'relative', width: '60px', height: '60px' }}>
                        <Image src={state.images[0].url} alt="cartimage" layout="fill" objectFit="cover" />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography sx={{ color: '#000', textTransform: 'capitalize', fontSize: '14px' }}>
                          {state.title}
                        </Typography>
                        <Typography fontSize="12px" color="#34d399" fontWeight="400">
                          Số lượng: {state.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>Trạng thái đơn hàng : {state.status ? 'Đã xác nhận' : 'Chưa xác nhận'}</Typography>
                  <Typography>Hình thức thanh toán : {state.typePay}</Typography>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Typography> Tổng tiền: </Typography>
                  <DisplayPrice>{state.total}</DisplayPrice>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
