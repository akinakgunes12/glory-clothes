import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import Link from 'next/Link';
import { Card } from '../components/base/Card';

import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';

const CartScreen = () => {
  const router = useRouter();
  const { state, dispatch, colors } = useContext(Store);
  const cartItems = state.cart.cartItems;

  const changeQuantityHandler = (e, slug) => {
    const newQuantity = e.target.value;
    console.log(slug);

    dispatch({
      type: 'INCREASE_QUANTITY_A_CART_ITEM',
      payload: { newQuantity: newQuantity, slug: slug },
    });
  };

  const deleteCartHandler = (slug) => {
    dispatch({
      type: 'CART_DELETE_ITEM',
      payload: { slug },
    });
  };

  const checkoutHandler = () => {
    router.push('/shipping');
  };

  return (
    <>
      <p className=" md:text-4xl text-2xl  mt-10 mb-5 ">Shopping Cart</p>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col  gap-10 ">
          <div className="flex lg:flex-[9] justify-center">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: '20px', color: colors.text }}>
                      Image
                    </TableCell>
                    <TableCell style={{ fontSize: '20px', color: colors.text }}>
                      Name
                    </TableCell>
                    <TableCell
                      style={{ fontSize: '20px', color: colors.text }}
                      align="right"
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      style={{ fontSize: '20px', color: colors.text }}
                      align="right"
                    >
                      Price
                    </TableCell>
                    <TableCell
                      style={{ fontSize: '20px', color: colors.text }}
                      align="right"
                    >
                      Action
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
                          <Select
                            value={item.quantity}
                            sx={{
                              color: colors.text,
                              backgroundColor: colors.backCardColor,
                            }}
                            onChange={(e) => {
                              changeQuantityHandler(e, item.slug);
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => {
                              return (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </TableCell>
                        <TableCell
                          style={{ fontSize: '20px' }}
                          align="right"
                          sx={{ color: colors.text }}
                        >
                          {' '}
                          $ {item.price}
                        </TableCell>
                        <TableCell align="right" sx={{ color: colors.text }}>
                          <Button
                            onClick={() => {
                              deleteCartHandler(item.slug);
                            }}
                            style={{
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex lg:flex-[3] w-1/2 m-auto  justify-center  font-bold text-xl">
            <Card>
              <ul className="w-full p-3">
                <li className=" pb-3 pt-3 pl-10 pr-10 text-center">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items){' '}
                </li>
                <li className=" text-center pb-3">
                  $ {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </li>
                <li className="flex justify-center">
                  <button
                    className="bg-amber-400 w-2/3 rounded-md p-1  items-center"
                    onClick={checkoutHandler}
                  >
                    Check out
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

export default CartScreen;
