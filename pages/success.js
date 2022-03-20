import { useContext, useEffect } from 'react';
import { shootFireworks } from '../utils/motion';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Success = () => {
  const {dispatch} = useContext(Store)

  useEffect(() => {
      shootFireworks();
      dispatch({type:"CART_CLEAR"})
      Cookies.remove('cartItems');
  }, []);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
    <div className="cursor-pointer">
    <Link href="/" passHref>
      <a className="mb-3 mt-3 hover:underline ">
        {' '}
        <KeyboardBackspaceIcon /> back to products
      </a>
    </Link>
    </div>
        <div className="py-4 px-8 rounded-md bg-gray-100 max-w-lg mx-auto">
          <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            <span>Thanks for your order!</span>
          </h2>
          <p className="text-lg mt-3">Check your email</p>
        </div>
    </div>
  );
};

export default Success;


