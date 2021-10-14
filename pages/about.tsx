import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useAppDispatch } from '../app/hooks';
import Layout from '../components/Layout';
import Copyright from '../configs/mui/Copyright';
import ProTip from '../configs/mui/ProTip';
import { userAction } from '../features/auth/userSlice';

export default function About() {
  const dispatch = useAppDispatch();
  const getAccessToken = async () => {
    try {
      // const res = await axios.post('http://localhost:5000/api/refreshtoken');
      // console.log({ res });
      dispatch(userAction.getAccessTokenFromRefreshToken());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5-beta with TypeScript example
          </Typography>
          <Button variant="contained" onClick={getAccessToken}>
            Get refreshtoken
          </Button>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
}
