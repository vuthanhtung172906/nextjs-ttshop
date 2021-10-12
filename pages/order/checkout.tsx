import { CheckCircleOutlined } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import paymentApi from '../../api/paymentApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cartAction } from '../../features/payment/cartSlice';
import InforForm from '../../features/payment/components/InforForm';
import ProductOrder from '../../features/payment/components/ProductOrder';
import { IInfor } from '../../types';

const Title = styled(Typography)`
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;
const DisplayPrice = styled(Typography)`
  font-size: 18px;
  position: relative;
  font-weight: bold;
  color: #dc2626;
  &::after {
    padding-left: 2px;
    content: '₫';
    position: absolute;
    top: 1px;
    font-size: 14px;
  }
`;
export default function OrderCheckout() {
  const router = useRouter();
  const initialValue: IInfor = {
    name: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    address: '',
  };
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('Thanh toán khi nhận hàng');
  const cartlist = useAppSelector((state) => state.cart.cartlist);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const subtotalPrice = cartlist.reduce((total, currentvalue) => {
    return total + (currentvalue.price as number) * (currentvalue.quantity as number);
  }, 0);
  const vanchuyen = 35000;
  const totalPrice = subtotalPrice + vanchuyen;
  const handleSubmit = async (formValue: IInfor) => {
    try {
      const newform = {
        name: formValue.name,
        phone: formValue.phone,
        address: formValue.province + formValue.district + formValue.ward + formValue.address,
        cart: cartlist,
        typePay: value,
        total: totalPrice,
      };
      console.log({ newform });
      if (value === 'Thanh toán khi nhận hàng') {
        const res = await paymentApi.createRequestOffline(newform);
        localStorage.removeItem('cart');
        dispatch(cartAction.clearCart());
        router.push('/order/payment_result');
      } else {
        const res = await paymentApi.createRequestOnline(newform);
        localStorage.removeItem('cart');
        dispatch(cartAction.clearCart());
        window.location.href = res.msg;
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <Box sx={{ maxWidth: '1536px', marginY: '20px', marginX: 'auto' }}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Box>
            <Title>Thông tin thanh toán</Title>
            <InforForm initialValue={initialValue} onSubmit={handleSubmit} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box marginX="40px">
            <Title marginBottom="16px">Vận chuyển</Title>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #D1D5DC',
                padding: '15px',
                borderRadius: '5px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <CheckCircleOutlined color="primary" />
                <Typography sx={{ marginLeft: '10px' }}>Giao hàng tận nơi</Typography>
              </Box>
              <DisplayPrice>35000</DisplayPrice>
            </Box>
            <Title sx={{ marginY: '20px' }}>Phương thức thanh toán</Title>
            <Box>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Thanh toán khi nhận hàng"
                    control={<Radio />}
                    label="Thanh toán khi nhận hàng"
                  />
                  <FormControlLabel
                    value="Thanh toán qua ví VnPay"
                    control={<Radio />}
                    label="Thanh toán qua ví điện tử Airpay"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Title>Đơn hàng</Title>
            <ProductOrder
              productlist={cartlist}
              subtotalPrice={subtotalPrice}
              vanchuyen={vanchuyen}
              totalPrice={totalPrice}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
