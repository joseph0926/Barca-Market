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
      root: {
        "--text-dark": "#000",
        "--text-light": "#fff",
        "--text-grey": "#adbdcc",
        "--body-font": "'Roboto', sans-serif",
        "--heading-font": "'Anek Telugu', sans-serif",
        "--h1-size": "94px",
        "--h1-height": "108px",
        "--h2-size": "50px",
        "--h2-height": "75px",
        "--h3-size": "40px",
        "--h4-size": "32px",
        "--h5-size": "28px",
        "--h6-size": "22px",
        "--subtitle-size": "17px",
        "--subtitle-height": "26px",
        "--p-size": "18px",
        "--p-height": "26px",
        "--secondary-text-size": "14px",
        "--secondary-text-height": "18px",
        "--button-size": "16px",
        "--spacing-sm": "8px",
        "--spacing-md": "16px",
        "--spacing-lg": "32px",
        "--spacing-xl": "64px",
        "--standard-width": "1144px",
        "--purple-1": "#6962f7",
        "--purple-2": "#7000ff",
        "--blue-1": "#00d4ff",
        "--primary-accent": "#0a2540",
        "--primary-button-hover": "#6d7a88",
        "--bg-white": "#fff",
        "--bg-light": "#f7f9fc",
        "--standard-border-radius": "20px",
        "--standard-box-shadow": "0px 2px 40px rgba(0, 0, 0, 0.15)",
        "--primary-gradient": "linear-gradient(101.33deg, #08209a 0.76%, #6563ff 33.33%, #36c5f0 76.92%, #83e2ff 96.96%)",
      },
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
        primary: {
          bg: "blue.700",
          borderColor: "blue.700",
          color: "white",
          borderRadius: "md",
          border: "2px solid",
          padding: "0.5rem 1rem",
        },
        navbarButton: {
          bg: "rgba(250, 250, 250, 0.25)",
          "&:hover": {
            bg: "rgba(250, 250, 250, 0.5)",
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
