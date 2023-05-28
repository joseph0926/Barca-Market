import { chakra } from "@chakra-ui/react";
import { theme } from "@/utils/themeConfig.js";

export const Bar = chakra("div", {
  baseStyle: {
    height: "4px",
    bg: theme.config.initialColorMode === "dark" ? "white" : "black",
    margin: "3px",
  },
});
