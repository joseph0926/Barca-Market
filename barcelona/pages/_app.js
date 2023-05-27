import "@/styles/globals.css";
import { ChakraProvider, ColorModeProvider, localStorageManager } from "@chakra-ui/react";
import { GlobalStyle, theme } from "../utils/themeConfig.js";
import Layout from "@/components/layouts/Layout.js";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
      <GlobalStyle />
      <ColorModeProvider options={{ initialColorMode: theme.config.initialColorMode }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
