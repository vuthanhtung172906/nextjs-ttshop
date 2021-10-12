import { Add, CategoryOutlined, Dashboard, Label, ListAlt, Person, ShoppingCart } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import * as React from 'react';
import Link from '../../configs/mui/Link';

const ListItemActive = styled(Link)`
  &.active > div {
    background-color: #e0e0e0;
  }
`;
export default function AdminSidebar() {
  const router = useRouter();
  return (
    <List sx={{ maxWidth: '595px' }}>
      <Paper sx={{ paddingY: '10px' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>ADMIN MANAGER</Typography>
        <ListItem>
          <ListItemActive href="/admin/dashboard" className={router.pathname === '/admin/dashboard' ? 'active' : ''}>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItemActive>
        </ListItem>
        <ListItem>
          <ListItemActive href="/admin/orderlist" className={router.pathname === '/admin/orderlist' ? 'active' : ''}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText>Đơn hàng</ListItemText>
            </ListItemButton>
          </ListItemActive>
        </ListItem>
        <ListItem>
          <ListItemActive href="/admin/userlist" className={router.pathname === '/admin/userlist' ? 'active' : ''}>
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>Khách hàng</ListItemText>
            </ListItemButton>
          </ListItemActive>
        </ListItem>
        <ListItem>
          <ListItemActive
            href="/admin/productlist"
            className={router.pathname === '/admin/productlist' ? 'active' : ''}
          >
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText>Danh sách sản phẩm</ListItemText>
            </ListItemButton>
          </ListItemActive>
        </ListItem>
        <ListItem>
          <ListItemActive href="/admin/addedit" className={router.pathname === '/admin/addedit' ? 'active' : ''}>
            <ListItemButton>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText>Thêm Sản Phẩm</ListItemText>
            </ListItemButton>
          </ListItemActive>
        </ListItem>
        <ListItem>
          <ListItemActive href="/admin/category" className={router.pathname === '/admin/category' ? 'active' : ''}>
            <ListItemButton>
              <ListItemIcon>
                <CategoryOutlined />
              </ListItemIcon>
              <ListItemText>Danh mục sản phầm</ListItemText>
            </ListItemButton>
          </ListItemActive>
        </ListItem>
      </Paper>
    </List>
  );
}
