import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar.js";
import Loading from "./Loading.js";
import { BoxProps } from "@/src/models/global.js";

const Layout = ({ children }: BoxProps): JSX.Element => {
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
