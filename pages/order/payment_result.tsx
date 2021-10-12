import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export interface PaymentResultProps {}

export default function PaymentResult(props: PaymentResultProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        marginX: 'auto',
        marginY: '20px',
        maxWidth: '500px',
        minHeight: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" color="tomato" sx={{ paddingBottom: '30px' }}>
        Đặt Hàng Thành Công
      </Typography>
    </Paper>
  );
}
