import Head from "next/head";

import { Provider } from "react-redux";
import { ChakraProvider, ColorModeProvider, localStorageManager } from "@chakra-ui/react";
import { GlobalStyle, theme } from "../utils/themeConfig.js";
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
        <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
          <GlobalStyle />
          <ColorModeProvider options={{ initialColorMode: theme.config.initialColorMode }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ColorModeProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}
