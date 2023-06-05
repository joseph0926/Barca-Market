import { css } from "@chakra-ui/react";

import { SystemStyleObject } from "@chakra-ui/react";

const loaderSpanStyles: SystemStyleObject = {
  display: "inline-block",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  background: "#333",
  margin: "0 10px",
  animation: "bounce 1s infinite ease-in-out",
};

export const loaderStyles: SystemStyleObject = {
  ".loader-span": loaderSpanStyles,
  "@keyframes bounce": {
    "0%": {
      transform: "translateY(0) scale(1)",
    },
    "30%": {
      transform: "translateY(-15px) scale(1.1)",
    },
    "70%": {
      transform: "translateY(0) scale(1)",
    },
  },
};
