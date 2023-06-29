import styled, { keyframes } from "styled-components";

const bgGradientLight =
  "linear(to-l, rgba(232, 39, 39, 0.8), rgba(255, 255, 255, 0.5), rgba(0, 153, 255, 0.8))";
const bgGradientDark =
  "linear(to-l, rgba(232, 39, 39, 0.3), rgba(0, 0, 0, 0.5), rgba(0, 153, 255, 0.3))";

const gradient = keyframes`
  0% {background-position: 0% 50%}
  50% {background-position: 100% 50%}
  100% {background-position: 0% 50%}
`;

export const GradientWrapper = styled.div<{
  $mode?: "dark" | "light" | string;
}>`
  background: ${(props) =>
    props.$mode === "dark" ? bgGradientDark : bgGradientLight};
  background-size: 200% 200%;
  width: 200%;
  height: 970px;
  transform: rotate(-10deg);
  position: absolute;
  top: -600px;
  left: -50%;
  z-index: -1;
  overflow: hidden;
  animation: ${gradient} 4s ease infinite;
`;
