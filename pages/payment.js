import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CheckoutWizard } from '../components/common';
import { Store } from '../utils/Store';

const Payment = () => {
  const { dispatch, state } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState('');
  

  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod'));
     
    }
  }, []); 

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error('Payment method is required');
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };

  return (
    <div className="flex flex-col h-[85vh] ">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form
        onSubmit={submitHandler}
        style={{
          padding: '20px',
        }}
      >
        <Typography
          component="h5"
          variant="h5"
          sx={{ paddingTop: '2rem', paddingLeft: '1rem' }}
        >
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Paypal"
                  value="Paypal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
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
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}
              style={{ backgroundColor: 'gray' }}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </div>
  );
};

export default Payment;
