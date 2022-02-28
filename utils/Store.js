import { isOptionGroup } from '@mui/base';
import Cookies from 'js-cookie';
import { createContext, useEffect, useReducer, useState } from 'react';

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

    case 'INCREASE_QUANTITY_A_CART_ITEM': {
      const newQuantity = action.payload.newQuantity;
      const slug = action.payload.slug;

      const newCardItems = [...state.cart.cartItems];
      const targetIndex = newCardItems.findIndex((item) => item.slug === slug);
      newCardItems[targetIndex].quantity = newQuantity;

      const stockCheck =
        newCardItems[targetIndex].quantity <=
        newCardItems[targetIndex].countInStock;

      if (!stockCheck) {
        return state;
      }

      return { ...state, cart: { ...state.cart, cartItems: newCardItems } }; // all state copy
    }

    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const cartItems = [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};
const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [colors, setColors] = useState({
    text: 'white',
    backgroundColor: 'black',
    backCardColor: 'red',
  });

  useEffect(() => {
    setColors({
      text: state.darkMode ? 'white' : 'black',
      backgroundColor: state.darkMode ? 'black' : 'white',
      backCardColor: state.darkMode ? '#333232' : 'white',
    });
  }, [state]);

  const value = { state, dispatch, colors };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
