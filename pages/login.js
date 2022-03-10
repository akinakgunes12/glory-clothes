import React, { useContext, useEffect, useState } from 'react';
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import { Store } from '../utils/Store';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { colors } = useContext(Store);
  const [spinner, setSpinner] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    setSpinner(true);
    try {
      const { data } = await axios.post('/api/users/login', {
        email: email,
        password: password,
      });
    
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      // spinner kapa
      setSpinner(false);
      toast.success('You succesfully logged in.');
      router.push(redirect || '/');
    } catch (err) {
      setSpinner(false);

      //spinner kapa
      toast.error(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <div className=" items-center flex justify-center h-[85vh]">
      <form
        onSubmit={handleSubmit(submitHandler)}
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
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  style={{ color: 'red' }}
                  // onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  style={{ color: 'red' }}
                  // onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is not more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
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
              {spinner ? <CircularProgress /> : 'Login'}
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <div className="text-yellow-600 hover:cursor-pointer hover:underline">
              <Link href={`/register?redirect=${redirect || '/'}`} passHref>
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
