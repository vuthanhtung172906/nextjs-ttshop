import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import paymentApi from '../../api/paymentApi';
import AdminSidebar from '../../components/common/AdminSiderbar';
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

export interface OrderListProps {}

export default function OrderList(props: OrderListProps) {
  const [orderlist, setOrderList] = useState<IOrder[]>();
  useEffect(() => {
    try {
      (async () => {
        const list = await paymentApi.getAllOrder();
        setOrderList(list);
      })();
    } catch (error) {
      throw error;
    }
  }, []);
  const changeStatus = async (state: IOrder) => {
    try {
      const res = await paymentApi.changeStatus({
        paymentID: state._id as string,
        status: state.status ? '01' : '00',
      });
      const list = await paymentApi.getAllOrder();
      setOrderList(list);
    } catch (error) {}
  };
  return (
    <Box display="flex" padding="10px" sx={{ backgroundColor: '#F3F4F6' }}>
      <AdminSidebar />
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
                  <Typography>
                    Trạng thái đơn hàng : {state.status ? 'Đã xác nhận' : 'Chưa xác nhận'}
                    <Button
                      onClick={() => changeStatus(state)}
                      sx={{ fontSize: '12px', marginLeft: '10px' }}
                      variant="contained"
                      color="warning"
                    >
                      Change Status
                    </Button>
                  </Typography>
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
      </Box>{' '}
    </Box>
  );
}
