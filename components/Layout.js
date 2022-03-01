import React, { useContext, useState } from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Badge,
  Button,
  Container,
  Menu,
  MenuItem,
  Switch,
} from '@mui/material';
import Link from 'next/link';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch, colors } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };

  return (
    <div
      style={{ color: colors.text, backgroundColor: colors.backgroundColor }}
    >
      <Head>
        <title>{title ? `${title} - Glory Fashion` : 'Glory Clothes'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#263238' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/** Logo **/}
          <Link href="/">
            <a className="no-underline font-bold text-[1.5rem] ">
              Glory Fashion
            </a>
          </Link>

          {/** Nav Links **/}
          <div className="flex gap-5 items-center">
            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}
            ></Switch>
            <Link href="/cart">
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  Cart
                </Badge>
              ) : (
                'Cart'
              )}
            </Link>
            {userInfo ? (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={loginClickHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, '/order-history')}
                  >
                    Order Hisotry
                  </MenuItem>
                  {userInfo.isAdmin && (
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/admin/dashboard')
                      }
                    >
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Container sx={{ minHeight: '85vh' }}>{children}</Container>
      <footer>
        <Typography align="center" sx={{ fontWeight: 'bold' }}>
          All rights reserved. Glory Fashion
        </Typography>
      </footer>
    </div>
  );
}
