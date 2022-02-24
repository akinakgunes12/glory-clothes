import { ProductCardList } from '../components';
import db from '../utils/db';
import Product from '../models/Product';

export default function Home(props) {
  const { products } = props;
  console.log(products);
  return (
    <div>
      <h1>Products</h1>
      <ProductCardList />
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
