import { useState } from "react";
import { VStack, Flex, Button, Text, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Signin from "@/src/components/auth/Signin.js";
import Signup from "@/src/components/auth/Signup.js";

const gradient = keyframes`
  0% {background-position: 0% 50%}
  50% {background-position: 100% 50%}
  100% {background-position: 0% 50%}
`;

const Sign = () => {
  const [signMode, setSignMode] = useState("in");
  const [anim, setAnim] = useState(false);

  const signModeHandler = () => {
    setAnim(true);
    setTimeout(() => {
      setAnim(false);
    }, 1500);
    setSignMode((pervState) => {
      return pervState === "in" ? "out" : "in";
    });
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <Flex
      as="div"
      maxW="100vw"
      maxH="100vh"
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgGradient={`linear(to-br, red.700, blue.600)`}
      bgSize="200% 100%"
      animation={`${anim ? gradient : "none"} 1.5s ease infinite`}
    >
      <motion.div initial="initial" animate="animate" key={signMode} variants={fadeIn} transition={{ duration: 1.5 }}>
        <VStack spacing={5}>{signMode === "in" ? <Signin /> : <Signup />}</VStack>
        <Flex alignItems="center" gap={4}>
          {signMode === "in" ? <Text color="rgba(255,255,255,0.7)">아직 회원이 아니신가요?</Text> : <Text>이미 회원이신가요?</Text>}
          <Button onClick={signModeHandler} border="none" bg="transparent">
            Sign{signMode}
          </Button>
        </Flex>
      </motion.div>
    </Flex>
  );
};

Sign.displayName = "Sign";

export default Sign;
