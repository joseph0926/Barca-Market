import Head from "next/head";

import { Provider } from "react-redux";
import store from "../store/store.js";
import Layout from "@/src/components/layouts/Layout.js";

import "@/src/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Barcelona Fan Community</title>
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
