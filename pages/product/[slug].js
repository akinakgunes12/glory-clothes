import React, { useContext } from 'react';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Card } from '../../components/base/Card';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

const ProductScreen = (props) => {
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const product = props.product;

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
    const checkProductInCart = state.cart.cartItems.some(
      (item) => product.slug === item.slug
    );
    console.log(checkProductInCart);
    if (checkProductInCart) {
      const targetIndex = state.cart.cartItems.findIndex(
        (item) => product.slug === item.slug
      );
      const targetItem = state.cart.cartItems[targetIndex];
      console.log(targetItem.countInStock, targetItem.quantity);

      const stockCheck = targetItem.countInStock - targetItem.quantity > 0;
      console.log(stockCheck);
      if (!stockCheck) {
        return window.alert('Sorry.Product is out of stock');
      }

      const newQuantity = state.cart.cartItems[targetIndex].quantity + 1;

      dispatch({
        type: 'INCREASE_QUANTITY_A_CART_ITEM',
        payload: { newQuantity: newQuantity, slug: product.slug },
      });
      router.push('/cart');
    }

    if (!checkProductInCart) {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity: 1 },
      });
      router.push('/cart');
    }
  };

  return (
    <>
      {/*Back Button */}
      <div className="cursor-pointer">
        <Link href="/" passHref>
          <p className="mb-3 mt-3 hover:underline ">
            {' '}
            <KeyboardBackspaceIcon /> back to products
          </p>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {/*LeftSide Image Part */}
        <div className="flex-[6] flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[85vh] lg:h-[75vh] "
          />
        </div>

        {/*RightSide */}
        <div className="flex-[3]  ">
          {/**Product detail **/}
          <ul>
            <li className="text-lg pb-2 font-bold  ">{product.name}</li>
            <li className="pb-2">Category: {product.category}</li>
            <li className="pb-2 ">Brand: {product.brand}</li>
            <li className="pb-2 ">
              Rating: {product.rating} stars ({product.numReviews} reviews)
            </li>
            <li className="pb-2 ">
              Description: <span>{product.description}</span>
            </li>
          </ul>
        </div>

        {/**Card detail and button **/}
        <div className="flex-[3] ">
          <Card className=" flex-col ">
            <ul>
              <li className="font-bold mt-5 text-center">
                Price &nbsp; &nbsp; ${product.price}
              </li>
              <li className="font-bold mt-1 text-center">
                Status &nbsp;
                {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
              </li>
            </ul>
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-md text-black bg-amber-400 lg:w-3/4 w-2/4 mt-3 mb-3 p-2 hover:bg-amber-500"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default ProductScreen;

export async function getServerSideProps(context) {
  // console.log('buradayım context =>', context);
  const { params } = context;
  // console.log('buradayım =>', params);
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug });
  const obj = JSON.parse(JSON.stringify(product));
  await db.disconnect();
  return {
    props: {
      product: obj,
    },
  };
}

// export async function getServerSideProps(context) {
//   console.log(context);

//   const response = await fetch('http://localhost:3000/api/allProducts');
//   const data = await response.json();

//   const { slug } = context.params;
//   const product = data.products.find((a) => a.slug === slug);

//   return {
//     props: {
//       product: product,
//     }, // will be passed to the page component as props
//   };
// }
