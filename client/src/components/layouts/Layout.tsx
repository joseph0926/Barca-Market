import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/hooks/useReduxHook";
import { setUser } from "@/src/features/user/userSlice";

const Layout = ({ children, user }: BoxProps): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user[0].currentUser));
    }
  }, [user]);

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
