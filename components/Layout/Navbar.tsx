import { Label, Login, Logout, Person, ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import Link from '../../configs/mui/Link';
const ItemList = styled(Link)`
  margin: auto 10px;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface NavProps {
  openNavBar: boolean;
  closeDrawer: () => void;
  isLogin: boolean;
  handleLogOut: () => void;
  isAdmin: string;
}
export default function Navbar({ openNavBar, closeDrawer, isLogin, handleLogOut, isAdmin }: NavProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          minHeight: '40px',
          backgroundColor: '#0B2257',
          color: '#eee',
          padding: '0px 45px',
          pb: '10px',
        }}
      >
        <ItemList href="/search?">
          <MenuIcon />
          Tất cả
        </ItemList>
        <ItemList href="/search?-sold">Nổi bật</ItemList>
        <ItemList href="/about">About</ItemList>
      </Box>

      <Drawer anchor="left" open={openNavBar} onClose={closeDrawer}>
        <List>
          <ListItem
            sx={{ display: isLogin ? 'none' : 'flex' }}
            component={Link}
            href="/auth/login"
            onClick={closeDrawer}
          >
            <ListItemButton>
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText>Login/SignIn</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{ display: isLogin ? 'flex' : 'none' }}
            component={Link}
            href={isAdmin !== 'user' ? '/admin/dashboard' : '/user/profile'}
            onClick={closeDrawer}
          >
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} href="/cart" onClick={closeDrawer}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText>Giỏ Hàng</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} href="/search?" onClick={closeDrawer}>
            <ListItemButton>
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText>Tất cả</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} href="/search?-sold" onClick={closeDrawer}>
            <ListItemButton>
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText>Nổi bật</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} href="/about" onClick={closeDrawer}>
            <ListItemButton>
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText>Dịch vụ khách hàng</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ display: isLogin ? 'flex' : 'none' }} onClick={closeDrawer}>
            <ListItemButton onClick={handleLogOut}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
