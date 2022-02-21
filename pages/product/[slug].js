import React from 'react';
import { useRouter } from 'next/router';
import data from '../../data';

const ProductScreen = () => {
  const router = useRouter();
  console.log(router.query.slug);
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="max-h-96 max-w-5xl"
      />
    </div>
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
