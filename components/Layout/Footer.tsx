import {
  Facebook,
  Instagram,
  MessageOutlined,
  Phone,
  QueryStatsOutlined,
  Room,
  SecurityOutlined,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import * as React from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="#eee">
      {'Copyright © '}
      <Link color="inherit" href="https://fb.com/">
        VTMALL
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const FooterItem = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #d1d5db;
  margin-bottom: 16px;
`;
const HeaderTypo = styled(Typography)`
  color: '#fff';
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #9ca3af;
  margin-bottom: 10px;
`;

const BoxFooter = ({ children }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
      }}
    >
      {children}
    </Box>
  );
};

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid
        container
        component="footer"
        sx={{
          py: 5,
          px: 2,
          mt: 'auto',
          backgroundColor: '#232F3E',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'row nowrap',
          color: '#fff',
        }}
      >
        <Grid
          sx={{
            color: '#fff',
            maxWidth: '1536px',
            width: '100%',
          }}
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="space-between"
          container
          columns={{ xs: 14, sm: 14, md: 14, lg: 14 }}
        >
          <FooterItem item xs={6} sm={6} md={3} lg={3}>
            <HeaderTypo>THÔNG TIN LIÊN HỆ</HeaderTypo>
            <BoxFooter>
              <Room />
              <Typography>Nam Từ Liêm, Hà Nôi</Typography>
            </BoxFooter>
            <BoxFooter>
              <Phone />
              <Typography>0321 333 232</Typography>
            </BoxFooter>
            <BoxFooter>
              <MessageOutlined />
              <Typography>google@gmail.com</Typography>
            </BoxFooter>
          </FooterItem>
          <FooterItem item xs={6} sm={6} md={3} lg={3}>
            <HeaderTypo>VỀ CHÚNG TÔI</HeaderTypo>
            <BoxFooter>
              <Room />
              <Typography>Giới thiệu về VT MALL</Typography>
            </BoxFooter>
            <BoxFooter>
              <SecurityOutlined />
              <Typography>Chính sách bảo mật</Typography>
            </BoxFooter>
            <BoxFooter>
              <QueryStatsOutlined />
              <Typography>Câu hỏi thường gặp?</Typography>
            </BoxFooter>
          </FooterItem>
          <FooterItem item xs={6} sm={6} md={3} lg={3}>
            <HeaderTypo>DỊCH VỤ VÀ HỖ TRỢ</HeaderTypo>
            <BoxFooter>
              <Room />
              <Typography>Hướng dẫn mua hàng</Typography>
            </BoxFooter>
            <BoxFooter>
              <Phone />
              <Typography>Hình thức thanh toán</Typography>
            </BoxFooter>
            <BoxFooter>
              <MessageOutlined />
              <Typography>Chính sách vận chuyển</Typography>
            </BoxFooter>
            <BoxFooter>
              <MessageOutlined />
              <Typography>Chính sách đổi trả</Typography>
            </BoxFooter>
          </FooterItem>
          <FooterItem item xs={6} sm={6} md={3} lg={3}>
            <HeaderTypo>THEO DÕI CHÚNG TÔI</HeaderTypo>
            <BoxFooter>
              <Facebook />
              <Typography color="violet">Facebook</Typography>
            </BoxFooter>
            <BoxFooter>
              <Instagram />
              <Typography color="cornsilk">Instagram</Typography>
            </BoxFooter>
          </FooterItem>
        </Grid>
      </Grid>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#131A22',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column nowrap',
        }}
      >
        <Copyright />
      </Box>
    </Box>
  );
}
