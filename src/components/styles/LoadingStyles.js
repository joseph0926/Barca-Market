import { css } from "@chakra-ui/react";

const loaderSpanStyles = css`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #333;
  margin: 0 10px;
  animation: bounce 1s infinite ease-in-out;
`;

export const loaderStyles = css`
  .loader-span {
    ${loaderSpanStyles};
  }

  @keyframes bounce {
    0% {
      transform: translateY(0) scale(1);
    }
    30% {
      transform: translateY(-15px) scale(1.1);
    }
    70% {
      transform: translateY(0) scale(1);
    }
  }
`;
