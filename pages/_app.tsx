import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { globalStyles } from '../styles/style.js';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {globalStyles}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
