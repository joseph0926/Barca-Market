import { useAppSelect } from "@/src/hooks/useReduxHook";
import { GradientWrapper } from "./GradientStyle";

const GradientBox = (): JSX.Element => {
  const { mode } = useAppSelect((state) => state.ui);

  return <GradientWrapper mode={mode} />;
};

export default GradientBox;
