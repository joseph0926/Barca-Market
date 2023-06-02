import { Box, Button, Heading } from "@chakra-ui/react";
import BaseFormControl from "./FormController.js";

const Signup = ({ submitHandler }) => {
  return (
    <Box as="form" role="form" w="30vw">
      <Heading mb="1rem">Sign up</Heading>
      <BaseFormControl id="username" type="text" name="username" placeholder="UserName" />
      <BaseFormControl id="up-email" type="email" name="email" placeholder="Eamil" />
      <BaseFormControl id="up-password" type="password" name="password" placeholder="Password" />
      <Button onClick={submitHandler} w="100%" my="1rem">
        Sign up
      </Button>
    </Box>
  );
};

export default Signup;
