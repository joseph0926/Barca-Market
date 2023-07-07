import Navbar from "./Navbar";
import Loading from "./Loading";
import { LayoutWrapper } from "./LayoutStyle";
import { useAppSelect } from "@/src/hooks/useReduxHook";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Layout = ({ children }: BoxProps): JSX.Element => {
  const { user, userLoading, isLoading } = useAppSelect((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user && router.pathname !== "/") {
      router.push("/sign");
    }
  }, [user, router.pathname]);

  return (
    <LayoutWrapper>
      <div className="nav">
        <Navbar />
      </div>
      <div className="main">
        <Loading $display={false} />
        <main>{children}</main>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
