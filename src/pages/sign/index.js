import { useState } from "react";
import { VStack, useToast, Flex, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Signin from "@/src/components/auth/Signin.js";
import Signup from "@/src/components/auth/Signup.js";

const Sign = () => {
  const [signMode, setSignMode] = useState("in");
  const toast = useToast();

  const signModeHandler = () => {
    setSignMode((pervState) => {
      return pervState === "in" ? "out" : "in";
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    toast({
      title: "Form submitted.",
      description: "We've received your form submission.",
      status: "success",
      duration: 5000,
      isClosable: true,
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
      bgGradient={`linear(to-br, darkPriText, lightPriText)`}
    >
      <motion.div initial="initial" animate="animate" key={signMode} variants={fadeIn} transition={{ duration: 1.5 }}>
        <VStack spacing={5}>
          {signMode === "in" ? <Signin submitHandler={submitHandler} /> : <Signup submitHandler={submitHandler} />}
        </VStack>
        <Flex alignItems="center" gap={4}>
          {signMode === "in" ? <Text color="rgba(255,255,255,0.7)">아직 회원이 아니신가요?</Text> : <Text>이미 회원이신가요?</Text>}
          <Button onClick={signModeHandler} border="none">
            Sign{signMode}
          </Button>
        </Flex>
      </motion.div>
    </Flex>
  );
};

Sign.displayName = "Sign";

export default Sign;
