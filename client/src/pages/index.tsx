import { Box } from "@chakra-ui/react";
import GradientBox from "../components/home/Gradient";
import Hero from "../components/home/Hero";

const HomePage = (): JSX.Element => {
  return (
    <Box maxW="100vw" overflow="hidden">
      <GradientBox />
      <Hero />
    </Box>
  );
};

export default HomePage;
