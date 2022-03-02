import Layout from '../components/Layout';
import '../styles/globals.css';
import StoreProvider from '../utils/Store';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
