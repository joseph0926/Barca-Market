import styled, { keyframes } from "styled-components";

const gradient = keyframes`
  0% {background-position: 0% 50%}
  50% {background-position: 100% 50%}
  100% {background-position: 0% 50%}
`;

export const SignWrapper = styled.div<AnimProps>`
  .back {
    position: absolute;
    top: 5%;
    left: 5%;
    border: 3px solid ${(props) => props.theme.borderColor.lightPriColor};
    &:hover {
      border-color: ${(props) => props.theme.borderColor.lightPriColor};
    }
    a {
      color: #fff;
    }
  }
  .sign {
    max-height: 100vh;
    max-width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to right bottom,
      ${(props) => props.theme.backgroundColor.darkPriColor},
      ${(props) => props.theme.backgroundColor.lightPriColor}
    );
    background-size: 200% 100%;
    .sign-form {
      gap: 0.5rem;
    }
    animation: ${(props) => (props.$anim ? gradient : "none")} 1.5s ease
      infinite;
    .container {
      display: flex;
      align-items: center;
      p {
        color: rgba(255, 255, 255, 0.7);
        margin-right: 1rem;
      }
    }
    button {
      background-color: transparent;
    }
  }
`;
