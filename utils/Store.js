import Cookies from 'js-cookie';
import { createContext, useEffect, useReducer, useState } from 'react';

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
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
  console.log(state);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
