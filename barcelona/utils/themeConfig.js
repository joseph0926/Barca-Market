import { extendTheme, CSSReset } from "@chakra-ui/react";

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
  },
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: props.colorMode === "dark" ? "black" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
      button: {
        backgroundColor: props.colorMode === "dark" ? "blue.700" : "red.500",
        borderColor: props.colorMode === "dark" ? "blue.700" : "red.500",
        color: "white",
        borderRadius: "md",
        border: "2px solid",
        padding: "0.5rem 1rem",
      },
      a: {
        color: props.colorMode === "dark" ? "blue.400" : "red.600",
      },
    }),
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
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
