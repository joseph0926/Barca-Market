import { extendTheme, CSSReset, defineStyleConfig } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    dark: {
      pri: "#1A202C",
      sec: "#718096",
    },
    gray: {
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    blue: {
      50: "#E6F6FF",
      100: "#BAE3FF",
      200: "#7CC4FA",
      300: "#47A3F3",
      400: "#2186EB",
      500: "#0967D2",
      600: "#0552B5",
      700: "#03449E",
      800: "#01337D",
      900: "#002159",
    },
    red: {
      50: "#FFE3E3",
      100: "#FFBDBD",
      200: "#FF8C8C",
      300: "#FF5C5C",
      400: "#FF3232",
      500: "#F71414",
      600: "#D30C0C",
      700: "#AF0A0A",
      800: "#8C0808",
      900: "#6C0606",
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
        color: props.colorMode === "dark" ? theme.colors.darkPriText : theme.colors.lightPriText,
      },
    }),
  },
  components: {
    Button: {
      baseStyle: (props) => ({
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "darkPriText" : "lightPriText",
        transition: "all 0.2s",
      }),
    },
  },
});

export const GlobalStyle = () => {
  <>
    <CSSReset />
    {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: "Ubuntu", sans-serif;
        }
        ul {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
      `}
  </>;
};
