import React from 'react';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Layout from '../../components/Layout';
import Link from 'next/link';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Card } from '../../components/base/Card';

const ProductScreen = () => {
  const router = useRouter();

  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
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
        <div className="flex-[6]">
          <img
            src={product.image}
            alt={product.name}
            className="w-[85vh] lg:h-[80vh] "
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
                className="rounded-md text-black bg-amber-400 lg:w-3/4 w-2/4 mt-3 mb-3 p-2 hover:bg-amber-500   "
              >
                Add to cart
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
export default ProductScreen;

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
