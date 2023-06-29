import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0% {
    transform: translateY(0) scale(1),
  }
  30% {
    transform: translateY(-15px) scale(1.1),
  }
  70% {
    transform: translateY(0) scale(1),
  }
`;

export const LoadingWrapper = styled.div<{ $display?: boolean }>`
  display: ${(props) => (props.$display ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const loaderSpanStyles = {
  display: "inline-block",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  background: "#333",
  margin: "0 10px",
  animation: `${bounce} 1s infinite ease-in-out`,
};

export const LoaderSpan = styled.span`
  ${loaderSpanStyles}
`;
