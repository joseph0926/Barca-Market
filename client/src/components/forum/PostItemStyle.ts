import styled from "styled-components";

export const PostItemWrapper = styled.div<ModeProps>`
  position: relative;
  width: 100%;
  height: 15vh;
  border: 2px solid
    ${(props) =>
      props.mode === "dark"
        ? props.theme.borderColor.darkPriColor
        : props.theme.borderColor.lightPriColor};
  background: ${(props) =>
    props.mode === "dark"
      ? props.theme.backgroundColor.dark
      : props.theme.backgroundColor.light};
  color: ${(props) =>
    props.mode === "dark" ? props.theme.colors.dark : props.theme.colors.light};
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .option {
    position: absolute;
    right: 2%;
    cursor: pointer;
    &:hover {
      color: ${(props) =>
        props.mode === "dark"
          ? props.theme.borderColor.darkPriColor
          : props.theme.borderColor.lightPriColor};
    }
  }

  .post-content {
    font-size: 1.05rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid
      ${(props) =>
        props.mode === "dark"
          ? props.theme.borderColor.darkPriColor
          : props.theme.borderColor.lightPriColor};
    padding-top: 0.3rem;

    .likes {
      display: flex;
      align-items: center;
      svg {
        cursor: pointer;
        margin-right: 0.5rem;
      }
      span {
        font-weight: 700;
      }
    }

    .private-indicator {
      display: flex;
      align-items: center;
      span {
        font-weight: 700;
        margin-left: 0.3rem;
      }
    }

    .comments {
      display: flex;
      align-items: center;
      svg {
        cursor: pointer;
        margin-right: 0.5rem;
      }
      span {
        font-weight: 700;
      }
    }
  }
`;
