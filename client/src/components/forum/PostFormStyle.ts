import styled from "styled-components";

export const PostFormWrapper = styled.form<ModeProps>`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  .input {
    display: flex;
    justify-content: space-between;
    flex: 3;
  }
  textarea {
    width: 95%;
    height: 100%;
    background: ${(props) =>
      props.mode === "dark"
        ? props.theme.backgroundColor.dark
        : props.theme.backgroundColor.light};
    border: 2px solid
      ${(props) =>
        props.mode === "dark"
          ? props.theme.borderColor.dark
          : props.theme.borderColor.light};
    color: ${(props) =>
      props.mode === "dark"
        ? props.theme.colors.dark
        : props.theme.colors.light};
    font-size: 1.05rem;
    font-weight: 400;
    padding: 0.3rem;
  }
  .sub {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 0;
    background: ${(props) =>
      props.mode === "dark" ? "rgba(151, 17, 17, 0.699)" : "#87CEFA"};
    .private {
      display: flex;
      flex-direction: column;
      span {
        font-weight: 700;
      }
      svg {
        cursor: pointer;
        margin-left: 2.5rem;
      }
      input {
        margin-left: 0.3rem;
      }
    }
    input {
      background: ${(props) =>
        props.mode === "dark"
          ? props.theme.backgroundColor.dark
          : props.theme.backgroundColor.light};
      border: 2px solid
        ${(props) =>
          props.mode === "dark"
            ? props.theme.borderColor.dark
            : props.theme.borderColor.light};
      color: ${(props) =>
        props.mode === "dark"
          ? props.theme.colors.dark
          : props.theme.colors.light};
    }
  }
  .invalid {
    border-color: red;
    background-color: pink;
  }
`;
