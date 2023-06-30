import { useEffect } from "react";
import { loadInitialState } from "@/src/features/ui/uiSlice";
import Layout from "./Layout";
import { useAppDispatch, useAppSelect } from "@/src/hooks/useReduxHook";
import GlobalStyle from "../../utils/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { myTheme } from "@/src/utils/DefaultTheme";

const ThemeLayout = ({ children, isExempt }: BoxProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelect((state) => state.ui);

  useEffect(() => {
    dispatch(loadInitialState());
  }, []);

  return (
    <>
      <ThemeProvider theme={myTheme}>
        <GlobalStyle mode={mode} />
        {isExempt ? children : <Layout>{children}</Layout>}
      </ThemeProvider>
    </>
  );
};

export default ThemeLayout;
