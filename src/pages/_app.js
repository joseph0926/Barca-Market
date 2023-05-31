import Head from "next/head";

import { Provider } from "react-redux";
import store from "../store/store.js";
import ThemeLayout from "../components/layouts/ThemeLayout.js";

import "@/src/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Barcelona Fan Community</title>
      </Head>
      <Provider store={store}>
        <ThemeLayout>
          <Component {...pageProps} />
        </ThemeLayout>
      </Provider>
    </>
  );
}
