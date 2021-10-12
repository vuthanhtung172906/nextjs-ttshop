import { ShoppingCart } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Link from '../../configs/mui/Link';
import { userAction } from '../../features/auth/userSlice';
import { cartAction } from '../../features/payment/cartSlice';
import logo from '../../public/logo/logo2.jpg';
import InputField from '../FormField/InputField';
import Navbar from './Navbar';
const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
  borderRadius: theme.shape.borderRadius,
  color: 'black',
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: '0px',
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputField)(({ theme }) => ({
  color: 'black',
  width: '100%',
  margin: '0px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));
interface SearchField {
  title: string;
}
export default function Header() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [opendrawer, setDrawer] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const user = useAppSelector((state) => state.user);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = () => {
    setDrawer(true);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    if (user.user.role !== 'user') {
      router.push('/admin/dashboard');
    } else {
      router.push('/user/profile');
    }
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const handleLogOut = async () => {
    console.log('Log out clicked');
    dispatch(userAction.logoutUser());
    setDrawer(false);
    setAnchorEl(null);
    router.push('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Sign Out</MenuItem>
    </Menu>
  );
  const initalValue: SearchField = {
    title: '',
  };
  const { control, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: initalValue,
  });
  const handlSubmitSeatch = (value: SearchField) => {
    const search = value.title;
    router.push(`/search?title[regex]=${search}`);
    reset(initalValue);
  };
  React.useEffect(() => {
    dispatch(cartAction.getcart());
    if (localStorage.getItem('login')) {
      dispatch(userAction.getAccessTokenFromRefreshToken());
    }
  }, [dispatch]);
  const cartlist = useAppSelector((state) => state.cart.cartlist);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#0B2156' }}>
        <Toolbar>
          <Link
            href="/"
            color="inherit"
            sx={{
              textDecoration: 'none',
              display: 'flex',
              flexFlow: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src={logo} alt="Logo picture " height="40px" width="100px" />
            <Typography fontWeight="bold">VTMALL</Typography>
          </Link>
          <Search onSubmit={handleSubmit(handlSubmitSeatch)}>
            <SearchIconWrapper type="submit">
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              name="title"
              control={control}
              label=""
              margin="none"
              size2="small"
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {user.isLogin ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <Link
                href="/auth/login"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                }}
              >
                <Typography fontSize="14px">Hello,</Typography>
                <Typography fontSize="14px" fontWeight="bold">
                  Sign In
                </Typography>
              </Link>
            )}
            <Box mx="20px">
              <Link
                href="/user/order"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                }}
              >
                <Typography fontSize="14px"> Đơn hủy,</Typography>
                <Typography fontSize="14px" fontWeight="bold">
                  Đơn hàng
                </Typography>
              </Link>
            </Box>
            <Box component={Link} href="/cart" sx={{ color: 'inherit' }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={cartlist?.length} color="error">
                  <ShoppingCart fontSize="large" />
                </Badge>
                <Typography fontWeight="bold" fontSize="">
                  Giỏ hàng
                </Typography>
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Navbar
        isAdmin={user.user.role as string}
        openNavBar={opendrawer}
        closeDrawer={closeDrawer}
        isLogin={user.isLogin}
        handleLogOut={handleLogOut}
      />
    </Box>
  );
}
