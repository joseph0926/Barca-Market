import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box h="100vh" w="100vw">
      <Box zIndex={10} w="100%"></Box>
      <Box w="100%" mt={4}>
        <main>{children}</main>
      </Box>
    </Box>
  );
};

export default Layout;
