import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import TextAnim from "./TextAnim.js";

const Hero = () => {
  return (
    <Flex w="100vw" h="70vh" justify="center" align="center" position="relative">
      <Flex direction={{ base: "column", md: "row" }} justify="flex-start" alignItems="center" gap={10}>
        <Box w="50%">
          <Heading mb={4}>Payments infrastructure for the world</Heading>
          <Text mb={4}>
            Tons of companies all over the world use Swipe’s seamless platform to manage their businesses's entire financial transaction
            infrastructure online.
          </Text>
          <Flex mt={4}>
            <Button>Start now</Button>
            <Button ml={4}>About us</Button>
          </Flex>
        </Box>
      </Flex>
      <Box position="absolute" left="60%" px="20px">
        <TextAnim />
      </Box>
    </Flex>
  );
};

export default Hero;
