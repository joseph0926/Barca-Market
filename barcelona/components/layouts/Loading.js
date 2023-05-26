import { Box } from "@chakra-ui/react";
import { loaderStyles } from "../styles/LoadingStyles.js";

const Loading = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" className={loaderStyles}>
      <span className="loader-span"></span>
      <span className="loader-span"></span>
      <span className="loader-span"></span>
    </Box>
  );
};

export default Loading;
