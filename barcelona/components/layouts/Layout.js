import { Box } from "@chakra-ui/react";
import Loading from "./Loading.js";
import Navbar from "./Navbar.js";

const Layout = ({ children }) => {
  return (
    <Box h="100vh" w="100vw">
      <Box zIndex={10} w="100%">
        <Navbar />
      </Box>
      <Box w="100%" mt={4}>
        <Loading display={false} />
        <main>{children}</main>
      </Box>
    </Box>
  );
};

export default Layout;
