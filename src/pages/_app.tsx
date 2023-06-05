import { AppProps } from "next/app";
import Head from "next/head";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../store/store.js";
import ThemeLayout from "../components/layouts/ThemeLayout.js";

import "@/src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const isExempt = Component.displayName === "Sign" || Component.name === "Sign";

  return (
    <>
      <Head>
        <title>Barcelona Fan Community</title>
      </Head>
      <SessionProvider session={pageProps}>
        <Provider store={store}>
          <ThemeLayout isExempt={isExempt}>
            <Component {...pageProps} />
          </ThemeLayout>
        </Provider>
      </SessionProvider>
    </>
  );
}
