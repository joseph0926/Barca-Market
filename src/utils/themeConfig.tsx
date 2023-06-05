import { chakra, CSSReset } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
// import Head from "next/head";

export const Bar = chakra("div");

export const GlobalStyle = () => (
  <Global
    styles={css`
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
  />
);
