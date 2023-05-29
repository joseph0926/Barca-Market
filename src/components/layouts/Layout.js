import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import Loading from "./Loading.js";
import Navbar from "./Navbar.js";
import { loadInitialState, onMode } from "@/src/features/ui/uiSlice.js";
import { GlobalStyle } from "@/src/utils/themeConfig.js";

const Layout = ({ children }) => {
  const dispatchFn = useDispatch();
  const { mode } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatchFn(loadInitialState());

    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      dispatchFn(onMode(localTheme));
    } else {
      localStorage.setItem("theme", mode);
    }
  }, [mode, dispatchFn]);

  const theme = extendTheme({
    config: {
      initialColorMode: mode,
      useSystemColorMode: false,
    },
    colors: {
      dark: {
        pri: "#1A202C",
        sec: "#718096",
      },
      darkPriText: "#E82727",
      lightPriText: "#0099FF",
      primaryGradient: "linear-gradient(101.33deg, #08209a 0.76%, #6563ff 33.33%, #36c5f0 76.92%, #83e2ff 96.96%)",
    },
    shadows: {
      standardBox: "0px 2px 40px rgba(0, 0, 0, 0.15)",
    },
    styles: {
      global: (props) => ({
        body: {
          backgroundColor: props.colorMode === "dark" ? "black" : "white",
          color: props.colorMode === "dark" ? "white" : "black",
        },
        button: {
          borderColor: props.colorMode === "dark" ? "blue.700" : "red.500",
          color: "white",
        },
        a: {
          color: props.colorMode === "dark" ? props.theme.colors.darkPriText : props.theme.colors.lightPriText,
        },
      }),
    },
    components: {
      Button: {
        baseStyle: (props) => ({
          border: "1px solid",
          borderColor: props.colorMode === "dark" ? props.theme.colors.darkPriText : props.theme.colors.lightPriText,
          transition: "all 0.2s",
        }),
      },
      Bar: {
        baseStyle: (props) => ({
          height: "4px",
          bg: props.colorMode === "dark" ? "white" : "black",
          margin: "3px",
        }),
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <Box h="100vh" w="100vw">
        <Box zIndex={10} w="100%">
          <Navbar />
        </Box>
        <Box w="100%" mt={4}>
          <Loading display={false} />
          <main>{children}</main>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Layout;
