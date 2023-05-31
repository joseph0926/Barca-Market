import { CSSReset, chakra } from "@chakra-ui/react";

export const Bar = chakra("div");

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
