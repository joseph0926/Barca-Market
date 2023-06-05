import { Box } from "@chakra-ui/react";
import { SystemCSSProperties } from "@chakra-ui/react";
import { loaderStyles } from "../styles/LoadingStyles";
import { LoadingProps } from "@/src/models/ui.js";

const Loading = ({ display }: LoadingProps): JSX.Element => {
  const displaySpinner: SystemCSSProperties["display"] = display ? "flex" : "none";

  return (
    <Box display={displaySpinner} alignItems="center" justifyContent="center" height="100vh" sx={loaderStyles}>
      <span className={loaderStyles[".loader-span"]}></span>
      <span className={loaderStyles[".loader-span"]}></span>
      <span className={loaderStyles[".loader-span"]}></span>
    </Box>
  );
};

export default Loading;
