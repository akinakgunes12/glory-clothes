import React, { useContext, useEffect, useState } from 'react';
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import { Store } from '../utils/Store';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { colors } = useContext(Store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      console.log(data);
      Cookies.set('userInfo', data);
      router.push(redirect || '/');

      alert('success login');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <div className=" items-center flex justify-center h-[85vh]">
      <form
        onSubmit={submitHandler}
        style={{
          backgroundColor: colors.backCardColor,
          minWidth: '400px',
          padding: '20px',
        }}
      >
        <Typography
          component="h4"
          variant="h4"
          sx={{ paddingTop: '2rem', paddingLeft: '1rem' }}
        >
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              style={{ color: 'red' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              style={{
                color: 'black',
                width: 'inherit',
                backgroundColor: '#ffcf33',
              }}
            >
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <div className="text-yellow-600 hover:cursor-pointer hover:underline">
              <Link href="/register" passHref>
                Register
              </Link>
            </div>
          </ListItem>
        </List>
      </form>
    </div>
  );
};

export default Login;
