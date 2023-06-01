import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import TextAnim from "./TextAnim.js";

const Hero = () => {
  return (
    <Flex w="100vw" h="70vh" justify="center" align="center" position="relative">
      <Flex direction={{ base: "column", md: "row" }} justify="flex-start" alignItems="center" gap={10}>
        <Box w="50%">
          <Heading mb={4}>Barcelona Fan Community Platform</Heading>
          <Text mb={4}>
            FC Barcelona 팬 커뮤니티 플랫폼입니다. 이 플랫폼은 팬들이 모여 소통하고 정보를 공유하며, 함께 커뮤니티를 형성할 수 있는 온라인
            공간을 제공합니다. 다양한 정보와 소식을 공유해보세요!
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
