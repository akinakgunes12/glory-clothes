import Product from '../models/Product';
import db from '../utils/db';
import { ProductCardList } from '../components/common/ProductCardList';

export default function Home({ products }) {
  return (
    <div>
      <h1>Products</h1>
      <ProductCardList products={products} />
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({});
  const obj = JSON.parse(JSON.stringify(products));
  await db.disconnect();
  return {
    props: {
      products: obj,
    },
  };
}
