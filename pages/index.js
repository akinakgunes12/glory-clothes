import Layout from '../components/Layout';
import { ProductCardList } from '../components';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <ProductCardList />
      </div>
    </Layout>
  );
}
