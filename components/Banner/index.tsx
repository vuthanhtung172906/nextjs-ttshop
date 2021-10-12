import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Box, styled } from '@mui/system';
import { CallSplit, LocalShipping, PermPhoneMsg } from '@mui/icons-material';
export interface BannerProps {}

const GridItem = styled(Grid)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 95px;
  align-items: center;
  width: auto;
  color: white;
`;
const BoxItem = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  padding: 0;
`;

export default function Banner(props: BannerProps) {
  return (
    <Grid container justifyContent="space-between" columns={{ xs: 12, sm: 12, md: 12.5 }} sx={{ margin: '0px 0px' }}>
      <GridItem item xs={12} sm={12} md={3} sx={{ backgroundColor: '#429669' }}>
        <CheckIcon color="inherit" fontSize="large" />
        <BoxItem>
          <Typography>Sản phẩm uy tín</Typography>
          <Typography>Chất lượng</Typography>
        </BoxItem>
      </GridItem>
      <GridItem item xs={12} sm={12} md={3} sx={{ backgroundColor: '#EB5A23' }}>
        <CallSplit color="inherit" fontSize="large" />
        <BoxItem>
          <Typography>Đổi trả 7 ngày</Typography>
          <Typography>Hoàn tiền 100%</Typography>
        </BoxItem>
      </GridItem>
      <GridItem item xs={12} sm={12} md={3} sx={{ backgroundColor: '#327293' }}>
        <PermPhoneMsg color="inherit" fontSize="large" />
        <BoxItem>
          <Typography>Tư vấn viên nhiệt tình</Typography>
          <Typography>Nhiều kinh nghiệm</Typography>
        </BoxItem>
      </GridItem>
      <GridItem item xs={12} sm={12} md={3} sx={{ backgroundColor: '#EF9109' }}>
        <LocalShipping color="inherit" fontSize="large" />
        <BoxItem>
          <Typography>Miễn phí giao hàng toàn quốc</Typography>
        </BoxItem>
      </GridItem>
    </Grid>
  );
}
