import Head from "next/head";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "../store/store";
import ThemeLayout from "../components/layouts/ThemeLayout";

import "react-toastify/dist/ReactToastify.css";
import "@/src/styles/globals.css";

export default function App({ Component, pageProps }) {
  const isExempt =
    Component.displayName === "Sign" || Component.name === "Sign";

  return (
    <>
      <Head>
        <title>Barcelona Fan Community</title>
      </Head>
      <SessionProvider session={pageProps}>
        <Provider store={store}>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
          <ThemeLayout isExempt={isExempt}>
            <Component {...pageProps} />
          </ThemeLayout>
        </Provider>
      </SessionProvider>
    </>
  );
}
