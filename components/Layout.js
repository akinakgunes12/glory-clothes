import React from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Glory Clothes</title>
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
          <div className="flex gap-4">
            <Link href="/login"> Cart</Link>
            <Link href="/card">Login</Link>
          </div>
        </Toolbar>
      </AppBar>

      <Container sx={{ minHeight: '80vh' }}>{children}</Container>
      <footer>
        <Typography align="center" sx={{ fontWeight: 'bold' }}>
          All rights reserved. Glory Fashion
        </Typography>
      </footer>
    </div>
  );
}
