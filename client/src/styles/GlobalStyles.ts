import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle<{
  $mode?: "dark" | "light" | string;
}>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Ubuntu", sans-serif;
    color: ${(props) =>
      props.$mode === "dark"
        ? props.theme.colors.dark
        : props.theme.colors.light};
    background-color: ${(props) =>
      props.$mode === "dark"
        ? props.theme.backgroundColor.dark
        : props.theme.backgroundColor.light};
    border-color: ${(props) =>
      props.$mode === "dark"
        ? props.theme.borderColor.dark
        : props.theme.borderColor.light};
    max-width: 100vw;
    overflow: hidden;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: ${(props) =>
      props.$mode === "dark"
        ? props.theme.colors.dark
        : props.theme.colors.light};
  }
  button {
    color: ${(props) =>
      props.$mode === "dark"
        ? props.theme.colors.dark
        : props.theme.colors.light};
    border-color: ${(props) =>
      props.$mode === "dark"
        ? props.theme.borderColor.dark
        : props.theme.borderColor.light};
  }
`;
