import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { useEffect } from "react";
import { useAppDispatch, useAppSelect } from "@/src/hooks/useReduxHook";
import { setUser } from "@/src/features/user/userSlice";
import { useRouter } from "next/router";
import { useCurrentUserQuery } from "@/src/store/store";
import { LayoutWrapper } from "./Layout.style";

const Layout = ({ children }: BoxProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelect((state) => state.user);
  const router = useRouter();
  const { data, error, isFetching } = useCurrentUserQuery(undefined);

  useEffect(() => {
    if (data) {
      const { currentUser } = data[0];
      dispatch(setUser(currentUser));
    }
  }, [data]);

  if (isFetching) {
    return <Loading display />;
  }
  if (!user && router.pathname !== "/") {
    router.push("/sign");
  }

  return (
    <LayoutWrapper>
      <div className="nav">
        <Navbar />
      </div>
      <div className="main">
        <Loading display={false} />
        <main>{children}</main>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
