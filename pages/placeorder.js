import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import Link from 'next/link';
import { Card } from '../components/base/Card';
import {
  CircularProgress,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { CheckoutWizard } from '../components/common';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

const Placeorder = () => {
  const router = useRouter();
  const { state, dispatch, colors } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    console.log(paymentMethod);
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      // toast.error(err);
    }
  };
  return (
    <>
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <p className=" md:text-4xl text-lg  mt-12 mb-5 ">Place Order</p>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col lg:flex-[9]">
            <Card>
              <List>
                <ListItem>
                  <Typography style={{ fontWeight: 'bold' }}>
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </ListItem>
              </List>
            </Card>
            <div style={{ marginBottom: '0.5rem' }}></div>
            <Card>
              <List>
                <ListItem>
                  <Typography style={{ fontWeight: 'bold' }}>
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
              </List>
            </Card>
            <div style={{ marginBottom: '0.5rem' }}></div>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{ fontSize: '20px', color: colors.text }}
                          >
                            Image
                          </TableCell>
                          <TableCell
                            style={{ fontSize: '20px', color: colors.text }}
                          >
                            Name
                          </TableCell>
                          <TableCell
                            style={{ fontSize: '20px', color: colors.text }}
                            align="left"
                          >
                            Quantity
                          </TableCell>
                          <TableCell
                            style={{ fontSize: '20px', color: colors.text }}
                            align="left"
                          >
                            Price
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => {
                          return (
                            <TableRow key={item._id}>
                              <TableCell>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width={70}
                                  height={60}
                                />
                              </TableCell>
                              <TableCell sx={{ color: colors.text }}>
                                <Link href={`/product/${item.slug}`} passHref>
                                  <div className="cursor-pointer hover:text-green-500	text-lg">
                                    {' '}
                                    {item.name}
                                  </div>
                                </Link>
                              </TableCell>
                              <TableCell align="right">
                                <Typography
                                  textAlign="left"
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    paddingLeft: '2rem',
                                  }}
                                >
                                  {item.quantity}
                                </Typography>
                              </TableCell>
                              <TableCell
                                style={{ fontSize: '20px' }}
                                align="left"
                                sx={{ color: colors.text }}
                              >
                                {' '}
                                $ {item.price}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </div>
          <div className="flex lg:flex-[3]  mt-3 mb-5  m-auto text-xl">
            <Card>
              <ul className="w-full p-3 ">
                <li className=" pb-3 pt-3 pl-10 pr-10  font-bold text-center">
                  Order Summary
                </li>
                <li className=" text-center pb-3">
                  Items:&nbsp;$ {itemsPrice}
                </li>
                <li className=" text-center pb-3">Tax:&nbsp;$ {taxPrice}</li>
                <li className=" text-center pb-3">
                  Shipping:&nbsp;$ {shippingPrice}
                </li>
                <li className=" text-center pb-3 font-bold ">
                  Total:&nbsp;$ {totalPrice}
                </li>
                <li className="flex justify-center lg:flex-[6] flex-[12]">
                  <button
                    onClick={placeOrderHandler}
                    className="bg-amber-400 lg:w-2/3 w-8/12  rounded-md p-1  items-center"
                  >
                    {loading === true ? <CircularProgress /> : 'Place Order'}
                  </button>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Placeorder;