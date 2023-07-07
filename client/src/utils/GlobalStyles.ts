import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle<ModeProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Ubuntu", sans-serif;
    color: ${(props) =>
      props.mode === "dark"
        ? props.theme.colors.dark
        : props.theme.colors.light};
    background-color: ${(props) =>
      props.mode === "dark"
        ? props.theme.backgroundColor.dark
        : props.theme.backgroundColor.light};
    border-color: ${(props) =>
      props.mode === "dark"
        ? props.theme.borderColor.dark
        : props.theme.borderColor.light};
    max-width: 100vw;
    overflow-x: hidden;
  overflow-y: visible;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: ${(props) =>
      props.mode === "dark"
        ? props.theme.colors.dark
        : props.theme.colors.light};
    &:hover {
      color: ${(props) =>
        props.mode === "dark"
          ? props.theme.borderColor.darkPriColor
          : props.theme.borderColor.lightPriColor};
    }
  }
  button {
    color: ${(props) =>
      props.mode === "dark"
        ? props.theme.colors.dark
        : props.theme.colors.light};
    border-color: ${(props) =>
      props.mode === "dark"
        ? props.theme.borderColor.dark
        : props.theme.borderColor.light};
    background: transparent;
    border: 2px solid ;
    padding: .5rem 1rem;
    font-weight: 700;
    transition: all 0.2s;
    font-size: 1.025rem;
    cursor: pointer;
    &:hover {
      color: ${(props) =>
        props.mode === "dark"
          ? props.theme.borderColor.darkPriColor
          : props.theme.borderColor.lightPriColor};
    border-color: ${(props) =>
      props.mode === "dark"
        ? props.theme.borderColor.darkPriColor
        : props.theme.borderColor.lightPriColor};
    }
  }
`;

export default GlobalStyle;
