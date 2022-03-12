import React, { useContext, useEffect} from 'react';
import { Store } from '../../utils/Store';
import Link from 'next/link';
import { Card } from '../../components/base/Card';
import {
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
import { CheckoutWizard } from '../../components/common';
import db from '../../utils/db';
import OrderModel from '../../models/Orders';
import getStripe from '../../stripe/getStripe';
import axios from "axios"

const Order = ({order}) => {
  const router = useRouter();
  const { state, colors } = useContext(Store);
  const {
    userInfo,
  } = state;
  const cartItems = state.cart.cartItems
  
  
  const {shippingAddress, paymentMethod, orderItems, itemsPrice, taxPrice, shippingPrice,totalPrice,isPaid,paidAt,isDelivered,deliveredAt} = order
  

  useEffect(() => {
    if(!userInfo) {
      return router.push("/login")
    }
   
  },[order])
  
  const redirectToCheckout = async () => {
    // create stripe checkout
    try {
    const url = window.location.origin + "/api/checkout_sessions"
    const response = await axios.post(url, {
      items: cartItems.map((item) => {
        return {
          price:item.stripeId,
          quantity:item.quantity,
        }
      })
    })
    console.log(response)
  }catch(err) {
    console.log(err)
  }
    // const id = response.data.id;

    // // redirect to checkout 
    // const stripe = await getStripe();
    // await stripe.redirectToCheckout({sessionId:id})
  }
  
  return (
    <>
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <p className=" md:text-3xl text-lg  mt-12 mb-5 ">Order {order._id}</p>
      
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col lg:flex-[9]">
            <Card>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </ListItem>
                <ListItem>
                 Status: {isDelivered? `delivered at ${deliveredAt}`: "not delivered"}
                </ListItem>
              </List>
            </Card>
            <div style={{ marginBottom: '0.5rem' }}></div>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
                <ListItem>
                 Status: {isPaid? `paid at ${paidAt}`: "not paid"}
                </ListItem>
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
                        {orderItems.map((item) => {
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
                    onClick={redirectToCheckout}
                    className="bg-amber-400 lg:w-2/3 w-8/12  rounded-md p-1  items-center"
                  >
                    Pay with Stripe
                  </button>
                </li>
              </ul>
              
            </Card>
          </div>
        </div> 

      
    </>
  );
};

export async function getServerSideProps(context) {
  
    const {id} = context.params
    let orderFormatted;
    try {
    await db.connect();
    const order = await OrderModel.findById(id);
    orderFormatted = JSON.parse(JSON.stringify(order))
    await db.disconnect();
    } catch (err) {
      return {
        redirect: {
          destination: '/',
        },
      }
    }
    return {
        props: {
          order: orderFormatted,
        }
    }
}

export default Order;
