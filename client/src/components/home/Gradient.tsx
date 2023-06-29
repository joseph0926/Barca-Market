import { useAppSelect } from "@/src/hooks/useReduxHook";
import { Box, keyframes } from "@chakra-ui/react";
import { GradientWrapper } from "./Gradient.style";

const GradientBox = (): JSX.Element => {
  const { mode } = useAppSelect((state) => state.ui);

  return <GradientWrapper $mode={mode} />;
};

export default GradientBox;
