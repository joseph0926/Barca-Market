import { Box, Button, Heading } from "@chakra-ui/react";
import BaseFormControl from "./FormController";
import { useInput } from "@/src/hooks/useInput";

const Signup = (): JSX.Element => {
  const { formState, touched, isValid, handleInputChange, handleBlur, isLoginFormValid } = useInput();

  return (
    <Box as="form" role="form" w="30vw">
      <Heading mb="1rem">Sign up</Heading>
      <BaseFormControl
        id="username"
        type="text"
        name="username"
        placeholder="UserName"
        value={formState.name}
        handleChange={handleInputChange}
        handleBlur={handleBlur}
        isValid={isValid.username}
        touched={touched.username}
      />
      <BaseFormControl
        id="in-email"
        type="email"
        name="email"
        placeholder="Email"
        value={formState.email}
        handleChange={handleInputChange}
        handleBlur={handleBlur}
        isValid={isValid.email}
        touched={touched.email}
      />
      <BaseFormControl
        id="in-password"
        type="password"
        name="password"
        placeholder="Password"
        value={formState.password}
        handleChange={handleInputChange}
        handleBlur={handleBlur}
        isValid={isValid.password}
        touched={touched.password}
      />
      <Button bg="transparent" w="100%" my="1rem" disabled={!isLoginFormValid}>
        Sign up
      </Button>
    </Box>
  );
};

export default Signup;
