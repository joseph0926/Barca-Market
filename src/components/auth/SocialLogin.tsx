import { Box, Button, Flex } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialLogin = (): JSX.Element => {
  return (
    <Flex justifyContent="space-between" my="0.5rem">
      <Button onClick={() => signIn("google")} borderColor="blue.400" _hover={{ bg: "blue.400" }}>
        Sign in with Google{" "}
        <Box ml="0.5rem">
          <FaGoogle color="red" size={25} />
        </Box>
      </Button>
      <Button onClick={() => signIn("github")}>
        Sign in with GitHub{" "}
        <Box ml="0.5rem">
          <FaGithub color="blue" size={25} />
        </Box>
      </Button>
    </Flex>
  );
};

export default SocialLogin;
