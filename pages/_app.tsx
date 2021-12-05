import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { globalStyles } from '../styles/style.js';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>내손내맵</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {globalStyles}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
