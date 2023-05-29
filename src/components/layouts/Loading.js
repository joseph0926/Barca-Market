import { Box } from "@chakra-ui/react";
import { loaderStyles } from "../styles/LoadingStyles.js";

const Loading = ({ display }) => {
  const displaySpinner = display ? "flex" : "none";

  return (
    <Box display={displaySpinner} alignItems="center" justifyContent="center" height="100vh" className={loaderStyles}>
      <span className="loader-span"></span>
      <span className="loader-span"></span>
      <span className="loader-span"></span>
    </Box>
  );
};

export default Loading;
