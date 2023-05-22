import "@/styles/globals.css";
import { ChakraProvider, ColorModeScript, localStorageManager } from "@chakra-ui/react";
import { GlobalStyle, theme } from "../utils/themeConfig.js";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
      <GlobalStyle />
      <ColorModeProvider options={{ initialColorMode: theme.config.initialColorMode }}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
