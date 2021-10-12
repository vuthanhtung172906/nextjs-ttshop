import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import AdminSidebar from '../../components/common/AdminSiderbar';

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <Box display="flex" padding="10px" sx={{ backgroundColor: '#F3F4F6' }}>
      <AdminSidebar />
      <Paper sx={{ flex: '1', margin: '8px' }}>ABC</Paper>
    </Box>
  );
}
