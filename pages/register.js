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

const Register = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { colors } = useContext(Store);
  const [spinner, setSpinner] = useState(false);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't matched");
      return;
    }

   
    setSpinner(true);
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });

     

      Cookies.set('userInfo', data);
      router.push(redirect || '/');
      toast.success('success login');
    } catch (err) {
      setSpinner(false);
      toast.error(err.response.data.message || err.message);
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
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 4,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: 'text' }}
                  style={{ color: 'red' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name is not valid'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

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
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? (errors.email.type = 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required')
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
            <Controller
              name="confirmPassword"
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
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: 'password' }}
                  style={{ color: 'red' }}
                  // onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Confirm Password length is not more than 5'
                        : 'Confirm Password is required'
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
              {spinner ? <CircularProgress /> : 'Register'}
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <div className="text-yellow-600 hover:cursor-pointer hover:underline">
              <Link href={`/login?redirect=${redirect || '/'}`} passHref>
                Login
              </Link>
            </div>
          </ListItem>
        </List>
      </form>
    </div>
  );
};

export default Register;
