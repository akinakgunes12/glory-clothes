import React, { useContext } from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Switch } from '@mui/material';
import Link from 'next/link';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({ title, description, children }) {
  const { state, dispatch, colors } = useContext(Store);
  const { darkMode } = state;

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
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
            <Link href="/login"> Cart</Link>
            <Link href="/card">Login</Link>
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
