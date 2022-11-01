import type { AppProps } from "next/app";
import Layout from "../src/components/Layout";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { globalStyles } from "../src/styles/globalStyles";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>내손내맵</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        {globalStyles}
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </Layout>
    </>
  );
};

export default MyApp;
