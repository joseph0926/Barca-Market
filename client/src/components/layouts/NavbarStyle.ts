import styled from "styled-components";

export const NavWrapper = styled.nav<ModeProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px;
  margin-bottom: 30px;
  h1 {
    font-size: 2.5rem;
  }
  ul {
    display: block;
    .list {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    li {
      font-size: 1.35rem;
      font-weight: 700;
      opacity: 0.85;
      transition: all 0.2s;
      &:hover {
        opacity: 1;
        box-shadow: 0 2px 0
          ${(props) =>
            props.mode === "dark"
              ? props.theme.borderColor.darkPriColor
              : props.theme.borderColor.lightPriColor};
      }
    }
  }
  .ham {
    display: none;
  }
  .btn {
    display: block;
    button {
      margin: 0 5px;
      background-color: transparent;
      transition: all 0.4s;
    }
  }
`;

export const Bar = styled.div``;
