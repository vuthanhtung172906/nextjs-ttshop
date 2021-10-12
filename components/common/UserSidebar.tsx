import { Label, Person } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import * as React from 'react';
import Link from '../../configs/mui/Link';

export interface UserSidebarProps {}
const ListItemActive = styled(Link)`
  &.active > div {
    background-color: #e0e0e0;
  }
`;
export default function UserSidebar(props: UserSidebarProps) {
  const router = useRouter();
  return (
    <List sx={{ maxWidth: '595px', backgroundColor: '#D1FAE5' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>YOUR PROFILE</Typography>
      <ListItem>
        <ListItemActive href="/user/profile" className={router.pathname === '/user/profile' ? 'active' : ''}>
          <ListItemButton>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Thông tin </ListItemText>
          </ListItemButton>
        </ListItemActive>
      </ListItem>
      <ListItem>
        <ListItemActive href="/user/order" className={router.pathname === '/user/order' ? 'active' : ''}>
          <ListItemButton>
            <ListItemIcon>
              <Label />
            </ListItemIcon>
            <ListItemText>Đơn hàng</ListItemText>
          </ListItemButton>
        </ListItemActive>
      </ListItem>
    </List>
  );
}
