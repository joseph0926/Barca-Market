import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0% {
    transform: translateY(0) scale(1)
  }
  30% {
    transform: translateY(-15px) scale(1.1)
  }
  70% {
    transform: translateY(0) scale(1)
  }
`;

export const LoadingWrapper = styled.div<DisplayProps>`
  display: ${(props) => (props.display === "true" ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoaderSpan = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #333;
  margin: 0 10px;
  &:nth-child(1) {
    animation: ${bounce} 1s infinite ease-in-out;
  }
  &:nth-child(2) {
    animation: ${bounce} 1s 0.333s infinite ease-in-out;
  }
  &:nth-child(3) {
    animation: ${bounce} 1s 0.666s infinite ease-in-out;
  }
`;
