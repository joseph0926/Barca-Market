import { useEffect } from "react";
import { loadInitialState } from "@/src/features/ui/uiSlice";
import Layout from "./Layout";
import { useAppDispatch, useAppSelect } from "@/src/hooks/useReduxHook";
import { GlobalStyle } from "@/src/styles/GlobalStyles";

const ThemeLayout = ({ children, isExempt, user }: BoxProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelect((state) => state.ui);

  useEffect(() => {
    dispatch(loadInitialState());
  }, []);

  return (
    <>
      <GlobalStyle $mode={mode} />
      {isExempt ? children : <Layout user={user}>{children}</Layout>}
    </>
  );
};

export default ThemeLayout;
