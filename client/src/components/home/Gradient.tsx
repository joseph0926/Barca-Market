import { useAppSelect } from "@/src/hooks/useReduxHook";
import { Box, keyframes } from "@chakra-ui/react";

const gradient = keyframes`
  0% {background-position: 0% 50%}
  50% {background-position: 100% 50%}
  100% {background-position: 0% 50%}
`;

const GradientBox = (): JSX.Element => {
  const { mode } = useAppSelect((state) => state.ui);

  const bgGradientLight =
    "linear(to-l, rgba(232, 39, 39, 0.8), rgba(255, 255, 255, 0.5), rgba(0, 153, 255, 0.8))";
  const bgGradientDark =
    "linear(to-l, rgba(232, 39, 39, 0.3), rgba(0, 0, 0, 0.5), rgba(0, 153, 255, 0.3))";

  return (
    <Box
      bgGradient={mode === "dark" ? bgGradientDark : bgGradientLight}
      bgSize="200% 200%"
      w="200%"
      h="970px"
      transform="rotate(-10deg)"
      position="absolute"
      top="-600px"
      left="-50%"
      zIndex="-1"
      overflow="hidden"
      animation={`${gradient} 4s ease infinite`}
      // {...props}
    />
  );
};

export default GradientBox;
