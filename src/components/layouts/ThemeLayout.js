import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { loadInitialState, onMode } from "@/src/features/ui/uiSlice.js";
import { GlobalStyle } from "@/src/utils/themeConfig.js";
import Layout from "./Layout.js";

const ThemeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.ui);

  const darkPriText = "#E82727";
  const lightPriText = "#0099FF";

  const theme = useMemo(
    () =>
      extendTheme({
        config: {
          initialColorMode: mode,
          useSystemColorMode: false,
        },
        colors: {
          dark: {
            pri: "#1A202C",
            sec: "#718096",
          },
          darkPriText,
          lightPriText,
          primaryGradient: "linear-gradient(101.33deg, #08209a 0.76%, #6563ff 33.33%, #36c5f0 76.92%, #83e2ff 96.96%)",
        },
        shadows: {
          standardBox: "0px 2px 40px rgba(0, 0, 0, 0.15)",
        },
        styles: {
          global: (props) => ({
            body: {
              backgroundColor: mode === "dark" ? theme.colors.dark.pri : theme.colors.white,
              color: mode === "dark" ? theme.colors.white : theme.colors.black,
            },
            button: {
              borderColor: mode === "dark" ? theme.colors.blue[700] : theme.colors.red[500],
              color: mode === "dark" ? theme.colors.white : theme.colors.black,
            },
            a: {
              color: mode === "dark" ? darkPriText : lightPriText,
            },
          }),
        },
        components: {
          Button: {
            baseStyle: (props) => ({
              border: "2px solid",
              borderColor: mode === "dark" ? darkPriText : lightPriText,
              transition: "all 0.2s",
            }),
            variants: {
              solid: {
                _hover: {
                  bg: mode === "dark" ? darkPriText : lightPriText,
                  color: "white",
                },
              },
              outline: {
                _hover: {
                  borderColor: mode === "dark" ? darkPriText : lightPriText,
                  color: "red.500",
                },
              },
            },
            Bar: {
              baseStyle: (props) => ({
                height: "4px",
                bg: mode === "dark" ? "white" : "black",
                margin: "3px",
              }),
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    dispatch(loadInitialState());

    if (mode) {
      dispatch(onMode(mode));
    } else {
      localStorage.setItem("theme", mode);
    }
  }, [mode, dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </ChakraProvider>
  );
};

export default ThemeLayout;
