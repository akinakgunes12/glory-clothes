import Cookies from 'js-cookie';
import { createContext, useEffect, useReducer, useState } from 'react';

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : null,
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
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
      console.log(newCardItems);
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
    case 'CART_DELETE_ITEM': {
      const slug = action.payload.slug;
      const existCardItems = [...state.cart.cartItems];
      const targetItem = existCardItems.find((item) => item.slug === slug);
      const newCartItems = existCardItems.filter((item) => {
        return item.slug !== targetItem.slug;
      });
      Cookies.set('cartItems', JSON.stringify(newCartItems));
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } };
    }
    case 'USER_LOGIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      Cookies.remove('userInfo');
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    }
    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
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
      backCartColor: state.darkMode ? 'black' : 'gray',
    });
  }, [state.darkMode]);

  const value = { state, dispatch, colors };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
