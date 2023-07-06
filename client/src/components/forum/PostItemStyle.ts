import styled from "styled-components";

export const PostItemWrapper = styled.div<ModeProps>`
  width: 100%;
  border: 2px solid
    ${(props) =>
      props.mode === "dark"
        ? props.theme.borderColor.dark
        : props.theme.borderColor.light};
  background: ${(props) =>
    props.mode === "dark"
      ? props.theme.backgroundColor.dark
      : props.theme.backgroundColor.light};
  color: ${(props) =>
    props.mode === "dark" ? props.theme.colors.dark : props.theme.colors.light};
  padding: 1rem;
  margin-bottom: 1rem;

  .post-content {
    font-size: 1.05rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

      svg {
        cursor: pointer;
      }

      span {
        font-weight: 700;
        margin-left: 0.3rem;
      }
    }
  }
`;
