import { Box, Button, Heading } from "@chakra-ui/react";
import BaseFormControl from "./FormController.js";

const Signin = ({ submitHandler }) => {
  return (
    <Box as="form" role="form" w="30vw">
      <Heading mb="1rem">Sign in</Heading>
      <BaseFormControl id="in-email" type="email" name="email" placeholder="Eamil" />
      <BaseFormControl id="in-password" type="password" name="password" placeholder="Password" />
      <Button onClick={submitHandler} w="100%" my="1rem">
        Login
      </Button>
    </Box>
  );
};

export default Signin;
