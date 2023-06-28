import { Box, Button, Heading } from "@chakra-ui/react";
import BaseFormControl from "./FormController";
import { useInput } from "@/src/hooks/useInput";
import SocialLogin from "./SocialLogin";
import { useSigninMutation } from "@/src/store/store";
import { toast } from "react-toastify";
import { ExtendFetchError } from "./Signup";
import { useRouter } from "next/router";

const Signin = (): JSX.Element => {
  const [signin, results] = useSigninMutation();
  const router = useRouter();

  const {
    formState,
    touched,
    isValid,
    handleInputChange,
    handleBlur,
    isLoginFormValid,
  } = useInput();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await signin(formState);
      if (results.isError) {
        throw new Error("");
      }
      const res = await results.data;
      toast.success(res[0].message);
      router.push("/");
    } catch (error) {
      if (results.error) {
        const { data }: ExtendFetchError = results.error;
        toast.error(data.errors[0].message);
      }
    }
  };

  return (
    <Box as="form" role="form" w="30vw" onSubmit={submitHandler}>
      <Heading mb="1rem">Sign in</Heading>
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
      <Button
        type="submit"
        bg="transparent"
        w="100%"
        my="1rem"
        disabled={!isLoginFormValid}
      >
        Login
      </Button>
      <SocialLogin />
    </Box>
  );
};

export default Signin;
