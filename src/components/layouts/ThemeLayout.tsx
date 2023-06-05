import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { loadInitialState } from "@/src/features/ui/uiSlice";
import Layout from "./Layout";
import { RootState } from "@/src/store/store";
import { BoxProps } from "@/src/models/global";

const ThemeLayout = ({ children, isExempt }: BoxProps): JSX.Element => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.ui);

  const darkPriText = "#E82727";
  const lightPriText = "#0099FF";

  const theme = useMemo(
    () =>
      extendTheme({
        config: {
          initialColorMode: mode,
          useSystemColorMode: false,
        },
        global: {
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
          body: {
            fontFamily: "Ubuntu, sans-serif",
          },
          ul: {
            listStyle: "none",
          },
          a: {
            textDecoration: "none",
          },
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
              transition: "all 0.5s",
            }),
            variants: {
              solid: {
                _hover: {
                  bg: mode === "dark" ? darkPriText : lightPriText,
                  color: mode === "dark" ? "#fff" : "#000",
                },
              },
              outline: {
                _hover: {
                  borderColor: mode === "dark" ? darkPriText : lightPriText,
                  color: mode === "dark" ? "#fff" : "#000",
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
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      {isExempt ? children : <Layout>{children}</Layout>}
    </ChakraProvider>
  );
};

export default ThemeLayout;
